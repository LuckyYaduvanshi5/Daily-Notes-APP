
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/NotesContext';
import { Note } from '@/types/noteTypes';
import { Share, ArrowLeft, Save, Trash, Mic, MicOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { startRecording, stopRecording } from '@/utils/voiceNotes';

interface NoteEditorProps {
  onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onBack }) => {
  const { state, addNote, updateNote, deleteNote, setCurrentNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state.currentNote) {
      setTitle(state.currentNote.title);
      setContent(state.currentNote.content);
      setAudioUrl(state.currentNote.audioUrl);
    } else {
      setTitle('');
      setContent('');
      setAudioUrl(undefined);
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
        audioUrl
      });
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    } else {
      const newNote = addNote({ 
        title, 
        content,
        audioUrl
      });
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

  const handleStartRecording = async () => {
    try {
      const recorder = await startRecording();
      if (recorder) {
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
        
        toast({
          title: "Recording started",
          description: "Speak into your microphone. Click stop when done.",
        });
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current) {
      try {
        const url = await stopRecording(mediaRecorderRef.current);
        setAudioUrl(url);
        setIsRecording(false);
        
        toast({
          title: "Recording saved",
          description: "Voice note has been added to your note.",
        });
      } catch (error) {
        console.error('Error stopping recording:', error);
        toast({
          title: "Recording failed",
          description: "There was an error saving your voice note.",
          variant: "destructive",
        });
      }
    }
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
            {isRecording ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleStopRecording}
              >
                <MicOff className="h-4 w-4 mr-1" />
                <span>Stop Recording</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleStartRecording}
              >
                <Mic className="h-4 w-4 mr-1" />
                <span>Record Voice</span>
              </Button>
            )}
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
          
          {audioUrl && (
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Voice Note</h3>
              <audio src={audioUrl} controls className="w-full" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteEditor;
