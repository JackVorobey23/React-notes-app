import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Note from "../interfaces/Note";
import { Category } from "../enums/Category";

export interface NotesState {
  value: Note[]
}

const initialState: NotesState = {
  value: [{
    name: "Shopping List",
    created: "August 2, 2023",
    category: Category.Task,
    content: "Eggs, Milk 15/8/2023 21/8/2023",
    dates: ["15/8/2023", "21/8/2023"],
    id: "0000",
    isArchived: false
  },
  {
    name: "Personal Notes",
    created: "August 2, 2023",
    category: Category.RandomThought,
    content: "Meeting at 3 PM 22/8/2023",
    dates: ["22/8/2023"],
    id: "1111",
    isArchived: false
  },
  {
    name: "Shopping List",
    created: "August 2, 2023",
    category: Category.RandomThought,
    content: "Submit report, Prepare presentation for 28/8/2023",
    dates: ["28/8/2023"],
    id: "2222",
    isArchived: false
  },
  {
    name: "Shopping List",
    created: "August 2, 2023",
    category: Category.Task,
    content: "Bananas, Apples 3/9/2023 5/9/2023",
    dates: ["3/9/2023", "5/9/2023"],
    id: "3333",
    isArchived: false
  },
  {
    name: "Personal Notes",
    created: "August 2, 2023",
    category: Category.Idea,
    content: "Meeting at 3 PM 10/9/2023",
    dates: ["10/9/2023"],
    id: "4444",
    isArchived: false
  },
  {
    name: "Shopping List",
    created: "August 2, 2023",
    category: Category.Idea,
    content: "Submit report, Prepare presentation for 15/9/2023",
    dates: ["15/9/2023"],
    id: "5555",
    isArchived: true
  },
  {
    name: "Personal Notes",
    created: "August 2, 2023",
    category: Category.RandomThought,
    content: "Meeting at 3 PM 18/9/2023",
    dates: ["18/9/2023"],
    id: "6666",
    isArchived: true
  },
  {
    name: "Shopping List",
    created: "August 2, 2023",
    category: Category.Idea,
    content: "Submit report, Prepare presentation for 22/9/2023",
    dates: ["22/9/2023"],
    id: "7777",
    isArchived: true
  }]
}

export const notesSlice = createSlice({

  name: 'notes',
  initialState: initialState,

  reducers: {
    
    addNote: (state, action: PayloadAction<Note>) => {
      
      state.value.push(action.payload);
    },
    
    removeNote: (state, action: PayloadAction<string>) => {
      
      state.value = state.value.filter(note => note.id !== action.payload);
    },
    
    updateNote: (state, action: PayloadAction<Note>) => {

      let noteToUpdate = state.value.find(note => note.id === action.payload.id);

      noteToUpdate = action.payload;
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
      
      state.value = state.value.filter(note => !note.isArchived);
    },

    archiveAllNotes: (state) => {
      
      state.value.map(note => {
        note.isArchived = true;
      })
    },

    unarchiveAllNotes: (state, action: PayloadAction<Category>) => {
      
      state.value.map(note => {
        if(note.category === action.payload) {
          note.isArchived = false;
        }
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
