import { ButtonAction } from "../enums/ButtonAction";

export default interface TableButton {
    action: ButtonAction,
    attachedNoteId: string
}