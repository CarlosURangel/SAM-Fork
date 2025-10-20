import React from "react";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SidebarProps, SidebarItemProps } from "@/types/sidebar";

export const SidebarAdmin = ({ routes, pathname }: SidebarProps) => {
  const closeSesion = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <aside className="sticky top-0 left-0 h-screen w-64 bg-[#10175B] text-white flex flex-col justify-between z-50 flex-none">
      <div>
        <div className="flex flex-col items-center py-6">
          <Image src="/icon_fif.png" alt="Logo FIF" width={60} height={60} />
          <h1 className="text-lg font-semibold mt-2">FIF Asesorías</h1>
        </div>

        <nav className="px-4 pb-16 space-y-2">
          {routes.map((route: SidebarItemProps) => (
            <Link
              key={route.name}
              href={route.route}
              className={`w-full 
              flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition 
              ${pathname.includes(route.route) ? "bg-white/10" : ""}`}
            >
              <route.icon size={18} />
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-4 pb-6">
        <button
          onClick={closeSesion}
          className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
