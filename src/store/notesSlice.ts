import { RootState } from "./store";
import Note from "../interfaces/Note";
import { DateHelper, noteInitialState } from "../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotesState {
  value: Note[]
}

const initialState: NotesState = {
  value: noteInitialState
}

export const notesSlice = createSlice({

  name: 'notes',
  initialState: initialState,

  reducers: {
    
    addNote: (state, action: PayloadAction<Note>) => {
      
      const newNote = action.payload;

      newNote.dates = DateHelper.getDatesFromContent(newNote.content);
      newNote.created = DateHelper.formatCreatedDate(newNote.created);
      
      state.value.push(newNote);
    },
    
    removeNote: (state, action: PayloadAction<string>) => {
      
      state.value = state.value.filter(note => note.id !== action.payload);
    },
    
    updateNote: (state, action: PayloadAction<Note>) => {

      let noteToUpdate = state.value.find(note => note.id === action.payload.id);
      
      if(noteToUpdate) {
        noteToUpdate.name = action.payload.name;
        noteToUpdate.content = action.payload.content;
        noteToUpdate.category = action.payload.category;
        noteToUpdate.dates = DateHelper.getDatesFromContent(noteToUpdate.content);
      }
    },

    archiveNote: (state, action: PayloadAction<string>) => {

      const noteToArchive = state.value.find(note => note.id === action.payload);
      
      if(noteToArchive) {

        noteToArchive.isArchived = true;
      }
    },

    unarchiveNote: (state, action: PayloadAction<string>) => {

      const noteToUnarchive = state.value.find(note => note.id === action.payload);

      if(noteToUnarchive) {

        noteToUnarchive.isArchived = false;
      }
    },

    removeAllNotes: (state) => {
      
      state.value = [];
    },

    archiveAllNotes: (state) => {
      
      state.value.map(note => {
        note.isArchived = true;
      })
    },

    unarchiveAllNotes: (state) => {
      
      state.value.map(note => {
          note.isArchived = false;
      })
    }
  },
})

export const { 
  addNote,
  removeNote,
  updateNote,
  archiveNote,
  unarchiveNote,
  removeAllNotes,
  archiveAllNotes,
  unarchiveAllNotes } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.value;

export default notesSlice.reducer;
