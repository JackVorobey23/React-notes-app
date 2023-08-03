import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import notesReducer  from './notesSlice';
import checkNoteMiddleware from "./noteMiddleware";

export const store = configureStore({
    reducer: {
        notes: notesReducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(checkNoteMiddleware))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;