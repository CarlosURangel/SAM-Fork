"use client";
import React from "react";
import { TableBase } from "@/components/tables/TableBase";
import { HistoryUser } from "@/types/table";
import { columnsHistoryUser, dataHistoryUser } from "@/const/AsesoriaHistory";

const page = () => {
  return (
    <section className="mx-16 mt-28 flex-1">
      <h1 className="text-3xl">Historial</h1>
      <TableBase<HistoryUser>
        data={dataHistoryUser}
        columns={columnsHistoryUser}
        searchBy="nameStudent"
      />
    </section>
  );
};

export default page;
