
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sun, Moon, Plus, HelpCircle, Save, Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useNotes } from '@/context/NotesContext';
import { useToast } from '@/components/ui/use-toast';

interface HeaderProps {
  onNewNote: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewNote }) => {
  const { theme, toggleTheme } = useTheme();
  const { exportToPDF, backupToGoogleDrive } = useNotes();
  const { toast } = useToast();

  const handleExportPDF = () => {
    const pdfUri = exportToPDF();
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfUri;
    link.download = `daily-notes-export-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "PDF Export Successful",
      description: "Your notes have been exported as a PDF file",
    });
  };

  const handleGoogleDriveBackup = async () => {
    toast({
      title: "Backing up to Google Drive",
      description: "Please wait while we back up your notes...",
    });

    const success = await backupToGoogleDrive();
    
    if (success) {
      toast({
        title: "Backup Successful",
        description: "Your notes have been backed up to Google Drive",
      });
    } else {
      toast({
        title: "Backup Failed",
        description: "There was an error backing up your notes",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/b02a837e-d58b-45d7-9442-7b49903c5374.png" 
          alt="Daily Notes Logo" 
          className="w-10 h-10 mr-3"
        />
        <h1 className="text-xl md:text-2xl font-bold">Daily Notes</h1>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/how-to-use">How to Use</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Save className="h-5 w-5" />
              <span className="sr-only">Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportPDF}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleGoogleDriveBackup}>
              Backup to Google Drive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
