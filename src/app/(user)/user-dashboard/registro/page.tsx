"use client";
import React from "react";
import { AddStudentDialog } from "@/components/forms/AddStudentDialog";
import { TableBase } from "@/components/tables/TableBase";
import { StudentAssigned } from "@/types/table";
import {
  columnsStudentAssignedTable,
  dataStudentAssignedTable,
} from "@/const/StudentAssignedTable";

const page = () => {
  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-3xl">Alumnos</h1>
        <AddStudentDialog></AddStudentDialog>
      </div>
      <TableBase<StudentAssigned>
        data={dataStudentAssignedTable}
        columns={columnsStudentAssignedTable}
        searchBy="exp"
      />
    </section>
  );
};

export default page;
