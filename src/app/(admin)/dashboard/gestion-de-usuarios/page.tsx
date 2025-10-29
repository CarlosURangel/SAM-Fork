"use client";
import React, { useEffect, useState } from "react";
import { columnsUserManagement } from "@/const/UserManagement";
import { TableBase } from "@/components/tables/TableBase";
import { UserManagement } from "@/types/table";
import { teachersApi } from "@/types/apis";
import { TableSkeleton } from "@/components/ui/table-skeleton";

const page = () => {
  const [dataUserManagement, setDataUserManagement] = useState<
    UserManagement[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const searchBy = ["nameTeacher", "total"];

  useEffect(() => {
    document.title = "Gestión de Usuarios";

    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        const newData: UserManagement[] = data.map((teacher: teachersApi) => ({
          nameTeacher: teacher.fullName,
          students: "ver",
          stadistics: "ver",
          total: teacher.total,
          cveTeacher: teacher.cveMaestro,
        }));
        setDataUserManagement(newData);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);
  return (
    <section className="mx-16 mt-28 flex-1">
      <h1 className="text-3xl mb-5">Gestión de Usuarios</h1>
      {isLoading ? (
        <TableSkeleton
          columnCount={columnsUserManagement.length}
          rowCount={3}
        />
      ) : (
        <TableBase<UserManagement>
          data={dataUserManagement}
          columns={columnsUserManagement}
          searchBy={searchBy}
        />
      )}
    </section>
  );
};

export default page;
