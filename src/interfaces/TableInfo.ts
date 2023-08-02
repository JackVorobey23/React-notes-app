import TableButton from "./TableButton";

export default interface TableInfo {
    tHeads: string[],
    tRows: (string | TableButton[])[][]
}