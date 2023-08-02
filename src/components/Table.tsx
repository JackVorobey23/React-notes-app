
import { Category } from "../enums/Category";
import Note from "../interfaces/Note";
import './Table.scss';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeNote, archiveNote, unarchiveNote, archiveAllNotes, unarchiveAllNotes, removeAllNotes } from "../store/notesSlice";
import TableInfo from "../interfaces/TableInfo";
import TableButton from "../interfaces/TableButton";
import { ButtonAction } from "../enums/ButtonAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

export default function TableComponent(tableInfo: TableInfo) {


    const notes = useAppSelector((state) => state.notes.value);
    const dispatch = useAppDispatch();
    const editPopupActive = false;
    return (
        <table>
            <tr>
                {tableInfo.tHeads.map((thead, index) => (<th key={index}>
                    {thead}
                </th>))}
            </tr>
            {tableInfo.tRows.map((rowInfo, index) => (<tr key={index}>
                {rowInfo.map((rowContent, rowStrIndex) => {

                    if (typeof rowContent === 'string') {
                        return (<td key={rowStrIndex}>
                            {rowContent}
                        </td>)
                    }
                    else {
                        return (<td key={rowStrIndex}>
                            {(rowContent as TableButton[]).map(tableButton => {

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

                                        break;

                                    case ButtonAction.RemoveAllNotes:
                                        onclick = () => {
                                            dispatch(removeAllNotes());
                                        }
                                        break;

                                    case ButtonAction.UnarchiveAllNotes:
                                        onclick = () => {
                                            
                                            const categoryToUnarchive = notes
                                                .find(note => note.id === tableButton.attachedNoteId)
                                                ?.category;
                                            if(categoryToUnarchive) {

                                                dispatch(unarchiveAllNotes(categoryToUnarchive));
                                            }
                                        }
                                        break;

                                    default:

                                        break;
                                }

                                return <FontAwesomeIcon icon={icons.faArchive} />
                            })}
                        </td>)
                    }
                })}
            </tr>))}
        </table>
    )
}