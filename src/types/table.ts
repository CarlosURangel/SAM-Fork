import {
    ColumnDef
} from "@tanstack/react-table"

export type UserManagement = {
    nameTeacher: string
    students: string
    statistics: string
    total: number
}

export type TableBaseProps = {
    data: UserManagement[]
    columns: ColumnDef<UserManagement>[]
    searchBy?: string
}