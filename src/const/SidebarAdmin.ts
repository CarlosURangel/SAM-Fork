import { SidebarItemProps } from "@/types/sidebar";
import { Home, Clock, ChartBarDecreasing, LogOut } from "lucide-react";

export const routes: SidebarItemProps[] = [
  {
    route: "/dashboard/gestion-de-usuarios",
    name: "Gestión de usuarios",
    icon: Home,
  },
  {
    route: "/dashboard/historial",
    name: "Historial",
    icon: Clock,
  },
  {
    route: "/dashboard/estadisticas",
    name: "Estadísticas",
    icon: ChartBarDecreasing,
  },
];
