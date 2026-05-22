import DropZone from "@/components/analyze/DropZone";

export default function UploadPage() {
  return (
    <div className="max-w-2xl space-y-4 text-center">
      <h1 className="text-2xl font-semibold">Analyze New Resume</h1>
      <p className="text-muted-foreground text-sm">
        As a logged-in user, your analysis will use OpenRouter AI for deeper
        insights.
      </p>
      <DropZone />
    </div>
  );
}
