"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/user-dashboard/registro");
  }, [router]);

  return <div>Redirigiendo...</div>;
};

export default Dashboard;
