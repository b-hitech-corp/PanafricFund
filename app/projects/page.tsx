import Link from "next/link";
import { ModelType, ProjectStatus } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const search = params.search ?? "";
  const model = params.model as ModelType | undefined;
  const status = params.status as ProjectStatus | undefined;

  const projects = await prisma.project.findMany({
    where: {
      title: { contains: search, mode: "insensitive" },
      ...(model ? { modelType: model } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold">Projects Marketplace</h1>
      <form className="my-6 grid gap-3 md:grid-cols-4">
        <input name="search" defaultValue={search} placeholder="Search projects" className="h-10 rounded-xl border border-brown/20 px-3" />
        <select name="model" defaultValue={model ?? ""} className="h-10 rounded-xl border border-brown/20 px-3">
          <option value="">All models</option><option value="EQUITY">Equity</option><option value="PROFIT_SHARE">Profit-share</option><option value="DEBT">Debt</option>
        </select>
        <select name="status" defaultValue={status ?? ""} className="h-10 rounded-xl border border-brown/20 px-3">
          <option value="">All status</option><option value="OPEN">Open</option><option value="REVIEW">Review</option><option value="FUNDED">Funded</option><option value="CLOSED">Closed</option>
        </select>
        <button className="rounded-xl bg-brown text-cream">Filter</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="p-5">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-brown/70">{project.shortDescription}</p>
            <div className="mt-3 text-sm space-y-1">
              <p>Target: {formatCurrency(project.fundingTarget)}</p>
              <p>Raised: {formatCurrency(project.amountRaised)}</p>
              <p>Model: {project.modelType.replace("_", " ")}</p>
              <p>Status: {project.status}</p>
            </div>
            <Link className="inline-block mt-4 text-sm underline" href={`/projects/${project.slug}`}>View details</Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
