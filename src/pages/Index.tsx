
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '@/context/NotesContext';
import Header from '@/components/Header';
import NoteCard from '@/components/NoteCard';
import NoteEditor from '@/components/NoteEditor';
import EmptyState from '@/components/EmptyState';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const Index = () => {
  const { state, setCurrentNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);

  const handleNewNote = () => {
    setCurrentNote(null);
    setIsEditing(true);
  };

  const handleBackToList = () => {
    setIsEditing(false);
  };

  // Group notes by date
  const groupedNotes = state.notes.reduce((groups, note) => {
    const date = format(new Date(note.createdAt), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(note);
    return groups;
  }, {} as Record<string, typeof state.notes>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedNotes).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // When a note is clicked, go to editor
  React.useEffect(() => {
    if (state.currentNote) {
      setIsEditing(true);
    }
  }, [state.currentNote]);

  return (
    <div className="container max-w-3xl mx-auto px-4 pb-10 animate-fade-in">
      <Header onNewNote={handleNewNote} />
      
      {isEditing ? (
        <NoteEditor onBack={handleBackToList} />
      ) : (
        <div className="mt-6">
          {state.notes.length === 0 ? (
            <div className="space-y-8">
              <EmptyState onNewNote={handleNewNote} />
              <div className="text-center">
                <p className="text-muted-foreground">New to Daily Notes?</p>
                <Link to="/how-to-use">
                  <Button variant="link" className="mt-2">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    How to use Daily Notes
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date}>
                  <h2 className="text-lg font-semibold mb-3">
                    {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {groupedNotes[date].map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
