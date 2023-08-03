import './NoteFormPopup.scss'
import { useState } from "react";
import Note from "../../interfaces/Note";
import { Category } from "../../enums/Category";
import { useAppDispatch } from "../../store/hooks";
import { addNote, updateNote } from "../../store/notesSlice";
export default function NoteFormPopup({ note, setPopupActive }: { note?: Note, setPopupActive: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [name, setName] = useState<string>(note ? note.name : '');
    const [category, setCategory] = useState<Category>(note ? note.category : 'Random Thought');
    const [content, setContent] = useState<string>(note ? note.content : '');

    const dispatch = useAppDispatch();

    return (<div className="popup-background">
        <div className="popup">
            <p>{note ? 'Edit Note' : 'Create Note'}</p>

            <p>Note Name: <input type="text" onChange={(event) => setName(event.target.value)} value={name}></input></p>

            <p>Note Category:</p>

            <select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
            >
                <option value='Idea'>Idea</option>
                <option value='Random Thought'>Random Thought</option>
                <option value='Task'>Task</option>
            </select>

            <div className='flex-center'>
                <p>Note Content:</p> <textarea value={content} onChange={(event) => setContent(event.target.value)}></textarea>
            </div>

            <button className="button__green"
                onClick={
                    () => {
                        if (note) {
                            dispatch(updateNote({
                                id: note.id,
                                name: name,
                                category: category,
                                content: content,
                                created: note.created,
                                dates: note.dates,
                                isArchived: note.isArchived
                            }));
                        }
                        else {
                            dispatch(addNote({
                                id: crypto.randomUUID(),
                                name: name,
                                category: category,
                                content: content,
                                created: new Date(Date.now()).toString(),
                                dates: [],
                                isArchived: false
                            }))
                        }
                        setCategory('Idea');
                        setContent('');
                        setName('');
                        setPopupActive(false);
                    }}>
                {note ? 'Save' : 'Create'}</button>

        </div>
    </div>)
}