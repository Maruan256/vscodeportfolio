'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themes';

// Define the file structure for our technology tree
interface FileNode {
  id: string;
  name: string;
  icon: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  extension?: string;
}

interface SidebarProps {
  setActiveFile: (file: string | null) => void;
  activeFile: string | null;
}

export default function Sidebar({ setActiveFile, activeFile }: SidebarProps) {
  const { theme } = useTheme();
  const currentTheme = theme;
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'technologies': true,
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  // Define our technology file structure
  const fileTree: FileNode[] = [
    {
      id: 'technologies',
      name: 'Technologies',
      icon: themes[currentTheme].folderIcon,
      type: 'folder',
      children: [
        {
          id: 'frontend',
          name: 'Frontend',
          icon: themes[currentTheme].folderIcon,
          type: 'folder',
          children: [
            {
              id: 'react-component.tsx',
              name: 'ReactComponent.tsx',
              icon: themes[currentTheme].reactIcon,
              type: 'file',
              extension: 'tsx'
            },
            {
              id: 'angular-component.ts',
              name: 'angular-component.ts',
              icon: themes[currentTheme].tsIcon,
              type: 'file',
              extension: 'ts'
            },
            {
              id: 'angular-template.html',
              name: 'angular-template.html',
              icon: themes[currentTheme].htmlIcon,
              type: 'file',
              extension: 'html'
            },
            {
              id: 'angular-styles.css',
              name: 'angular-styles.css',
              icon: themes[currentTheme].cssIcon,
              type: 'file',
              extension: 'css'
            }
          ]
        },
        {
          id: 'backend',
          name: 'Backend',
          icon: themes[currentTheme].folderIcon,
          type: 'folder',
          children: [
            {
              id: 'java-spring.java',
              name: 'JavaSpring.java',
              icon: '☕',
              type: 'file',
              extension: 'java'
            },
            {
              id: 'ruby-on-rails.erb',
              name: 'RubyOnRails.erb',
              icon: '💎',
              type: 'file',
              extension: 'erb'
            },
            {
              id: 'node-express.js',
              name: 'NodeExpress.js',
              icon: themes[currentTheme].jsIcon,
              type: 'file',
              extension: 'js'
            }
          ]
        },
        {
          id: 'database',
          name: 'Database',
          icon: themes[currentTheme].folderIcon,
          type: 'folder',
          children: [
            {
              id: 'postgresql.sql',
              name: 'PostgreSQL.sql',
              icon: '🗃️',
              type: 'file',
              extension: 'sql'
            },
            {
              id: 'mongodb.js',
              name: 'MongoDB.js',
              icon: themes[currentTheme].jsIcon,
              type: 'file',
              extension: 'js'
            }
          ]
        }
      ]
    }
  ];

  // Function to render the file tree recursively
  const renderTree = (nodes: FileNode[]) => {
    return nodes.map(node => {
      if (node.type === 'folder') {
        const isExpanded = expandedFolders[node.id] || false;
        
        return (
          <div key={node.id} className="ml-2">
            <div 
              className="flex items-center py-1 px-2 cursor-pointer transition-colors duration-100"
              style={{
                backgroundColor: isExpanded ? themes[currentTheme].activeBackground : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themes[currentTheme].hoverBackground;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isExpanded ? themes[currentTheme].activeBackground : 'transparent';
              }}
              onClick={() => toggleFolder(node.id)}
            >
              <span className="mr-1">{isExpanded ? '📂' : '📁'}</span>
              <span>{node.name}</span>
            </div>
            
            {isExpanded && node.children && (
              <div className="ml-2">
                {renderTree(node.children)}
              </div>
            )}
          </div>
        );
      } else {
        // File node
        const isActive = activeFile === node.id;
        
        return (
          <div 
            key={node.id}
            className="flex items-center py-1 px-2 ml-2 cursor-pointer transition-colors duration-100"
            style={{
              backgroundColor: isActive ? themes[currentTheme].activeBackground : 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themes[currentTheme].hoverBackground;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isActive ? themes[currentTheme].activeBackground : 'transparent';
            }}
            onClick={() => setActiveFile(node.id)}
          >
            <span className="mr-1">
              {getFileIcon(node.extension || '', currentTheme)}
            </span>
            <span>{node.name}</span>
          </div>
        );
      }
    });
  };

  // Function to get appropriate icon based on file extension
  const getFileIcon = (extension: string, theme: string) => {
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
  };

  return (
    <div 
      className="w-64 h-full overflow-y-auto border-r"
      style={{
        background: themes[currentTheme].sidebarBackground,
        color: themes[currentTheme].sidebarForeground,
        borderColor: themes[currentTheme].sidebarBorder,
        fontFamily: themes[currentTheme].fontFamily,
      }}
    >
      <div 
        className="p-2 text-sm font-medium uppercase"
        style={{ color: themes[currentTheme].sidebarForeground }}
      >
        Explorer
      </div>
      <div className="text-sm">
        {renderTree(fileTree)}
      </div>
    </div>
  );
} 