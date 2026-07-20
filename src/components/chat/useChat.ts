import { useState } from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/router';

export interface Message {
  text: string;
  isUser: boolean;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Owns the conversation state + the /chat network round-trip. Lives in the
// always-mounted container so the conversation survives closing/reopening the
// panel. Presentation is fully separate (ChatPanel and its children).
export const useChat = () => {
  const t = useTranslations();
  const { language } = useLanguage();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Stable per-visitor id so the backend can keep conversation memory across turns.
  const getUserId = () => {
    let userId = localStorage.getItem('chat_user_id');
    if (!userId) {
      userId = `user_${crypto.randomUUID()}`;
      localStorage.setItem('chat_user_id', userId);
    }
    return userId;
  };

  // Turn one backend reply into human-paced message bubbles: prefer the
  // server's response_parts, else split the text into sentence-sized chunks.
  const splitReply = (data: {
    response_parts?: string[];
    revised_response?: string;
    raw_response?: string;
  }): string[] => {
    if (data.response_parts && data.response_parts.length > 0) return data.response_parts;

    const full = data.revised_response || data.raw_response;
    if (!full) return [];

    const sentences = full.split(/(?<=[.!?])\s+(?=[A-Z])|(?<=[!])\s+(?=[A-Z])|(?<=😊)\s+/);
    const parts: string[] = [];
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;
      if (trimmed.length > 20 || trimmed.includes('?') || trimmed.includes('!')) {
        parts.push(trimmed);
      } else if (parts.length > 0 && parts[parts.length - 1].length < 100) {
        parts[parts.length - 1] += ' ' + trimmed;
      } else {
        parts.push(trimmed);
      }
    }
    if (parts.length === 1 && parts[0].length > 150) {
      return parts[0]
        .split(/(?<=\.)\s+(?=\w)|(?<=!)\s+(?=\w)|(?<=\?)\s+(?=\w)/)
        .map(p => p.trim())
        .filter(Boolean);
    }
    return parts;
  };

  const sendMessage = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim()) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_message_sent', {
        event_category: 'chat',
        event_label: text ? 'quick_reply' : 'custom_message',
        value: 1,
      });
    }

    const userId = getUserId();
    setMessages(prev => [...prev, { text: messageToSend, isUser: true }]);
    setInputValue('');
    setIsTyping(true);
    setResponseTime(null);

    const start = performance.now();
    // Abort a hung request so the "typing" state can't stay stuck forever.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const apiUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://chatbot.wbdigitalsolutions.com'
          : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: messageToSend,
          user_id: userId,
          language,
          current_page: router.pathname,
          page_url: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setResponseTime(Math.round(performance.now() - start));
      const data = await response.json();
      const parts = splitReply(data);

      if (parts.length > 0) {
        const betweenDelay = data.is_greeting ? 400 : 700;
        await sleep(500);
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i]?.trim();
          if (!part) continue;
          setIsTyping(true);
          await sleep(Math.min(part.length * 5, 800));
          setIsTyping(false);
          setMessages(prev => [...prev, { text: part, isUser: false }]);
          if (i < parts.length - 1) await sleep(betweenDelay);
        }
      } else {
        setIsTyping(true);
        await sleep(500);
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { text: t.fallbackReply || 'Desculpe, não consegui processar sua mensagem.', isUser: false },
        ]);
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ❌ Error in chat:`, {
        error: error instanceof Error ? error.message : error,
        fallbackMode: true,
      });
      const fallback =
        t.fallbackReply || "I'm currently offline. Please contact us directly at bruno@wbdigitalsolutions.com";
      setMessages(prev => [...prev, { text: fallback, isUser: false }]);
    } finally {
      clearTimeout(timeout);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isTyping) return;
    if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      void sendMessage();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      setInputValue(prev => prev + '\n');
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    responseTime,
    sendMessage,
    handleKeyPress,
  };
};
