import { SidebarAdmin } from "@/components/layout/SidebarAdmin"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex">
            <SidebarAdmin />
            {children}
        </main>
    )
}