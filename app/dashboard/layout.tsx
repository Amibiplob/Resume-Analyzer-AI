import { getServerSession } from "next-auth"; // ← changed
import { authOptions } from "@/lib/auth"; // ← changed
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); // ← changed
  if (!session) redirect("/login");
  return (
  <div className="min-h-screen">
      {/* sidebar */}
      <div className="fixed left-0 top-0 h-screen w-60 border-r bg-background">
        <DashboardSidebar user={session.user!} />
      </div>

      {/* content */}
      <main className="ml-60 h-screen overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
