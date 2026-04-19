import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  return (
    <main className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="text-brown/70">{project.companyName} • Founder: {project.founderName}</p>
      <Card className="p-6 grid gap-2 md:grid-cols-2 text-sm">
        <p>Funding target: {formatCurrency(project.fundingTarget)}</p>
        <p>Amount raised: {formatCurrency(project.amountRaised)}</p>
        <p>Minimum contribution: {formatCurrency(project.minimumContribution)}</p>
        <p>Funding model: {project.modelType.replace("_", " ")}</p>
      </Card>
      <Card className="p-6 space-y-4">
        <section><h2 className="font-semibold">Description</h2><p>{project.fullDescription}</p></section>
        <section><h2 className="font-semibold">Milestones</h2><p>{project.milestones}</p></section>
        <section><h2 className="font-semibold">Use of funds</h2><p>{project.useOfFunds}</p></section>
        <section><h2 className="font-semibold">Risk disclosure</h2><p>{project.riskDisclosure}</p></section>
        <section><h2 className="font-semibold">Mentorship included</h2><p>{project.mentorshipIncluded ? "Yes" : "No"}</p></section>
        <section><h2 className="font-semibold">FAQ</h2><p>No guarantees are offered. Returns depend on execution and market conditions.</p></section>
      </Card>
      <Link href={`/invest?project=${project.id}`} className="inline-block rounded-xl bg-brown px-4 py-2 text-cream">Express Interest</Link>
    </main>
  );
}
