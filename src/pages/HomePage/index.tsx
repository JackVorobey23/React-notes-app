import './HomePage.scss';
import TableComponent from "../../components/Table";
import { ButtonAction } from "../../enums/ButtonAction";
import TableButton from "../../interfaces/TableButton";
import TableInfo from "../../interfaces/TableInfo";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { Category } from "../../enums/Category";
import NoteFormPopup from "../../components/NoteFormPopup";
import { DisplayedNotes } from "../../enums/DisplayedNotes";
export default function HomePage() {

    const notes = useAppSelector(state => state.notes.value);

    const [displayedNotes, setDisplayedNotes] = useState<DisplayedNotes>('Active');
    const [createPopupActive, setCreatePopupActive] = useState(false);

    const noteTableRows = notes
        .filter(note => {
            if (displayedNotes === 'Active') {
                return !note.isArchived
            }
            else if (displayedNotes === 'Archived') {
                return note.isArchived;
            }
            return true;
        })
        .map(note => [

            note.name,
            note.created,
            note.category,
            note.content,
            note.dates.join('; '),
            [{
                action: ButtonAction.EditNote,
                attachedNoteId: note.id
            },
            {
                action: ButtonAction.RemoveNote,
                attachedNoteId: note.id
            },
            {
                action: note.isArchived ? ButtonAction.UnarchiveNote : ButtonAction.ArchiveNote,
                attachedNoteId: note.id
            }] as TableButton[]
        ])
    const notesTableInfo: TableInfo = {
        tHeads: ['Name', 'Created', 'Category', 'Content', 'Dates', [{
            action: ButtonAction.RemoveAllNotes,
            attachedNoteId: ''
        }, {
            action: ButtonAction.ArchiveAllNotes,
            attachedNoteId: ''
        }] as TableButton[]],
        tRows: noteTableRows
    }

    const summaryTableInfo: TableInfo = {
        tHeads: ['Note category', 'Active', 'Archived'],
        tRows: (['Idea', 'Random Thought', 'Task'] as Category[]).map(category => {
            return [
                category,
                `${notes.filter(note => note.category === category && !note.isArchived).length}`,
                `${notes.filter(note => note.category === category && note.isArchived).length}`,
            ]
        })
    }
    return (
        <div className="home-page">
            <fieldset>
                <legend>Select the type of notes to view:</legend>

                <div>
                    <input type="radio"
                        checked={displayedNotes === 'Active'}
                        onChange={() => setDisplayedNotes('Active')} />
                    <label>Active</label>

                    <input type="radio"
                        checked={displayedNotes === 'Archived'}
                        onChange={() => setDisplayedNotes('Archived')} />
                    <label>Archived</label>

                    <input type="radio"
                        checked={displayedNotes === 'All'}
                        onChange={() => setDisplayedNotes('All')} />
                    <label>All</label>
                </div>
            </fieldset>
            <TableComponent tHeads={notesTableInfo.tHeads} tRows={notesTableInfo.tRows} />
            <button className="button__green" onClick={() => setCreatePopupActive(true)}>Create Note</button>
            <TableComponent tHeads={summaryTableInfo.tHeads} tRows={summaryTableInfo.tRows} />

            {createPopupActive ? <NoteFormPopup setPopupActive={setCreatePopupActive}></NoteFormPopup> : <></>}
        </div>
    );
}