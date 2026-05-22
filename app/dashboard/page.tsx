import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import StatsCards from "@/components/dashboard/StatsCards";
import ScoreTrendChart from "@/components/dashboard/ScoreTrendChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const db = await getDb();
  const userId = (session.user as any).id;

  const [total, analyses] = await Promise.all([
    db.collection("analyses").countDocuments({ userId }),
    db
      .collection("analyses")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray(),
  ]);

  const avgScore =
    analyses.length > 0
      ? Math.round(
          analyses.reduce((sum, a) => sum + a.atsScore, 0) /
            analyses.length
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your resume performance over time
        </p>
      </div>

      {/* stats */}
      <StatsCards total={total} avgScore={avgScore} />

      {/* chart */}
      <ScoreTrendChart
        data={JSON.parse(JSON.stringify(analyses))}
      />
    </div>
  );
}