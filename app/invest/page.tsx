import { FunderInterestForm } from "@/components/forms/funder-interest-form";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function InvestPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const projects = await prisma.project.findMany({ where: { status: { in: ["OPEN", "REVIEW"] } } });

  return (
    <main className="container py-12">
      <Card className="max-w-2xl p-6">
        <h1 className="text-2xl font-bold">Become a Funder</h1>
        <p className="mt-2 text-sm text-brown/70">Share your interest and our team will send a verified investment memo.</p>
        <div className="mt-4"><FunderInterestForm projects={projects} preselectedProjectId={params.project} /></div>
      </Card>
    </main>
  );
}
