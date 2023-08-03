import { Middleware } from '@reduxjs/toolkit';
import Note from '../interfaces/Note';

const checkNoteMiddleware: Middleware = (store) => (next) => (action) => {

    if ((action.payload as Note) !== undefined) {
        const passedNote = action.payload as Note;

        if (passedNote.name === '') {
            console.log('note name does not provided');
            return;
        }
        if (passedNote.content === '') {
            console.log('note content does not provided');
            return;
        }
    }
    return next(action);
};

export default checkNoteMiddleware;
