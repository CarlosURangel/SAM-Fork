import { FullStudentData } from "@/const/StudentAssignedTable";
import { ColumnDef } from "@tanstack/react-table";

export type UserManagement = {
  nameTeacher: string;
  students: string;
  statistics: string;
  total: number;
  cveTeacher: string;
};

export type HistoryAdmin = {
  idAdvisory: string;
  advisoryDate: string | null;
  topic: string | null;
  cveMaestro: string;
  status: string;
  student: FullStudentData;
  subject: { idSubject: string; name: string };
  nameTeacher: string;
  semester: string;
};
export type HistoryUser = {
  date: string;
  nameStudent: string;
  career: string;
  semester: string;
  subject: string;
};

export type StudentAssigned = {
  exp: string;
  nameStudent: string;
  career: string;
  semester: string;
};

export type TableBaseProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchBy?: string | string[];
  searchValue?: string;
};
