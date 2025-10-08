"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        // Apenas se monte el componente, redirige
        router.push("/dashboard/gestion-de-usuarios");
    }, [router]);

    return (
        <div>Redirigiendo...</div>
    );
};

export default Dashboard;
