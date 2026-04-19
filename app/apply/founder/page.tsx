import { FounderApplicationForm } from "@/components/forms/founder-application-form";
import { Card } from "@/components/ui/card";

export default function FounderApplyPage() {
  return (
    <main className="container py-12">
      <Card className="max-w-2xl p-6">
        <h1 className="text-2xl font-bold">Founder Application</h1>
        <p className="text-sm text-brown/70 mt-2">Submit your project for diaspora-backed funding.</p>
        <div className="mt-4"><FounderApplicationForm /></div>
      </Card>
    </main>
  );
}
