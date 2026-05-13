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
    <div className="flex min-h-screen">
      <DashboardSidebar user={session.user!} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
