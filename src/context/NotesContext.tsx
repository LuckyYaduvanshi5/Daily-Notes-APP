
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Note, NotesState } from '../types/noteTypes';

type Action =
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'SET_CURRENT_NOTE'; payload: Note | null };

interface NotesContextProps {
  state: NotesState;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  setCurrentNote: (note: Note | null) => void;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

function notesReducer(state: NotesState, action: Action): NotesState {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
      };
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
        currentNote: state.currentNote?.id === action.payload.id ? action.payload : state.currentNote,
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        currentNote: state.currentNote?.id === action.payload ? null : state.currentNote,
      };
    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: action.payload,
      };
    default:
      return state;
  }
}

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
    currentNote: null,
  });

  useEffect(() => {
    const savedNotes = localStorage.getItem('daily-notes');
    if (savedNotes) {
      dispatch({ type: 'SET_NOTES', payload: JSON.parse(savedNotes) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('daily-notes', JSON.stringify(state.notes));
  }, [state.notes]);

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
    return newNote;
  };

  const updateNote = (note: Note) => {
    const updatedNote = {
      ...note,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
  };

  const deleteNote = (id: string) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  const setCurrentNote = (note: Note | null) => {
    dispatch({ type: 'SET_CURRENT_NOTE', payload: note });
  };

  return (
    <NotesContext.Provider
      value={{
        state,
        addNote,
        updateNote,
        deleteNote,
        setCurrentNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
