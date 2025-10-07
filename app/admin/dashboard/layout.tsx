import type React from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminTopbar from "@/components/admin/admin-topbar"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16">{children}</main>
      </div>
    </div>
  )
}
