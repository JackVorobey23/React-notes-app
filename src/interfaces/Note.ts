import { Category } from "../enums/Category";

export default interface Note {
    name: string,
    created: string,
    category: Category,
    content: string,
    dates: string[],
    id: string,
    isArchived: boolean
}