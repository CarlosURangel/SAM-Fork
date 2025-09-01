import { LucideIcon } from "lucide-react";

export interface SidebarAdminProps{
    route: string;
    name: string;
    icon: LucideIcon;
}

export interface SidebarAdminListProps{
    routes: SidebarAdminProps[];
    pathname: string;
}