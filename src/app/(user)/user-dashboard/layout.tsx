"use client";
import { SidebarAdmin } from "@/components/layout/SidebarAdmin";
import { routes } from "@/const/SidebarUser";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main className="flex">
      <SidebarAdmin routes={routes} pathname={pathname} />
      {children}
    </main>
  );
}
