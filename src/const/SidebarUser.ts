import { SidebarItemProps } from "@/types/sidebar";
import { Home, Clock, LogOut } from "lucide-react";

export const routes: SidebarItemProps[] = [
  {
    route: "/user-dashboard/registro",
    name: "Registro de asesoría",
    icon: Home,
  },
  {
    route: "/user-dashboard/historialAsesorias",
    name: "Historial",
    icon: Clock,
  },
];
