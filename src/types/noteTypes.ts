
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  audioUrl?: string; // For voice notes
  tags?: string[]; // For categorizing notes
}

export interface NotesState {
  notes: Note[];
  currentNote: Note | null;
}
