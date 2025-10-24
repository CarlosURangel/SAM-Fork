"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { TableBase } from "@/components/tables/TableBase";
import {
  AdvisoryDialog,
  FullAdvisoryData,
} from "@/components/forms/RegisterPrivateLesson";
import { downloadPDF } from "@/lib/downloadPDF";
import { createHistoryColumns } from "@/const/AsesoriaHistory";
import { colums2Search } from "@/const/historyPages/historyTeacher";
import { getHistory } from "@/lib/dataHistory";
import { useParams } from "next/navigation";

const Page = () => {
  const [allAdvisories, setAllAdvisories] = useState<FullAdvisoryData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advisoryToEdit, setAdvisoryToEdit] = useState<FullAdvisoryData | null>(
    null
  );

  const params = useParams()
  const studentName = params.name?.toString().replaceAll("%20", " ") || "";

  const fetchHistory = useCallback(async () => {
    const data = await getHistory()
    setAllAdvisories(data)
  }, []);

  useEffect(() => {
    document.title = "Historial de Asesorías";
    fetchHistory();
  }, [fetchHistory]);


  const handleEdit = (advisory: FullAdvisoryData) => {
    setAdvisoryToEdit(advisory);
    setIsModalOpen(true);
  };

  const handleActionComplete = () => {
    setIsModalOpen(false);
    fetchHistory();
  };

  const columns = useMemo(() => createHistoryColumns(handleEdit, downloadPDF), []);

  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Historial de Asesorías</h1>
      </div>

      <AdvisoryDialog
        advisoryToEdit={advisoryToEdit}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onActionComplete={handleActionComplete}
      />

      <TableBase<FullAdvisoryData>
        data={allAdvisories}
        columns={columns}
        searchBy={colums2Search}
        searchValue={studentName}
      />
    </section>
  );
};

export default Page;
