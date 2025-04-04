
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onNewNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewNote }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <div className="bg-primary/10 rounded-full p-4 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary h-8 w-8"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      </div>
      <h3 className="text-xl font-medium mb-2">No notes yet</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        Start by creating your first note. Your notes will be saved locally and can be shared to WhatsApp.
      </p>
      <Button onClick={onNewNote}>
        <Plus className="h-4 w-4 mr-1" />
        <span>Create your first note</span>
      </Button>
    </div>
  );
};

export default EmptyState;
