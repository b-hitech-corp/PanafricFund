import { hash } from "bcryptjs";
import { ModelType, ProjectStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "united-afro-market" },
    update: {
      amountRaised: 32000,
      featured: true,
      status: ProjectStatus.OPEN,
    },
    create: {
      slug: "united-afro-market",
      title: "United Afro Market",
      founderName: "Amina K. Owusu",
      companyName: "United Afro Market LLC",
      shortDescription: "African grocery and cultural community hub launching in NYC.",
      fullDescription:
        "United Afro Market is a modern African grocery and community retail concept in New York City. It combines curated pantry essentials, fresh produce, and diaspora-focused events to create both strong recurring revenue and social impact.",
      fundingTarget: 80000,
      amountRaised: 32000,
      minimumContribution: 500,
      modelType: ModelType.PROFIT_SHARE,
      category: "Retail",
      country: "United States",
      stage: "Growth",
      useOfFunds:
        "Inventory expansion, in-store refrigeration, POS upgrades, and neighborhood activation campaigns.",
      milestones:
        "Range: $40,000-$125,000. Revenue projection: $32,000-$90,000/month. Break-even expected in 6-12 months.",
      riskDisclosure:
        "Retail operations are subject to local demand, inflation, and supplier variability. Returns are not guaranteed.",
      mentorshipIncluded: true,
      featured: true,
      status: ProjectStatus.OPEN,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@panafricfund.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const hashed = await hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashed },
    create: { email: adminEmail, password: hashed },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
