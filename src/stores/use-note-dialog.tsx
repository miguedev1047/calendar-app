import { type CalendarBase } from '@/components/event-calendar/types'
import type { CalendarNoteModel } from '@/types'
import { create } from 'zustand'

type NoteDialogMode = 'create' | 'edit' | null

interface NoteDialogData {
  note?: CalendarNoteModel | null
  mode: NoteDialogMode
  isOpen: boolean
}

interface NoteDialogState {
  isOpen: boolean
  mode: NoteDialogMode
  noteData: CalendarNoteModel | null
  openNoteDialog: (params: NoteDialogData) => void
  closeNoteDialog: () => void
  setNoteData: (data: CalendarNoteModel | null) => void
}

export const useNoteDialog = create<NoteDialogState>((set) => ({
  isOpen: false,
  mode: null,
  noteData: null,
  openNoteDialog: ({ note = null, mode, isOpen, }) => {
    return set({ isOpen, noteData: note, mode })
  },
  closeNoteDialog: () => {
    return set({ isOpen: false, mode: null, noteData: null })
  },
  setNoteData: (data) => set({ noteData: data }),
}))