
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { useNotes } from '@/context/NotesContext';
import { Note } from '@/types/noteTypes';
import { Mic } from 'lucide-react';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { setCurrentNote } = useNotes();
  
  const formattedDate = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
  });

  return (
    <Card 
      className="note-card cursor-pointer hover:border-primary/50"
      onClick={() => setCurrentNote(note)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg truncate">{note.title}</h3>
          {note.audioUrl && (
            <Mic size={16} className="text-primary" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{note.content}</p>
        <p className="text-xs text-muted-foreground mt-2">{formattedDate}</p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
