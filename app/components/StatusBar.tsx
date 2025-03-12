'use client';

import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';

export default function StatusBar() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? 'light' : 'dark';

  return (
    <div 
      className="flex items-center justify-between h-6 text-xs px-2"
      style={{
        background: themes[currentTheme].statusBarBackground,
        color: themes[currentTheme].statusBarForeground,
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="mr-2">🔌</span>
          <span>main</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div>TypeScript</div>
        <div>Spaces: 2</div>
        <div>LF</div>
        <div>Ln 1, Col 1</div>
      </div>
    </div>
  );
} 