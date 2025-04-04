
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Plus } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onNewNote: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewNote }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-xl md:text-2xl font-bold">Daily Notes</h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        <Button onClick={onNewNote}>
          <Plus className="h-4 w-4 mr-1" />
          <span>New Note</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
