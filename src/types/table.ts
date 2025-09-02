import {
    ColumnDef
} from "@tanstack/react-table"

export type UserManagement = {
    nameTeacher: string
    students: string
    statistics: string
    total: number
}

export type HistoryAdmin = {
    date: string
    nameTeacher: string
    students: string
    semester: string
    subject: string
}

export type StudentAssigned = {
    exp: string
    nameStudent: string
    career: string
    semester: string
}

export type TableBaseProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchBy?: keyof TData; 
};
