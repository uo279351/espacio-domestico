import { useState, useRef, useEffect } from 'react';
import '../styles/ChatWidget.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "¿Tenéis hornos microondas actualmente en stock?",
  "¿Cuál es vuestro horario de apertura?",
  "¿Dónde estáis ubicados exactamente?",
  "¿Hacéis entregas a domicilio?",
  "¿Tenéis garantía en los productos?",
  "¿Cuál es la historia de Espacio Doméstico?",
  "¿Aceptáis tarjetas de crédito?",
  "¿Tenéis servicio de reparación?"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Aquí iría la lógica para procesar el mensaje y obtener la respuesta
    // Por ahora, simularemos una respuesta después de 1 segundo
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: 'Gracias por tu mensaje. Estoy procesando tu consulta...',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button 
          className="chat-widget-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="chat-icon">💬</span>
          <span className="chat-text">Haznos cualquier pregunta!</span>
        </button>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Asistente Virtual</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="suggested-prompts">
                <h4>Preguntas frecuentes:</h4>
                <div className="prompts-grid">
                  {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      className="prompt-button"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-content loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()}>
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 