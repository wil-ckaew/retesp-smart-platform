// frontend-web/src/components/chatbot/Chatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Paperclip, Mic, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "suggestion";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou o assistente IA da RETESP. Posso ajudar com monitoramento de sensores, análise preditiva e relatórios. Como posso ajudá-lo hoje?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Status dos sensores agora?",
    "Gerar relatório de desempenho",
    "Alertas recentes importantes",
    "Configurar novo dispositivo IoT",
    "Previsão de manutenção",
    "Dashboard de métricas",
  ];

  const quickActions = [
    { label: "📊 Dashboard", action: "Abrir dashboard principal" },
    { label: "🚨 Alertas", action: "Mostrar alertas ativos" },
    { label: "📈 Relatório", action: "Gerar relatório automático" },
    { label: "⚙️ Config", action: "Abrir configurações" },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Analisando os dados dos sensores... Todos os 50 dispositivos estão online. 3 sensores mostram vibração acima do normal na linha B.",
        "Relatório gerado! O desempenho geral está em 94%. Recomendo verificação preventiva nos retentores 12, 23 e 47.",
        "Baseado nos dados históricos, prevejo que o sensor #45 precisará de manutenção em aproximadamente 72 horas.",
        "Sistema operando normalmente. Temperatura média: 42°C, Vibração: 2.3mm/s, Pressão: 8.5 bar. Todos dentro dos parâmetros ideais.",
        "Detectei um padrão anormal nos dados das últimas 2 horas. Sugiro inspeção visual nos componentes da seção C.",
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content: action,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    setInput(action);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "w-16 h-16 rounded-2xl",
          "bg-gradient-to-br from-blue-600 to-purple-600",
          "shadow-2xl shadow-blue-500/30",
          "flex items-center justify-center",
          "text-white",
          "hover:shadow-3xl hover:shadow-blue-500/40",
          "transition-all duration-300",
          "group",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-md h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-7 h-7" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-600 animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Assistente RETESP</h3>
                    <p className="text-sm text-blue-100 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Online • IA Preditiva
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Sparkles className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.action)}
                    className="px-3 py-1.5 text-sm bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors flex items-center"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 bg-white dark:bg-gray-900 h-[calc(100%-180px)] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    {message.sender === "assistant" && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl p-4 shadow-sm",
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {message.sender === "assistant" && (
                          <div className="flex items-center space-x-1">
                            <button className="p-1 hover:bg-white/10 rounded">
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-white/10 rounded">
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.sender === "user" && (
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-3 p-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Analisando...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Perguntas frequentes:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center space-x-2">
                  <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Digite sua mensagem..."
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-24"
                    />
                    <button
                      onClick={() => setIsListening(!isListening)}
                      className={cn(
                        "absolute right-14 top-1/2 transform -translate-y-1/2 p-2 rounded-lg",
                        isListening 
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 animate-pulse" 
                          : "text-gray-400 hover:text-gray-600"
                      )}
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={cn(
                      "p-3.5 rounded-xl",
                      "bg-gradient-to-r from-blue-600 to-purple-600",
                      "text-white",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "hover:shadow-lg hover:shadow-blue-500/30",
                      "transition-all duration-200",
                      "flex items-center justify-center"
                    )}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Assistente IA • Processamento em tempo real
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}