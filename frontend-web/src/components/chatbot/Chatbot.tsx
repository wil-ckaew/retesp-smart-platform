// components/chatbot/Chatbot.tsx - VERSÃO COMPLETA COM OPENAI
"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  HelpCircle,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Zap,
  Shield,
  Thermometer,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isError?: boolean;
}

interface ChatConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}

const FAQ_QUESTIONS = [
  "Como adicionar um novo selo?",
  "Como configurar alertas de temperatura?",
  "O que fazer quando um selo está com status crítico?",
  "Como exportar dados para Excel?",
  "Como interpretar os gráficos de vibração?",
  "O que é análise preditiva na RETESP?",
];

const INITIAL_CONFIG: ChatConfig = {
  model: process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "👋 Olá! Sou o **Assistente IA da RETESP**. Posso ajudar você com:\n\n• Monitoramento de selos\n• Configuração de alertas\n• Análise de dados\n• Solução de problemas\n\nPergunte-me qualquer coisa sobre a plataforma!",
      sender: "bot", 
      timestamp: new Date() 
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(INITIAL_CONFIG);
  const [showConfig, setShowConfig] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Format messages for API
      const apiMessages = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          temperature: config.temperature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na API');
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error: any) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: `⚠️ **Erro**: ${error.message || 'Falha na comunicação com o servidor.'}\n\nVerifique sua conexão ou tente novamente.`,
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleFAQClick = (question: string) => {
    setInput(question);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleFeedback = (type: 'like' | 'dislike', messageId: number) => {
    // Aqui você pode enviar o feedback para seu backend
    console.log(`Feedback ${type} para mensagem ${messageId}`);
    
    // Feedback visual
    const feedbackMessages = {
      like: "👍 Obrigado pelo feedback positivo!",
      dislike: "📝 Entendi, vou melhorar minhas respostas."
    };

    const feedbackMessage: Message = {
      id: messages.length + 1,
      text: feedbackMessages[type],
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, feedbackMessage]);
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "👋 Olá! Sou o **Assistente IA da RETESP**. Como posso ajudar você hoje?",
        sender: "bot", 
        timestamp: new Date() 
      },
    ]);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Zap className="w-3 h-3 text-white" />
        </div>
        <div className="absolute -bottom-12 right-0 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Assistente IA RETESP
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[700px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Assistente IA RETESP</h3>
                      <p className="text-sm text-blue-100 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Conectado
                        </span>
                        <span className="text-blue-200">•</span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {config.model}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowConfig(!showConfig)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Configurações"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={clearChat}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-sm text-white"
                      title="Limpar conversa"
                    >
                      Limpar
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Config Panel */}
                <AnimatePresence>
                  {showConfig && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-blue-500/30 overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-blue-100 mb-1">
                            Modelo: <span className="font-mono text-xs">{config.model}</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm text-blue-100 mb-1">
                            Temperatura: {config.temperature.toFixed(1)}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={config.temperature}
                            onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
                            className="w-full h-2 bg-blue-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-blue-200 mt-1">
                            <span>Mais focado</span>
                            <span>Mais criativo</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl p-4 relative",
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none shadow-lg"
                            : message.isError
                            ? "bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-200 dark:border-red-800 rounded-tl-none"
                            : "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm"
                        )}
                      >
                        {/* Message Content */}
                        <div className={cn(
                          "prose prose-sm dark:prose-invert max-w-none",
                          message.sender === "user" ? "prose-invert" : ""
                        )}>
                          <Markdown
                            components={{
                              h1: ({node, ...props}) => <h3 className="text-lg font-bold mt-2 mb-3" {...props} />,
                              h2: ({node, ...props}) => <h4 className="text-md font-semibold mt-2 mb-2" {...props} />,
                              h3: ({node, ...props}) => <h5 className="text-sm font-semibold mt-1 mb-1" {...props} />,
                              p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                              code: ({node, ...props}) => <code className="bg-gray-800 text-gray-100 px-1 py-0.5 rounded text-xs" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                            }}
                          >
                            {message.text}
                          </Markdown>
                        </div>
                        
                        {/* Message Footer */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-opacity-20 border-current">
                          <div className="text-xs opacity-70 flex items-center gap-2">
                            <span>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.sender === "bot" && !message.isError && (
                              <span className="px-1.5 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded text-[10px]">
                                IA
                              </span>
                            )}
                          </div>
                          
                          {message.sender === "bot" && message.id > 1 && !message.isError && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleFeedback('like', message.id)}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                                title="Resposta útil"
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleFeedback('dislike', message.id)}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                                title="Resposta precisa"
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl rounded-tl-none p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Pensando...
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* FAQ & Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                {/* FAQ Suggestions */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <HelpCircle className="w-4 h-4" />
                      <span>Pergunte sobre:</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Thermometer className="w-3 h-3" />
                        <span>Selos</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Activity className="w-3 h-3" />
                        <span>Alertas</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Shield className="w-3 h-3" />
                        <span>Segurança</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FAQ_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleFAQClick(question)}
                        className="px-3 py-1.5 text-xs bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      placeholder="Digite sua pergunta sobre RETESP..."
                      disabled={isLoading}
                      className="w-full pl-4 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      rows={1}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className={cn(
                        "absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200",
                        input.trim() && !isLoading
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-1"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Powered by OpenAI</span>
                    </div>
                    <span>•</span>
                    <span>RETESP Assistant v2.0</span>
                  </div>
                  <button
                    onClick={() => window.open('https://platform.openai.com/usage', '_blank')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Ver uso
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}