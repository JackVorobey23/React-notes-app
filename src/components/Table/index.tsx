import './Table.scss';
import { removeNote, archiveNote, unarchiveNote, archiveAllNotes, unarchiveAllNotes, removeAllNotes } from "../../store/notesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ButtonAction } from "../../enums/ButtonAction";
import { icons } from "../../constants";
import TableInfo from "../../interfaces/TableInfo";
import TableButton from "../../interfaces/TableButton";
import NoteFormPopup from '../NoteFormPopup';
import { useState } from 'react';
import Note from '../../interfaces/Note';

export default function TableComponent(tableInfo: TableInfo) {

    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);
    const [editedNote, setEditedNote] = useState<Note>();
    const notes = useAppSelector(state => state.notes.value);

    return (
        <div className='table-container'>
            <table>
                <thead>

                    <tr>
                        {tableInfo.tHeads.map((thead, headIndex) => {
                            if (typeof thead === 'string') {
                                return (<th key={`head-s-${headIndex}`}>
                                    {thead}
                                </th>)
                            }
                            else {
                                return (<th key={`head-b-${headIndex}`}>
                                    {(thead as TableButton[]).map((tableButton, iconIndex) => {

                                        let onclick = () => { };

                                        switch (tableButton.action) {
                                            case ButtonAction.RemoveAllNotes:
                                                onclick = () => {
                                                    dispatch(removeAllNotes());
                                                }
                                                break;

                                            case ButtonAction.UnarchiveAllNotes:
                                                onclick = () => {
                                                    dispatch(unarchiveAllNotes());
                                                }
                                                break;

                                            case ButtonAction.ArchiveAllNotes:
                                                onclick = () => {

                                                    dispatch(archiveAllNotes());
                                                }
                                                break;

                                            default:
                                                break;
                                        }
                                        return <FontAwesomeIcon key={`icon-h-${headIndex}-${iconIndex}`} onClick={onclick} icon={icons.get(tableButton.action)!} />
                                    })}
                                </th>)
                            }
                        })}
                    </tr>
                </thead>
                <tbody>

                    {tableInfo.tRows.map((rowInfo, index) => (<tr key={`trow-${index}`}>

                        {rowInfo.map((rowContent, cellIndex) => {

                            if (typeof rowContent === 'string') {
                                return (<td key={`cell-s-${cellIndex}`}>
                                    {rowContent}
                                </td>)
                            }
                            else {
                                return (<td key={`cell-b-${cellIndex}`}>
                                    {(rowContent as TableButton[]).map((tableButton, iconIndex) => {

                                        let onclick = () => { };

                                        switch (tableButton.action) {

                                            case ButtonAction.ArchiveNote:
                                                onclick = () => {
                                                    dispatch(archiveNote(tableButton.attachedNoteId));
                                                }
                                                break;

                                            case ButtonAction.RemoveNote:
                                                onclick = () => {

                                                    dispatch(removeNote(tableButton.attachedNoteId));
                                                }
                                                break;

                                            case ButtonAction.UnarchiveNote:
                                                onclick = () => {
                                                    dispatch(unarchiveNote(tableButton.attachedNoteId));
                                                }
                                                break;

                                            case ButtonAction.EditNote:
                                                onclick = () => {
                                                    setEditedNote(notes.find(note => note.id === tableButton.attachedNoteId));
                                                    setPopupActive(true);
                                                }
                                                break;

                                            default:
                                                break;
                                        }
                                        return <FontAwesomeIcon 
                                            key={`icon-b-${index}-${cellIndex}-${iconIndex}`} 
                                            onClick={onclick} 
                                            icon={icons.get(tableButton.action)!} />
                                    })}
                                </td>)
                            }
                        })}
                    </tr>))}
                </tbody>
            </table>
            {popupActive ? <NoteFormPopup note={editedNote} setPopupActive={setPopupActive}></NoteFormPopup> : <></>}
        </div>
    )
}