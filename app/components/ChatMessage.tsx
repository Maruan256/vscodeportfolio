'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';

interface ChatMessageProps {
  content: string;
  isBot: boolean;
  timestamp: Date;
  onContentChange?: () => void;
}

export default function ChatMessage({ content, isBot, timestamp, onContentChange }: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const currentTheme = theme;

  useEffect(() => {
    if (!isBot) {
      setDisplayedContent(content);
      return;
    }

    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        onContentChange?.();
      }, 30);

      return () => clearTimeout(timer);
    }
  }, [content, currentIndex, isBot, onContentChange]);

  const formatTime = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className="flex flex-col">
        <div 
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            isBot 
              ? 'bg-opacity-10 border border-opacity-20' 
              : 'bg-opacity-20'
          }`}
          style={{
            background: isBot 
              ? themes[currentTheme].sidebarBackground 
              : themes[currentTheme].activeBackground,
            borderColor: isBot 
              ? themes[currentTheme].sidebarBorder 
              : 'transparent',
            color: themes[currentTheme].foreground,
          }}
        >
          {displayedContent}
          {isBot && currentIndex < content.length && (
            <span className="animate-pulse">▋</span>
          )}
        </div>
        <span 
          className="text-xs mt-1 px-2"
          style={{
            color: `${themes[currentTheme].foreground}80`
          }}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
} 