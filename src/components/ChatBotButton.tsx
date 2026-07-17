import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { FiMessageCircle } from 'react-icons/fi';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/router';

interface Message {
  text: string;
  isUser: boolean;
}

// LGPD Art. 33, VIII: specific, highlighted consent before chat content is sent to
// the third-party AI provider (DeepSeek), which may be outside Brazil (incl. China).
const CHAT_CONSENT: Record<string, { title: string; body: string; accept: string }> = {
  'pt-BR': {
    title: 'Antes de começar',
    body: 'Suas mensagens são processadas por uma IA de terceiro (DeepSeek), que pode estar fora do Brasil, inclusive na China. Ao continuar, você concorda com esse tratamento.',
    accept: 'Concordar e conversar',
  },
  en: {
    title: 'Before we start',
    body: 'Your messages are processed by a third-party AI (DeepSeek), which may be outside Brazil, including in China. By continuing, you agree to this processing.',
    accept: 'Agree and chat',
  },
  es: {
    title: 'Antes de empezar',
    body: 'Tus mensajes son procesados por una IA de terceros (DeepSeek), que puede estar fuera de Brasil, incluso en China. Al continuar, aceptas este tratamiento.',
    accept: 'Aceptar y chatear',
  },
  it: {
    title: 'Prima di iniziare',
    body: "I tuoi messaggi sono elaborati da un'IA di terze parti (DeepSeek), che può trovarsi fuori dal Brasile, anche in Cina. Continuando, acconsenti a questo trattamento.",
    accept: 'Accetta e chatta',
  },
};

const ChatBotButton: React.FC = () => {
  const t = useTranslations();
  const { language } = useLanguage();
  const router = useRouter();
  const typingMessages = t.typingMessages;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState(typingMessages[0]);
  const [newMessageBadge, setNewMessageBadge] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  // Raw response time is a dev/analytics affordance, not user value; only surface it
  // with ?debug=1. Users get the typing indicator instead (exposing latency reads as
  // beta and creates an implicit SLA the product never promised).
  const [isDebug, setIsDebug] = useState(false);
  useEffect(() => {
    setIsDebug(new URLSearchParams(window.location.search).get('debug') === '1');
  }, []);
  // Specific consent to send chat content to the third-party AI (see CHAT_CONSENT).
  const [chatConsent, setChatConsent] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('wb-chat-consent-v1') === 'true') {
      setChatConsent(true);
    }
  }, []);
  const acceptChatConsent = () => {
    try {
      localStorage.setItem('wb-chat-consent-v1', 'true');
    } catch {
      /* storage blocked — consent still applies for this session */
    }
    setChatConsent(true);
  };
  const consentCopy =
    CHAT_CONSENT[(language === 'pt' ? 'pt-BR' : language) as keyof typeof CHAT_CONSENT] ?? CHAT_CONSENT['pt-BR'];

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (isOpen && modalRef.current) {
      openAnimation();
      setNewMessageBadge(false);
    } else if (!isOpen && modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scaleY: 0.5,
        scaleX: 0.7,
        y: 200,
        duration: 0.8,
        ease: 'elastic.in(1, 0.5)',
      });
    }
  }, { dependencies: [isOpen], scope: containerRef });

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
      setTypingText((prev: string) => {
          const currentIndex = typingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % typingMessages.length;
          return typingMessages[nextIndex];
        });
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isTyping]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAnimation = () => {
    gsap.fromTo(modalRef.current, {
      opacity: 0,
      scaleY: 0.5,
      scaleX: 0.7,
      y: 200,
    }, {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const sendMessage = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim()) return;

    // Track chat interaction in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_message_sent', {
        event_category: 'chat',
        event_label: text ? 'quick_reply' : 'custom_message',
        value: 1,
      });
    }

    // Get or create unique user ID
    let userId = localStorage.getItem('chat_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat_user_id', userId);
    }

    setMessages(prev => [
      ...prev,
      { text: messageToSend, isUser: true },
    ]);

    setInputValue('');
    setIsTyping(true);
    setResponseTime(null);

    const start = performance.now();

    try {
      // Use production URL in production, localhost in development
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://chatbot.wbdigitalsolutions.com'
        : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

      // Only try to fetch if API URL is configured
      if (apiUrl) {
        // Check if backend supports streaming endpoint
        const useStreaming = false; // Use regular endpoint with response_parts
        
        if (useStreaming) {
          
          // Since EventSource doesn't support POST, we'll use fetch with ReadableStream
          const response = await fetch(`${apiUrl}/chat/stream`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'text/event-stream',
            },
            body: JSON.stringify({
              message: messageToSend,
              user_id: userId,
              language: language,
              current_page: router.pathname,
              page_url: window.location.href,
              timestamp: new Date().toISOString(),
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          
          if (!reader) {
            throw new Error('No reader available');
          }

          let buffer = '';
          
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              break;
            }
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6);
                if (dataStr === '[DONE]') continue;
                
                try {
                  const data = JSON.parse(dataStr);
                  const eventTime = new Date().toISOString();
            
                  
                  switch(data.type) {
                    case 'acknowledgment':
                      // Show initial acknowledgment
                      setIsTyping(true);
                      break;
                      
                    case 'thinking':
                      // Update typing indicator
                      setIsTyping(true);
                      break;
                      
                    case 'message':
                      // Show actual message part
                      setIsTyping(false);
                      setMessages(prev => [...prev, { text: data.content, isUser: false }]);
                      break;
                      
                    case 'complete':
                      // Stream complete
                      setIsTyping(false);
                      const end = performance.now();
                      const responseTimeMs = Math.round(end - start);
                      setResponseTime(responseTimeMs);
                      break;
                      
                    case 'error':
                      setIsTyping(false);
                      console.error(`[${eventTime}] ❌ Stream error:`, data.message);
                      throw new Error(data.message);
                  }
                } catch (e) {
                  console.error('Error parsing SSE data:', e, dataStr);
                }
              }
            }
          }
          
          reader.releaseLock();
          setIsTyping(false);
          
        } else {
          // Fallback to regular POST request
          
          const response = await fetch(`${apiUrl}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              message: messageToSend, 
              user_id: userId,
              language: language,
              current_page: router.pathname,
              page_url: window.location.href,
              timestamp: new Date().toISOString(),
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const end = performance.now();
          const responseTimeMs = Math.round(end - start);
          setResponseTime(responseTimeMs);

          const data = await response.json();

          // Check if we have response_parts
          let messageParts = [];
          
          if (data.response_parts && data.response_parts.length > 0) {
            messageParts = data.response_parts;
          } else if (data.revised_response || data.raw_response) {
            // If no parts, split the response into sentences
            const fullResponse = data.revised_response || data.raw_response;
            
            // Split by sentence endings but keep the punctuation
            // Also split on exclamation with emoji
            const sentences = fullResponse.split(/(?<=[.!?])\s+(?=[A-Z])|(?<=[!])\s+(?=[A-Z])|(?<=😊)\s+/);
            
            // Process sentences into logical message parts
            messageParts = [];
            
            for (const sentence of sentences) {
              const trimmed = sentence.trim();
              if (!trimmed) continue;
              
              // Each sentence becomes its own message for better readability
              // Unless it's very short (like "Olá!")
              if (trimmed.length > 20 || trimmed.includes('?') || trimmed.includes('!')) {
                messageParts.push(trimmed);
              } else if (messageParts.length > 0 && messageParts[messageParts.length - 1].length < 100) {
                // Combine with previous if both are short
                messageParts[messageParts.length - 1] += ' ' + trimmed;
              } else {
                messageParts.push(trimmed);
              }
            }
            
            // If we still have a single long message, try to split it better
            if (messageParts.length === 1 && messageParts[0].length > 150) {
              const longMessage = messageParts[0];
              messageParts = [];
              
              // Split on common conjunctions or transitions
              const parts = longMessage.split(/(?<=\.)\s+(?=\w)|(?<=!)\s+(?=\w)|(?<=\?)\s+(?=\w)/);
              for (const part of parts) {
                if (part.trim()) {
                  messageParts.push(part.trim());
                }
              }
            }
            
          }
          
          if (messageParts.length > 0) {
            const isGreeting = data.is_greeting || false;
            
            // Calculate delays based on response type and length
            const initialDelay = 500; // Small initial delay
            const betweenDelay = isGreeting ? 400 : 700; // As specified by backend
            
            
            // Initial delay before first message
            await new Promise(resolve => setTimeout(resolve, initialDelay));
            
            // Display messages progressively
            for (let i = 0; i < messageParts.length; i++) {
              const part = messageParts[i];
              if (!part || !part.trim()) continue;
              
              // Show typing indicator before each part
              setIsTyping(true);
              
              // Calculate typing time (shorter for better UX)
              const typingTime = Math.min(part.length * 5, 800);
              
              // Simulate typing
              await new Promise(resolve => setTimeout(resolve, typingTime));
              
              // Hide typing and show message
              setIsTyping(false);
              setMessages(prev => [...prev, { text: part, isUser: false }]);
              
              // Wait before next message (if not last)
              if (i < messageParts.length - 1) {
                await new Promise(resolve => setTimeout(resolve, betweenDelay));
              }
            }
          } else {
            // Fallback to single message if no parts at all
            const reply = t.fallbackReply || 'Desculpe, não consegui processar sua mensagem.';
            
            // Show typing briefly
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsTyping(false);
            
            setMessages(prev => [...prev, { text: reply, isUser: false }]);
          }
        }
      } else {
        // No API configured, use fallback
        throw new Error('API URL not configured');
      }
    } catch (error) {
      const errorTime = new Date().toISOString();
      console.error(`[${errorTime}] ❌ Error in chat:`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        fallbackMode: true,
      });
      
      // Provide a helpful fallback message
      const fallbackMessage = t.fallbackReply || "I'm currently offline. Please contact us directly at bruno@wbdigitalsolutions.com";
      setMessages(prev => [...prev, { text: fallbackMessage, isUser: false }]);
      
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isTyping) return;
    if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      // Fire-and-forget: sendMessage handles its own errors.
      void sendMessage();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      setInputValue(prev => prev + '\n');
    }
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          const newState = !isOpen;
          setIsOpen(newState);
          
          // Track chat open/close in Google Analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', newState ? 'chat_opened' : 'chat_closed', {
              event_category: 'chat',
              event_label: 'chat_toggle',
              value: newState ? 1 : 0,
            });
          }
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-custom-purple text-white p-3.5 sm:p-5 rounded-full shadow-xl hover:scale-110 transition-all"
        aria-label="Abrir Chatbot"
      >
        <FiMessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        {newMessageBadge && <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>}
      </button>

      {isOpen && (
        <div className="fixed top-0 right-4 flex items-end justify-end p-2 z-40">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-transform"
            role="dialog"
            aria-live="polite"
          >
            <div className="relative flex justify-between items-center p-4 bg-gradient-to-r from-custom-purple to-primary text-white rounded-t-lg">
              <h2 className="text-xl font-semibold z-10">Chatbot</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none hover:text-gray-300 z-10"
                aria-label="Fechar Chatbot"
              >✖</button>
            </div>

            <div className="p-5 text-gray-700">
              <div className="mb-4 max-h-60 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-3 max-w-[80%] rounded-lg ${msg.isUser ? 'bg-custom-purple text-white ml-auto' : 'bg-gray-200 text-black mr-auto'}`}
                    style={{ whiteSpace: 'pre-line', textAlign: msg.isUser ? 'right' : 'left' }}
                  >
                    <span className="font-bold">{msg.isUser ? t.you : t.bot}</span> {msg.text}
                  </div>
                ))}

                {isTyping && (
                  <div className="mb-2 p-2 max-w-[80%] bg-gray-200 text-black self-start mr-auto rounded-lg">
                    {typingText}
                  </div>
                )}

                {responseTime && isDebug && (
                  <div className="text-xs text-gray-500 text-center">
                    {t.responseTime}: {responseTime < 1000 ? `${responseTime}ms` : `${(responseTime / 1000).toFixed(2)}s`}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {chatConsent ? (
                <>
                  <textarea
                    placeholder={t.placeholder}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-purple focus:ring-2 focus:ring-custom-purple transition-all duration-200 resize-none"
                    rows={3}
                  />

                  <div className="flex flex-wrap gap-2 mb-2">
                    <button onClick={() => sendMessage(t.specialist)} className="bg-secondary text-black py-1 px-2 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300 whitespace-nowrap disabled:opacity-50" disabled={isTyping}>
                      {t.specialist}
                    </button>
                    <button onClick={() => sendMessage(t.quote)} className="bg-secondary text-black py-1 px-4 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300 whitespace-nowrap disabled:opacity-50" disabled={isTyping}>
                      {t.quote}
                    </button>
                    <button onClick={() => sendMessage(t.services)} className="bg-secondary text-black py-1 px-4 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300 whitespace-nowrap disabled:opacity-50" disabled={isTyping}>
                      {t.services}
                    </button>
                  </div>

                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className={`mt-4 w-full py-2 px-4 rounded-lg shadow-md transition-all ${inputValue.trim() ? 'bg-custom-purple text-white hover:bg-primary' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                    aria-label="Enviar mensagem"
                  >
                    {t.sendButton}
                  </button>
                </>
              ) : (
                <div className="rounded-lg border border-custom-purple/25 bg-custom-purple/5 p-4">
                  <p className="text-sm font-semibold text-primary">{consentCopy.title}</p>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-gray-600">{consentCopy.body}</p>
                  <button
                    type="button"
                    onClick={acceptChatConsent}
                    className="mt-3 w-full rounded-lg bg-custom-purple py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-purple focus-visible:ring-offset-2"
                  >
                    {consentCopy.accept}
                  </button>
                </div>
              )}

              <p className="mt-3 text-[0.7rem] leading-snug text-gray-500">
                {t.chatbotPrivacyNote}{' '}
                <Link
                  href="/privacy-policy"
                  className="text-custom-purple underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-purple"
                >
                  {t.chatbotPrivacyLink}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;