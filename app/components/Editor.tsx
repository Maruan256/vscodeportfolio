'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';
import ResumeContent from './ResumeContent';

interface EditorProps {
  activeFile: string | null;
}

export default function Editor({ activeFile }: EditorProps) {
  const { theme } = useTheme();
  const currentTheme = theme;
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  
  // Generate line numbers based on content
  useEffect(() => {
    if (activeFile) {
      // Assuming an average of 30 lines per file
      setLineNumbers(Array.from({ length: 30 }, (_, i) => i + 1));
    } else {
      setLineNumbers([]);
    }
  }, [activeFile]);

  if (!activeFile) {
    return (
      <div 
        className="h-full flex items-center justify-center"
        style={{
          background: themes[currentTheme].editorBackground,
          color: themes[currentTheme].editorForeground,
          fontFamily: themes[currentTheme].fontFamily,
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Welcome to My Portfolio</h2>
          <p style={{ color: themes[currentTheme].lineNumbersForeground }}>
            Select a file from the explorer to view my resume
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div 
        className="flex h-9 border-b"
        style={{
          background: themes[currentTheme].topBarBackground,
          borderColor: themes[currentTheme].topBarBorder,
          fontFamily: themes[currentTheme].fontFamily,
        }}
      >
        <div 
          className="flex items-center px-4 border-r"
          style={{
            background: themes[currentTheme].editorBackground,
            borderColor: themes[currentTheme].topBarBorder,
            color: themes[currentTheme].editorForeground,
          }}
        >
          <span className="mr-2">
            {getFileIcon(activeFile.split('.').pop() || '', currentTheme)}
          </span>
          <span className="text-sm">{getFileName(activeFile)}</span>
        </div>
      </div>
      
      {/* Editor content */}
      <div 
        className="flex-1 overflow-auto"
        style={{
          background: themes[currentTheme].editorBackground,
          fontFamily: themes[currentTheme].monoFontFamily,
        }}
      >
        <div className="flex">
          {/* Line numbers */}
          <div 
            className="text-right pr-2 py-1 select-none text-xs w-12"
            style={{
              background: themes[currentTheme].lineNumbersBackground,
              color: themes[currentTheme].lineNumbersForeground,
              fontFamily: themes[currentTheme].monoFontFamily,
            }}
          >
            {lineNumbers.map(num => (
              <div key={num} className="leading-5">{num}</div>
            ))}
          </div>
          
          {/* Code content */}
          <div 
            className="flex-1 py-1 pl-2 pr-4 font-mono text-sm overflow-x-auto"
            style={{
              background: themes[currentTheme].editorBackground,
              color: themes[currentTheme].editorForeground,
              fontFamily: themes[currentTheme].monoFontFamily,
            }}
          >
            <ResumeContent fileId={activeFile} theme={currentTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get file icon based on extension
function getFileIcon(extension: string, theme: string) {
  const icons = themes[theme as keyof typeof themes];
  switch (extension) {
    case 'tsx':
    case 'jsx':
      return icons.reactIcon;
    case 'ts':
      return icons.tsIcon;
    case 'js':
      return icons.jsIcon;
    case 'html':
      return icons.htmlIcon;
    case 'css':
      return icons.cssIcon;
    case 'java':
      return '☕';
    case 'erb':
      return '💎';
    case 'sql':
      return '🗃️';
    case 'yml':
      return icons.configIcon;
    case 'md':
      return icons.mdIcon;
    case 'json':
      return icons.jsonIcon;
    default:
      return icons.fileIcon;
  }
}

// Helper function to get file name from path
function getFileName(path: string) {
  return path.split('/').pop() || path;
} 