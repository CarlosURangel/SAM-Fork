"use client";
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import React from 'react'


const Dashboard = () => {

    const role = 'admin'; // Cambia esto a 'cliente' para probar el otro dashboard

    if (role === "admin") {
        return <ClientDashboard />;
    }

    if (role === "cliente") {
        return <ClientDashboard />;
    }

    return <p>No tienes un rol válido para acceder al dashboard.</p>;
}

export default Dashboard;
