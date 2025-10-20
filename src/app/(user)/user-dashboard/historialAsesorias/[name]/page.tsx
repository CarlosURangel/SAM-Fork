"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { TableBase } from "@/components/tables/TableBase";
// Importamos el mismo diálogo y su tipo
import {
    AdvisoryDialog,
    FullAdvisoryData,
} from "@/components/forms/RegisterPrivateLesson";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";

// --- Columnas Dinámicas ---
const createHistoryColumns = (
    onEdit: (advisory: FullAdvisoryData) => void
): ColumnDef<FullAdvisoryData>[] => [
        { accessorKey: "student.fullName", header: "Alumno" },
        { accessorKey: "subject.name", header: "Materia" },
        {
            accessorKey: "advisoryDate",
            header: "Fecha",
            cell: ({ row }) =>
                row.original.advisoryDate
                    ? new Date(row.original.advisoryDate).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                    : "N/A",
        },
        { accessorKey: "topic", header: "Tema" },
        {
            id: "actions",
            header: () => <div className="text-right">Acciones</div>,
            cell: ({ row }) => (
                <div className="text-right">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(row.original)}
                    >
                        Editar
                    </Button>
                </div>
            ),
        },
    ];

const Page = () => {
    const [allAdvisories, setAllAdvisories] = useState<FullAdvisoryData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advisoryToEdit, setAdvisoryToEdit] = useState<FullAdvisoryData | null>(
        null
    );

    const params = useParams();
    const searchValue = params.name?.toString().replaceAll('%20', ' ') || '';
    const colums2Search = ['student.fullName', 'subject.name'];

    const fetchHistory = useCallback(async () => {
        try {
            const response = await fetch("/api/advisories/teacher");
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

    const handleEdit = (advisory: FullAdvisoryData) => {
        setAdvisoryToEdit(advisory);
        setIsModalOpen(true);
    };

    const handleActionComplete = () => {
        setIsModalOpen(false);
        fetchHistory();
    };

    const columns = useMemo(() => createHistoryColumns(handleEdit), []);

    return (
        <section className="mx-16 mt-28 flex-1">
            <div className="mb-5">
                <h1 className="text-3xl font-semibold">Historial de Asesorías</h1>
            </div>

            {/* Le pasamos la prop 'advisoryToEdit' para indicar que es modo EDICIÓN */}
            <AdvisoryDialog
                advisoryToEdit={advisoryToEdit}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onActionComplete={handleActionComplete}
            />

            <TableBase<FullAdvisoryData> data={allAdvisories} columns={columns} searchBy={colums2Search} searchValue={searchValue}/>
        </section>
    );
};

export default Page;
