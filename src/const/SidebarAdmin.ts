import { SidebarAdminProps } from "@/types/sidebar";
import { Home, Clock, LogOut } from "lucide-react";


export const routes: SidebarAdminProps[] = [
    {
        route: "/dashboard/gestion-de-usuarios",
        name: "Gestión de usuarios",    
        icon: Home
    },
    {
        route: "/dashboard/historial",
        name: "Historial",    
        icon: Clock
    },
    {
        route: "/dashboard/estadisticas",
        name: "Estadísticas",    
        icon: Clock
    }
]