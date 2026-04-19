export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const featured = await prisma.project.findFirst({ where: { featured: true } });

  return (
    <main className="container py-12 space-y-12">
      <section className="rounded-3xl bg-brown px-8 py-16 text-cream shadow-soft">
        <p className="text-sm uppercase tracking-widest text-mutedbronze">PanAfricFund</p>
        <h1 className="mt-4 text-4xl font-bold max-w-2xl">Building African economic power through diaspora investment</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/apply/founder"><Button>Apply as Founder</Button></Link>
          <Link href="/invest"><Button variant="outline" className="bg-cream">Become a Funder</Button></Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Equity", "Ownership through structured share participation."],
          ["Profit-share", "Earn a percentage of revenue up to a return cap."],
          ["Debt", "Fixed repayment with agreed interest timeline."],
        ].map(([title, desc]) => (
          <Card key={title} className="p-6"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-brown/70">{desc}</p></Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="p-6"><h3 className="font-semibold">Mentorship included</h3><p className="mt-2 text-sm text-brown/70">Founders receive strategic mentorship and reporting support.</p></Card>
        <Card className="p-6"><h3 className="font-semibold">Trust & transparency</h3><p className="mt-2 text-sm text-brown/70">Structured milestones, risk disclosures, and legal documents build confidence.</p></Card>
      </section>

      {featured && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured project</h2>
          <Card className="p-6">
            <h3 className="text-xl font-semibold">{featured.title}</h3>
            <p className="mt-2 text-brown/75">{featured.shortDescription}</p>
            <p className="mt-3 text-sm">Raised {formatCurrency(featured.amountRaised)} of {formatCurrency(featured.fundingTarget)}</p>
            <Link href={`/projects/${featured.slug}`} className="inline-block mt-4 text-sm underline">View project</Link>
          </Card>
        </section>
      )}

      <footer className="border-t border-brown/10 pt-8 text-sm text-brown/70 flex flex-wrap gap-6">
        <Link href="/">About</Link><Link href="/contact">Contact</Link>
        <Link href="/legal/terms">Legal Terms</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/risk">Risk Disclosure</Link>
      </footer>
    </main>
  );
}
