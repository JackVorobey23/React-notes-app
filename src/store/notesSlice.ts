import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Note from "../interfaces/Note";
import { Category } from "../enums/Category";

export interface NotesState {
  value: Note[]
}

const initialState: NotesState = {
  value: [{
    name: "Personal Notes",
    created: '5/16/2021',
    category: Category.Task,
    content: "Meeting at 3 PM 7/16/2021",
    dates: ['7/16/2021'],
    id: "1111",
    isArchived: false
  }]
}

export const notesSlice = createSlice({
  
  name: 'notes',
  initialState: initialState,
  
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.value.push(action.payload);
    }
  },
})

export const {addNote} = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.value;

export default notesSlice.reducer;
