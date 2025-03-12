'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const currentTheme = theme;
  
  const menuItems = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help'];

  const themeEmojis = {
    dark: '🌙',
    light: '☀️',
    monokai: '🎨',
    github: '🐱',
    nord: '❄️',
    solarized: '🌅'
  };

  const availableThemes = ['dark', 'light', 'monokai', 'github', 'nord', 'solarized'] as const;
  
  const handleMenuClick = (item: string) => {
    if (activeDropdown === item) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(item);
    }
  };

  const handleThemeChange = (newTheme: typeof availableThemes[number]) => {
    setTheme(newTheme);
    setActiveDropdown(null);
  };

  return (
    <div 
      className="flex items-center h-9 text-sm border-b relative"
      style={{
        background: themes[currentTheme].topBarBackground,
        color: themes[currentTheme].topBarForeground,
        borderColor: themes[currentTheme].topBarBorder,
      }}
    >
      <div className="flex items-center h-full px-2">
        <div className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <span className="font-medium">Portfolio VS Code</span>
      </div>
      
      <div className="flex ml-4">
        {menuItems.map((item) => (
          <div key={item} className="relative">
            <div
              className="px-3 py-1 cursor-pointer menu-item"
              style={{
                backgroundColor: activeDropdown === item ? themes[currentTheme].activeBackground : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themes[currentTheme].hoverBackground;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = activeDropdown === item ? themes[currentTheme].activeBackground : 'transparent';
              }}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </div>
            
            {/* Dropdown for View menu */}
            {item === 'View' && activeDropdown === 'View' && (
              <div 
                className="absolute top-full left-0 w-48 py-1 shadow-lg z-50"
                style={{
                  background: themes[currentTheme].sidebarBackground,
                  color: themes[currentTheme].sidebarForeground,
                  border: `1px solid ${themes[currentTheme].sidebarBorder}`,
                }}
              >
                <div 
                  className="px-3 py-1 font-medium border-b" 
                  style={{ borderColor: themes[currentTheme].sidebarBorder }}
                >
                  Appearance
                </div>
                {availableThemes.map((themeName) => (
                  <div
                    key={themeName}
                    className="px-4 py-1 cursor-pointer flex items-center justify-between theme-option"
                    style={{
                      backgroundColor: themeName === currentTheme ? themes[currentTheme].activeBackground : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = themes[currentTheme].hoverBackground;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = themeName === currentTheme ? themes[currentTheme].activeBackground : 'transparent';
                    }}
                    onClick={() => handleThemeChange(themeName)}
                  >
                    <span className="capitalize">{themeName}</span>
                    <span className="text-xs">{themeEmojis[themeName]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 