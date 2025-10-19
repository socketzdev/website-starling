'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
  userData?: any;
}

export function GeminiChat({ isOpen, onClose, products, userData }: GeminiChatProps) {
  // Verificar compatibilidade do navegador
  const isAudioSupported = typeof window !== 'undefined' && 
    navigator.mediaDevices && 
    !!navigator.mediaDevices.getUserMedia && 
    typeof window.MediaRecorder !== 'undefined';

  const isSpeechSupported = typeof window !== 'undefined' && 
    (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));

  const getInitialMessage = () => {
    if (userData) {
      return `Olá, ${userData.nick}! 👋 ${userData.moedas.toLocaleString()} moedas, Level ${userData.level}. Como posso ajudar? 💎`;
    }
    return 'Olá! Sou o assistente do Starling RPG. Como posso te ajudar hoje? 🎮';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getInitialMessage(),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      chatRef.current.style.opacity = '0';
      chatRef.current.style.transform = 'translateY(20px) scale(0.95)';
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          chatRef.current.style.opacity = '1';
          chatRef.current.style.transform = 'translateY(0) scale(1)';
        }
      }, 50);
    } else if (!isOpen) {
      // Limpar estados quando fechar o chat
      setIsListening(false);
      setIsRetrying(false);
      setTranscribedText('');
      setRetryCount(0);
      
      // Parar reconhecimento se estiver ativo
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Erro ao parar reconhecimento ao fechar:', e);
        }
        recognitionRef.current = null;
      }
    }
  }, [isOpen]);

  const typewriterEffect = (text: string, messageId: string, callback?: () => void) => {
    setIsTyping(true);
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index <= text.length) {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, text: text.slice(0, index), isTyping: true }
            : msg
        ));
        index++;
        scrollToBottom();
      } else {
        clearInterval(typingInterval);
        
        // Transição suave para finalizar
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, isTyping: false }
              : msg
          ));
          if (callback) callback();
        }, 300); // Delay para transição suave
      }
    }, 25); // Velocidade mais rápida e natural
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          products: products,
          userData: userData
        }),
      });

      const data = await response.json();

      const aiMessageId = (Date.now() + 1).toString();
      const fullResponse = data.response || 'Desculpe, não consegui processar sua mensagem. Tente novamente.';
      
      const aiMessage: Message = {
        id: aiMessageId,
        text: '',
        isUser: false,
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Iniciar efeito typewriter
      setTimeout(() => {
        typewriterEffect(fullResponse, aiMessageId);
      }, 500); // Pequeno delay para simular processamento
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startListening = (retryAttempt = 0) => {
    try {
      if (!isSpeechSupported) {
        throw new Error('Seu navegador não suporta reconhecimento de voz');
      }

      // Limpar instância anterior se existir
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Erro ao parar reconhecimento anterior:', e);
        }
        recognitionRef.current = null;
      }

      // Criar nova instância do SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false; // Parar após uma pausa
      recognition.interimResults = true; // Mostrar resultados em tempo real
      recognition.lang = 'pt-BR'; // Português brasileiro
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('Reconhecimento de voz iniciado');
        setIsListening(true);
        setIsRetrying(false);
        setTranscribedText('');
        setRetryCount(0);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullText = finalTranscript || interimTranscript;
        setTranscribedText(fullText);
        console.log('Transcrição:', fullText);
      };

      recognition.onend = () => {
        console.log('Reconhecimento de voz finalizado');
        setIsListening(false);
        
        // Usar o texto final transcrito
        const finalText = transcribedText.trim();
        if (finalText) {
          console.log('Enviando texto final:', finalText);
          sendTranscribedMessage(finalText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento:', event.error);
        setIsListening(false);
        setTranscribedText('');
        
        // Tentar novamente para erros de rede
        if (event.error === 'network' && retryAttempt < 3) {
          console.log(`Tentativa de retry ${retryAttempt + 1}/3 para erro de rede`);
          setIsRetrying(true);
          setRetryCount(retryAttempt + 1);
          
          setTimeout(() => {
            startListening(retryAttempt + 1);
          }, 2000); // Aguardar 2 segundos antes de tentar novamente
          
          return;
        }
        
        // Tratar outros erros
        if (event.error === 'not-allowed') {
          alert('Permissão de microfone negada. Por favor, permita o acesso ao microfone.');
        } else if (event.error === 'no-speech') {
          alert('Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.');
        } else if (event.error === 'network') {
          alert('Erro de conexão com o serviço de reconhecimento de voz. Verifique sua internet e tente novamente.');
        } else if (event.error === 'service-not-allowed') {
          alert('Serviço de reconhecimento de voz não permitido. Use HTTPS ou localhost.');
        } else {
          alert(`Erro no reconhecimento de voz: ${event.error}. Tente novamente.`);
        }
        
        setIsRetrying(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (error: any) {
      console.error('Erro ao iniciar reconhecimento:', error);
      setIsListening(false);
      setIsRetrying(false);
      alert(`Erro ao iniciar reconhecimento de voz: ${error.message}`);
    }
  };

  const stopListening = () => {
    console.log('Parando reconhecimento...', { 
      hasRecognition: !!recognitionRef.current, 
      isListening 
    });
    
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        console.log('Reconhecimento parado com sucesso');
      } catch (error) {
        console.error('Erro ao parar reconhecimento:', error);
        setIsListening(false);
      }
    } else {
      console.warn('Tentativa de parar reconhecimento sem instância ativa');
      setIsListening(false);
    }
  };

  const sendTranscribedMessage = async (text: string) => {
    if (!text.trim()) {
      console.error('Nenhum texto para enviar');
      return;
    }

    console.log('Enviando mensagem transcrita:', text);

    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: `🎤 ${text}`,
        isUser: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setTranscribedText('');
      setIsLoading(true);

      // Enviar para a IA
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          products: products,
          userData: userData
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      console.log('Resposta da IA:', data);

      const aiMessageId = (Date.now() + 1).toString();
      const fullResponse = data.response || 'Desculpe, não consegui processar sua mensagem. Tente novamente.';
      
      const aiMessage: Message = {
        id: aiMessageId,
        text: '',
        isUser: false,
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, aiMessage]);
      
      setTimeout(() => {
        typewriterEffect(fullResponse, aiMessageId);
      }, 500);

    } catch (error) {
      console.error('Erro ao enviar mensagem transcrita:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Erro ao processar mensagem de voz. Tente novamente.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={chatRef}
      className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] bg-black/90 backdrop-blur-md border border-gray-600/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,10,0.98) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Header */}
      <div className="relative p-6 flex items-center justify-between border-b border-gray-600/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-starling-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="material-icons text-white text-lg">smart_toy</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-starling-400 rounded-full border-2 border-black/80 animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">Starling AI</h3>
            <p className="text-gray-400 text-xs font-light">Assistente Virtual</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group border border-gray-600/20"
        >
          <span className="material-icons text-sm group-hover:rotate-90 transition-transform duration-200">close</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`max-w-[85%] relative ${
                message.isUser
                  ? 'bg-gradient-to-r from-starling-600 to-red-600 text-white shadow-lg'
                  : 'bg-gray-800/30 backdrop-blur-sm text-white border border-gray-600/20'
              } rounded-2xl p-4`}
              style={{
                background: message.isUser 
                  ? 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)'
                  : 'rgba(31, 41, 55, 0.4)',
                backdropFilter: message.isUser ? 'none' : 'blur(8px)'
              }}
            >
              <p className="text-sm leading-relaxed font-light">
                {message.text}
                {message.isTyping && (
                  <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse"></span>
                )}
              </p>
              <p className="text-xs opacity-50 mt-2 font-light">
                {message.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-starling-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-starling-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-starling-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-400 font-light">Processando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-600/20">
        {/* Transcrição em tempo real */}
        {transcribedText && (
          <div className="mb-3 p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-600/20 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-icons text-starling-400">mic</span>
              <span className="text-white text-sm font-medium">Transcrição:</span>
            </div>
            <div className="text-white text-sm bg-black/20 p-2 rounded-lg border border-gray-600/30">
              {transcribedText}
              {isListening && (
                <span className="inline-block w-2 h-4 bg-starling-400 ml-1 animate-pulse"></span>
              )}
            </div>
            {!isListening && transcribedText && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setTranscribedText('')}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors text-xs"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => sendTranscribedMessage(transcribedText)}
                  disabled={isLoading || isTyping}
                  className="px-3 py-1 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 text-xs"
                >
                  Enviar
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta..."
              className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:border-starling-500/50 focus:outline-none focus:ring-2 focus:ring-starling-500/20 text-sm font-light transition-all duration-200"
              disabled={isLoading || isTyping || isRecording}
              style={{
                background: 'rgba(31, 41, 55, 0.6)',
                backdropFilter: 'blur(8px)'
              }}
            />
          </div>
          
          {/* Botão de Voz */}
          <button
            onClick={isListening ? stopListening : () => startListening()}
            disabled={!isSpeechSupported || isLoading || isTyping}
            className={`w-12 h-12 rounded-2xl transition-all duration-200 flex items-center justify-center group ${
              !isSpeechSupported
                ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                : isListening 
                  ? 'bg-green-600 hover:bg-green-700 animate-pulse' 
                  : 'bg-gray-700 hover:bg-gray-600'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
            title={
              !isSpeechSupported 
                ? "Reconhecimento de voz não suportado" 
                : isListening 
                  ? "Parar escuta" 
                  : "Falar com a IA"
            }
          >
            <span className={`material-icons text-lg transition-transform duration-200 ${
              !isSpeechSupported 
                ? 'text-gray-500' 
                : isListening 
                  ? 'text-white' 
                  : 'text-gray-300 group-hover:text-white'
            }`}>
              {!isSpeechSupported ? 'mic_off' : isListening ? 'stop' : 'mic'}
            </span>
          </button>

          {/* Botão de Envio */}
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading || isTyping || isListening}
            className="w-12 h-12 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-200 flex items-center justify-center group hover:scale-105 disabled:hover:scale-100"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
            }}
          >
            <span className="material-icons text-lg group-hover:translate-x-0.5 transition-transform duration-200">send</span>
          </button>
        </div>

        {/* Indicador de escuta */}
        {isListening && (
          <div className="mt-2 flex items-center gap-2 text-green-400 text-xs animate-pulse">
            <span className="material-icons text-sm">hearing</span>
            <span>Escutando... Fale agora ou clique no botão verde para parar</span>
          </div>
        )}
        
        {/* Indicador de retry */}
        {isRetrying && (
          <div className="mt-2 flex items-center gap-2 text-yellow-400 text-xs animate-pulse">
            <span className="material-icons text-sm">refresh</span>
            <span>Tentando reconectar... ({retryCount}/3)</span>
          </div>
        )}
      </div>
    </div>
  );
}
