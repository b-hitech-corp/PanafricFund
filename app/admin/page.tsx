import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ProjectStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteProject, upsertProject } from "@/lib/actions";
import { Card } from "@/components/ui/card";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const [projects, founders, funders] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.founderApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.funderInterest.findMany({ include: { project: true }, orderBy: { createdAt: "desc" } }),
  ]);
  const totalFundingInterest = funders.reduce((sum, f) => sum + f.amount, 0);

  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section className="grid gap-3 md:grid-cols-4 text-sm">
        <Card className="p-4">Total projects: {projects.length}</Card>
        <Card className="p-4">Total founders: {founders.length}</Card>
        <Card className="p-4">Total funders: {funders.length}</Card>
        <Card className="p-4">Funding interest: ${totalFundingInterest.toLocaleString()}</Card>
      </section>

      <Card className="p-6">
        <h2 className="text-xl font-semibold">Create project</h2>
        <form
          className="mt-4 grid gap-2 md:grid-cols-2"
          action={async (formData) => {
            "use server";
            await upsertProject({
              slug: String(formData.get("slug")),
              title: String(formData.get("title")),
              founderName: String(formData.get("founderName")),
              companyName: String(formData.get("companyName")),
              shortDescription: String(formData.get("shortDescription")),
              fullDescription: String(formData.get("fullDescription")),
              fundingTarget: Number(formData.get("fundingTarget")),
              amountRaised: Number(formData.get("amountRaised")),
              minimumContribution: Number(formData.get("minimumContribution")),
              modelType: String(formData.get("modelType")),
              category: String(formData.get("category")),
              country: String(formData.get("country")),
              stage: String(formData.get("stage")),
              useOfFunds: String(formData.get("useOfFunds")),
              milestones: String(formData.get("milestones")),
              riskDisclosure: String(formData.get("riskDisclosure")),
              mentorshipIncluded: formData.get("mentorshipIncluded") === "on",
              featured: formData.get("featured") === "on",
              status: String(formData.get("status")),
            });
          }}
        >
          <input required name="slug" placeholder="slug" className="h-10 rounded-xl border px-3" />
          <input required name="title" placeholder="title" className="h-10 rounded-xl border px-3" />
          <input required name="founderName" placeholder="founder" className="h-10 rounded-xl border px-3" />
          <input required name="companyName" placeholder="company" className="h-10 rounded-xl border px-3" />
          <input required name="shortDescription" placeholder="short description" className="h-10 rounded-xl border px-3" />
          <input required name="fullDescription" placeholder="full description" className="h-10 rounded-xl border px-3" />
          <input required type="number" name="fundingTarget" placeholder="funding target" className="h-10 rounded-xl border px-3" />
          <input required type="number" name="amountRaised" placeholder="raised" className="h-10 rounded-xl border px-3" />
          <input required type="number" name="minimumContribution" placeholder="minimum" className="h-10 rounded-xl border px-3" />
          <select name="modelType" className="h-10 rounded-xl border px-3"><option>EQUITY</option><option>PROFIT_SHARE</option><option>DEBT</option></select>
          <input required name="category" placeholder="category" className="h-10 rounded-xl border px-3" />
          <input required name="country" placeholder="country" className="h-10 rounded-xl border px-3" />
          <input required name="stage" placeholder="stage" className="h-10 rounded-xl border px-3" />
          <input required name="useOfFunds" placeholder="use of funds" className="h-10 rounded-xl border px-3" />
          <input required name="milestones" placeholder="milestones" className="h-10 rounded-xl border px-3" />
          <input required name="riskDisclosure" placeholder="risk disclosure" className="h-10 rounded-xl border px-3" />
          <select name="status" className="h-10 rounded-xl border px-3">{Object.values(ProjectStatus).map((s) => <option key={s}>{s}</option>)}</select>
          <label><input type="checkbox" name="mentorshipIncluded" defaultChecked /> mentorship</label>
          <label><input type="checkbox" name="featured" /> featured</label>
          <button className="rounded-xl bg-brown px-3 py-2 text-cream">Create project</button>
        </form>
      </Card>

      <Card className="p-6 overflow-auto">
        <h2 className="font-semibold mb-3">Projects</h2>
        <table className="w-full text-sm">
          <thead><tr><th className="text-left">Title</th><th>Status</th><th>Raised</th><th>Actions</th></tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t">
                <td>{p.title}</td><td>{p.status}</td><td>${p.amountRaised.toLocaleString()}</td>
                <td>
                  <form action={async () => {"use server"; await deleteProject(p.id);}}>
                    <button className="text-red-700">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-6"><h2 className="font-semibold">Founder Applications</h2><ul className="mt-2 space-y-2 text-sm">{founders.map((f) => <li key={f.id}>{f.name} • {f.companyName} • ${f.fundingAmount.toLocaleString()}</li>)}</ul></Card>
      <Card className="p-6"><h2 className="font-semibold">Funder Interests</h2><ul className="mt-2 space-y-2 text-sm">{funders.map((f) => <li key={f.id}>{f.name} → {f.project.title} • ${f.amount.toLocaleString()}</li>)}</ul></Card>
    </main>
  );
}
