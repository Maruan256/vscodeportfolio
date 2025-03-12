'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';
import ChatMessage from './ChatMessage';
import { portfolioData } from '../data/portfolio';

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function AiPrompt() {
  const { theme } = useTheme();
  const currentTheme = theme;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi! What would you like to know about Benny Blitz?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const createPrompt = (userQuestion: string) => {
    const context = {
      instruction: "If the prompt is asking about Benny Blitz, incorporate any of the following details as it fits the response:",
      portfolio: {
        personalInfo: portfolioData.personalInfo,
        experience: portfolioData.experience,
        education: portfolioData.education,
        skills: portfolioData.skills,
        projects: portfolioData.projects
      }
    };

    return {
      messages: [
        {
          role: "system",
          content: JSON.stringify(context)
        },
        {
          role: "user",
          content: userQuestion
        }
      ]
    };
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      content: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Prepare the prompt with context
      const prompt = createPrompt(userMessage.content);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to get response from AI');
      }
      
      const botMessage: Message = {
        content: data.response || "I apologize, but I'm having trouble responding right now.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        content: error instanceof Error 
          ? `I apologize, but I encountered an error: ${error.message}`
          : "I apologize, but I'm having trouble responding right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      className={`fixed bottom-0 right-0 transition-all duration-300 ease-in-out ${
        isMinimized ? 'h-10' : 'h-96'
      }`}
      style={{
        width: '300px',
        marginRight: '16px',
        marginBottom: '16px',
        background: themes[currentTheme].sidebarBackground,
        border: `1px solid ${themes[currentTheme].sidebarBorder}`,
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: themes[currentTheme].fontFamily,
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-2 border-b cursor-pointer"
        style={{
          background: themes[currentTheme].topBarBackground,
          borderColor: themes[currentTheme].topBarBorder,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center">
          <span className="mr-2">🤖</span>
          <span className="text-sm font-medium" style={{ color: themes[currentTheme].topBarForeground }}>
            AI Assistant
          </span>
        </div>
        <button 
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-opacity-20"
          style={{
            background: themes[currentTheme].hoverBackground,
            color: themes[currentTheme].topBarForeground,
          }}
        >
          {isMinimized ? '+' : '−'}
        </button>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-40px)]">
          {/* Messages container */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4"
            style={{ color: themes[currentTheme].foreground }}
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isBot={message.isBot}
                timestamp={message.timestamp}
                onContentChange={scrollToBottom}
              />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div 
                  className="rounded-lg px-4 py-2 bg-opacity-10 border border-opacity-20"
                  style={{
                    background: themes[currentTheme].sidebarBackground,
                    borderColor: themes[currentTheme].sidebarBorder,
                    color: themes[currentTheme].foreground,
                  }}
                >
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input field */}
          <div className="p-4 border-t" style={{ borderColor: themes[currentTheme].sidebarBorder }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full p-2 rounded text-sm"
              style={{
                background: themes[currentTheme].editorBackground,
                color: themes[currentTheme].editorForeground,
                border: `1px solid ${themes[currentTheme].sidebarBorder}`,
                fontFamily: themes[currentTheme].monoFontFamily,
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 