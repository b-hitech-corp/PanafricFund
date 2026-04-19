"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { founderApplicationSchema, funderInterestSchema, projectSchema } from "@/lib/validations";

export async function createFounderApplication(data: unknown) {
  const parsed = founderApplicationSchema.parse(data);
  await prisma.founderApplication.create({
    data: {
      ...parsed,
      revenue: parsed.revenue === "yes",
      website: parsed.website || null,
      notes: parsed.notes || null,
    },
  });
  revalidatePath("/admin");
}

export async function createFunderInterest(data: unknown) {
  const parsed = funderInterestSchema.parse(data);
  await prisma.funderInterest.create({ data: parsed });
  revalidatePath("/admin");
}

export async function upsertProject(data: unknown, id?: string) {
  const parsed = projectSchema.parse(data);
  if (id) {
    await prisma.project.update({ where: { id }, data: parsed });
  } else {
    await prisma.project.create({ data: parsed });
  }
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/admin");
}
