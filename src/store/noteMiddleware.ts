import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store'; // Assuming you have a separate file for your root state.
import { addNote } from './notesSlice';

const counterMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {

    if (action.type === addNote.type) {
        
        const payload = action.payload as number;
        if (payload > 0) {
            // Pass the action to the next middleware or the reducer.
            return next(action);
        } else {
            console.error('Invalid payload for addNote: Payload must be a positive number.');
            return;
        }
    }

    // For other actions, just pass them to the next middleware or the reducer.
    return next(action);
};

export default counterMiddleware;