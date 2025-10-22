"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { TableBase } from "@/components/tables/TableBase";
import {
    AdvisoryDialog,
} from "@/components/forms/RegisterPrivateLesson";
import { createHistoryColumnsAdmin } from "@/const/History";
import { HistoryAdmin } from "@/types/table";
import { useParams } from "next/navigation";
import { Download } from "lucide-react";

const Page = () => {
    const [allAdvisories, setAllAdvisories] = useState<HistoryAdmin[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advisoryToEdit, setAdvisoryToEdit] = useState<HistoryAdmin | null>(
        null
    );

    const params = useParams();
    const studentName = params.name?.toString().replaceAll("%20", " ") || "";
    const colums2Search = ["student.fullName", "subject.name"];

    const fetchHistory = useCallback(async () => {
        try {
            const response = await fetch("/api/advisories/");
            if (!response.ok) throw new Error("Error al cargar el historial");
            setAllAdvisories(await response.json());
        } catch (error) {
            console.error(error);
            setAllAdvisories([]);
        }
    }, []);

    useEffect(() => {
        document.title = "Historial de Asesorías";
        fetchHistory();
    }, [fetchHistory]);

    const handleEdit = (advisory: HistoryAdmin) => {
        setAdvisoryToEdit(advisory);
        setIsModalOpen(true);
    };

    const handleActionComplete = () => {
        setIsModalOpen(false);
        fetchHistory();
    };

    const downloadPDF = async (idAdvisory: string) => {
        try {
            const response = await fetch(`/api/pdf/${idAdvisory}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Error al cargar el pdf");
            console.log(await response.json());
        } catch (error) {
            console.error(error);
        }
    };

    const columns = useMemo(() => createHistoryColumnsAdmin(handleEdit, downloadPDF), []);

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

            <TableBase<HistoryAdmin>
                data={allAdvisories}
                columns={columns}
                searchBy={colums2Search}
                searchValue={studentName}
            />
        </section>
    );
};

export default Page;
