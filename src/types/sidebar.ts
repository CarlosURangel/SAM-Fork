import { LucideIcon } from "lucide-react";

// Antes SidebarSidebarAdminProps
export interface SidebarItemProps {
  route: string;
  name: string;
  icon: LucideIcon;
}

// Antes SidebarAdminListProps
export interface SidebarProps {
  routes: SidebarItemProps[];
  pathname: string;
}
