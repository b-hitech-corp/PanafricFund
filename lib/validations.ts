import { ModelType, ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const founderApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  companyName: z.string().min(2),
  country: z.string().min(2),
  industry: z.string().min(2),
  summary: z.string().min(20),
  fundingAmount: z.coerce.number().int().positive(),
  modelType: z.nativeEnum(ModelType),
  pitchDeckUrl: z.string().url(),
  website: z.string().url().optional().or(z.literal("")),
  stage: z.string().min(2),
  revenue: z.enum(["yes", "no"]),
  notes: z.string().optional(),
});

export const funderInterestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  diaspora: z.string().optional(),
  amount: z.coerce.number().int().positive(),
  projectId: z.string().min(1),
  modelType: z.nativeEnum(ModelType),
  acceptedTerms: z.boolean().refine((v) => v),
});

export const projectSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(2),
  founderName: z.string().min(2),
  companyName: z.string().min(2),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(30),
  fundingTarget: z.coerce.number().int().positive(),
  amountRaised: z.coerce.number().int().nonnegative(),
  minimumContribution: z.coerce.number().int().positive(),
  modelType: z.nativeEnum(ModelType),
  category: z.string().min(2),
  country: z.string().min(2),
  stage: z.string().min(2),
  useOfFunds: z.string().min(10),
  milestones: z.string().min(10),
  riskDisclosure: z.string().min(10),
  mentorshipIncluded: z.coerce.boolean(),
  featured: z.coerce.boolean(),
  status: z.nativeEnum(ProjectStatus),
});
