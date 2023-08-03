import TableButton from "./TableButton";

export default interface TableInfo {
    tHeads: (string | TableButton[])[],
    tRows: (string | TableButton[])[][]
}