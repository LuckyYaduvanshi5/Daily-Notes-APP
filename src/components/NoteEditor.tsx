
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/NotesContext';
import { Note } from '@/types/noteTypes';
import { Share, ArrowLeft, Save, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NoteEditorProps {
  onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onBack }) => {
  const { state, addNote, updateNote, deleteNote, setCurrentNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    if (state.currentNote) {
      setTitle(state.currentNote.title);
      setContent(state.currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [state.currentNote]);

  const handleSave = () => {
    if (title.trim() === '') {
      toast({
        title: "Title is required",
        description: "Please add a title for your note",
        variant: "destructive",
      });
      return;
    }

    if (state.currentNote) {
      updateNote({
        ...state.currentNote,
        title,
        content,
      });
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    } else {
      const newNote = addNote({ title, content });
      setCurrentNote(newNote);
      toast({
        title: "Note created",
        description: "Your note has been created successfully.",
      });
    }
  };

  const handleDelete = () => {
    if (state.currentNote) {
      deleteNote(state.currentNote.id);
      setCurrentNote(null);
      onBack();
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      });
    }
  };

  const handleShareToWhatsApp = () => {
    if (!title && !content) return;
    
    const text = `${title}\n\n${content}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');

    toast({
      title: "Sharing to WhatsApp",
      description: "Opening WhatsApp with your note.",
    });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Button>
          <div className="flex gap-2">
            {state.currentNote && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Trash className="h-4 w-4 mr-1" />
                <span>Delete</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareToWhatsApp}
            >
              <Share className="h-4 w-4 mr-1" />
              <span>Share to WhatsApp</span>
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              <span>Save</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] resize-none border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteEditor;
