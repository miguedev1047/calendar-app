import { EXAMPLE_NOTES } from '@/constants'
import { type CalendarNoteModel } from '@/types'
import { create } from 'zustand'

interface NotesState {
  notes: CalendarNoteModel[]
  setNotes: (notes: CalendarNoteModel[]) => void
  addNote: (note: CalendarNoteModel) => void
  removeNote: (noteId: string) => void
  updateNote: (updatedNote: CalendarNoteModel) => void
  getNoteById: (noteId: string) => CalendarNoteModel | undefined
}

export const useNotes = create<NotesState>( (set, get) => ({
  notes: EXAMPLE_NOTES,
  setNotes: (notes) => set({ notes }),
  addNote: (note) => {
    const newNote = {
      ...note,
      id: note.id || crypto.randomUUID(),
      createdAt: note.createdAt || new Date(),
      updatedAt: new Date()
    }
    set((state) => ({ notes: [...state.notes, newNote] }))
  },
  removeNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId)
    })),
  updateNote: (updatedNote) => {
    const noteWithTimestamp = {
      ...updatedNote,
      updatedAt: new Date()
    }
    set((state) => ({
      notes: state.notes.map((note) => (note.id === updatedNote.id ? noteWithTimestamp : note))
    }))
  },
  getNoteById: (noteId) => {
    const state = get()
    return state.notes.find((note) => note.id === noteId)
  }
}))
