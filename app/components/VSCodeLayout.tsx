'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import StatusBar from './StatusBar';
import TopBar from './TopBar';
import AiPrompt from './AiPrompt';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';

export default function VSCodeLayout() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const { theme } = useTheme();
  
  // Use the theme directly since we now handle all themes properly
  const currentTheme = theme;
  
  return (
    <div 
      className="flex flex-col h-screen overflow-hidden"
      style={{
        background: themes[currentTheme].background,
        color: themes[currentTheme].foreground,
        fontFamily: themes[currentTheme].fontFamily,
      }}
    >
      {/* Top bar with menu items */}
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with file explorer */}
        <Sidebar setActiveFile={setActiveFile} activeFile={activeFile} />
        
        {/* Main editor area */}
        <div className="flex-1 overflow-hidden">
          <Editor activeFile={activeFile} />
        </div>
      </div>
      
      {/* Status bar at the bottom */}
      <StatusBar />

      {/* AI Prompt */}
      <AiPrompt />
    </div>
  );
} 