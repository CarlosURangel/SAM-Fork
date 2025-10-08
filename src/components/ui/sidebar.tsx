"use client";

import { Home, Clock, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#10175B] text-white flex flex-col justify-between z-50">
      <div>
        <div className="flex flex-col items-center py-6">
          <Image src="/icon_fif.png" alt="Logo FIF" width={60} height={60} />
          <h1 className="text-lg font-semibold mt-2">FIF Asesorías</h1>
        </div>

        <nav className="px-4 space-y-2">
          <Link
            href="/registro"
            className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded text-white hover:bg-white/20 transition"
          >
            <Home size={18} />
            <span>Registro de asesoría</span>
          </Link>

          <Link
            href="/historial"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition"
          >
            <Clock size={18} />
            <span>Historial</span>
          </Link>
        </nav>
      </div>

      <div className="px-4 pb-6">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition">
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
