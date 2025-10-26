import React from "react";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SidebarProps, SidebarItemProps } from "@/types/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <aside className="sticky top-0 left-0 h-screen w-20 md:w-64 bg-[#10175B] text-white flex flex-col justify-between z-50 flex-none transition-all duration-300">
      <TooltipProvider delayDuration={0}>
        <div>
          <div className="flex flex-col items-center py-6 pb-12">
            <Image
              src="/icon_fif.png"
              alt="Logo FIF"
              width={60}
              height={60}
              className="w-12 h-auto md:w-[60px] transition-all duration-300"
            />
            <h1 className="text-lg font-semibold mt-2 hidden md:block">
              FIF Asesorías
            </h1>
          </div>

          <nav className="px-4 pb-16 space-y-2">
            {routes.map((route: SidebarItemProps) => (
              <Tooltip key={route.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={route.route}
                    className={`w-full 
                    flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition 
                    ${pathname.includes(route.route) ? "bg-white/10" : ""}
                    // 6. Centramos el ícono (colapsado) y justificamos al inicio (expandido)
                    justify-center md:justify-start`}
                  >
                    <route.icon size={18} />
                    <span className="hidden md:inline">{route.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="md:hidden">
                  <p>{route.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>

        <div className="px-4 pb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={closeSesion}
                className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition justify-center md:justify-start"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Cerrar sesión</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="md:hidden">
              <p>Cerrar sesión</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  );
};
