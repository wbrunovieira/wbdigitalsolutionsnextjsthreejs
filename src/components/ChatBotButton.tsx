import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiMessageCircle } from 'react-icons/fi';


interface Message {
  text: string;
  isUser: boolean;
}

const typingMessages = [
  '⏳ Processando sua solicitação...',
  '💡 Pensando na melhor resposta para você...',
  '🔍 Analisando sua mensagem...',
  '🧠 Refletindo com inteligência...',
  '⌛ Só mais um instante, preparando uma ótima resposta!',
];

const ChatBotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState(
    typingMessages[0]
  );
  const [newMessageBadge, setNewMessageBadge] =
    useState(false);
  const [responseTime, setResponseTime] = useState<
    number | null
  >(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

useGSAP(
  () => {
    if (isOpen) {
      openAnimation();
      setNewMessageBadge(false);
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        scaleY: 0.5,
        scaleX: 0.7,
        y: 200,
        duration: 0.8,
        ease: 'elastic.in(1, 0.5)',
      });
    }
  },
  { scope: containerRef }
);

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingText(prev => {
          const currentIndex = typingMessages.indexOf(prev);
          const nextIndex =
            (currentIndex + 1) % typingMessages.length;
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
      if (event.key === 'Escape' && isOpen)
        setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscKey);
    return () =>
      window.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const openAnimation = () => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scaleY: 0.5, scaleX: 0.7, y: 200 },
      {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        onStart: () => setIsAnimating(true),
        onComplete: () => setIsAnimating(false),
      }
    );
  };

  const sendMessage = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim()) return;

    setMessages(prev => [
      ...prev,
      { text: messageToSend, isUser: true },
      {
        text: 'Recebi sua pergunta! Estou analisando com carinho para te dar a melhor resposta 😊',
        isUser: false,
      },
    ]);

    setInputValue('');
    setIsTyping(true);
    setResponseTime(null);

    const start = performance.now();

    const progressiveMessages = [
      '🔍 Ainda analisando sua pergunta...',
      '🧠 Refletindo com inteligência...',
      '⌛ Já estou quase lá...',
      '📦 Finalizando os últimos detalhes...',
      '🚀 Preparando a resposta ideal para você...',
    ];

    let messageIndex = 0;
    const intervalId = setInterval(() => {
      if (messageIndex >= progressiveMessages.length) {
        clearInterval(intervalId);
        return;
      }

      const nextMessage = progressiveMessages[messageIndex];
      if (nextMessage) {
        setMessages(prev => [
          ...prev,
          { text: nextMessage, isUser: false },
        ]);
      }
      messageIndex++;
    }, 7000);

    try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: messageToSend,
            user_id: 'user123',
          }),
        }
      );

      clearInterval(intervalId);

      const end = performance.now();
      setResponseTime(Math.round(end - start));
      const data = await response.json();

      const reply =
        data.revised_response ||
        data.raw_response ||
        'Não entendi, pode reformular?';

      setMessages(prev => [
        ...prev,
        { text: reply, isUser: false },
      ]);
    } catch (error) {
      clearInterval(intervalId);
      console.error(
        'Erro ao enviar mensagem para o servidor:',
        error
      );
      setMessages(prev => [
        ...prev,
        {
          text: 'Erro ao processar sua mensagem. Tente novamente mais tarde.',
          isUser: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isTyping) return;

    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.metaKey &&
      !e.ctrlKey
    ) {
      e.preventDefault();
      sendMessage();
    } else if (
      e.key === 'Enter' &&
      (e.metaKey || e.ctrlKey)
    ) {
      setInputValue(prev => prev + '\n');
    }
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-custom-purple text-white p-5 rounded-full shadow-xl hover:scale-110 transition-all"
        aria-label="Abrir Chatbot"
      >
        <FiMessageCircle className="h-7 w-7" />
        {newMessageBadge && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        )}
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
              <h2 className="text-xl font-semibold z-10">
                Chatbot
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none hover:text-gray-300 z-10"
                aria-label="Fechar Chatbot"
              >
                ✖
              </button>
            </div>

            <div className="p-5 text-gray-700">
              <div className="mb-4 max-h-60 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-3 max-w-[80%] rounded-lg ${
                      msg.isUser
                        ? 'bg-custom-purple text-white ml-auto'
                        : 'bg-gray-200 text-black mr-auto'
                    }`}
                    style={{
                      whiteSpace: 'pre-line',
                      textAlign: msg.isUser
                        ? 'right'
                        : 'left',
                    }}
                  >
                    <span className="font-bold">
                      {msg.isUser ? 'Você:' : 'Bot:'}
                    </span>{' '}
                    {msg.text}
                  </div>
                ))}

                {isTyping && (
                  <div className="mb-2 p-2 max-w-[80%] bg-gray-200 text-black self-start mr-auto rounded-lg">
                    {typingText}
                  </div>
                )}

                {responseTime && (
                  <div className="text-xs text-gray-500 text-center">
                    Tempo de resposta: {responseTime}ms
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <textarea
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={e =>
                  setInputValue(e.target.value)
                }
                onKeyDown={handleKeyPress}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-purple focus:ring-2 focus:ring-custom-purple transition-all duration-200 resize-none"
                rows={3}
              />
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  onClick={() =>
                    sendMessage('Falar com um especialista')
                  }
                  className="bg-secondary text-black py-1 px-2 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300 whitespace-nowrap disabled:opacity-50"
                  disabled={isTyping}
                >
                  👉 Falar com um especialista
                </button>
                <button
                  onClick={() =>
                    sendMessage('Solicitar orçamento')
                  }
                  className="bg-secondary text-black py-1 px-4 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300 whitespace-nowrap disabled:opacity-50"
                  disabled={isTyping}
                >
                  💰 Solicitar orçamento
                </button>
                <button
                  onClick={() =>
                    sendMessage('Ver serviços')
                  }
                  className="bg-secondary text-black py-1 px-4 text-[0.7rem] rounded-lg shadow-sm hover:bg-gray-300 whitespace-nowrap disabled:opacity-50"
                  disabled={isTyping}
                >
                  🛠️ Ver serviços
                </button>
              </div>

              <button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className={`mt-4 w-full py-2 px-4 rounded-lg shadow-md transition-all ${
                  inputValue.trim()
                    ? 'bg-custom-purple text-white hover:bg-primary'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                aria-label="Enviar mensagem"
              >
                Enviar
              </button>
            </div>
            {responseTime && (
              <div className="text-xs text-gray-500 text-center">
                Tempo de resposta:{' '}
                {responseTime < 1000
                  ? `${responseTime}ms`
                  : `${(responseTime / 1000).toFixed(2)}s`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
