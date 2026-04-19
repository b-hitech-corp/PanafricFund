"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModelType, type Project } from "@prisma/client";
import { createFunderInterest } from "@/lib/actions";
import { funderInterestSchema } from "@/lib/validations";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Values = z.infer<typeof funderInterestSchema>;

export function FunderInterestForm({ projects, preselectedProjectId }: { projects: Project[]; preselectedProjectId?: string }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(funderInterestSchema),
    defaultValues: { modelType: ModelType.EQUITY, acceptedTerms: false, projectId: preselectedProjectId },
  });

  const onSubmit = (values: Values) => {
    startTransition(async () => {
      await createFunderInterest(values);
      setMessage("Interest submitted. Our team will follow up.");
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Full name" {...register("name")} />
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="Country" {...register("country")} />
      <Input placeholder="Diaspora origin (optional)" {...register("diaspora")} />
      <Input type="number" placeholder="Indicative amount (USD)" {...register("amount")} />
      <Select {...register("projectId")}>
        <option value="">Select project</option>
        {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
      </Select>
      <Select {...register("modelType")}><option value="EQUITY">Equity</option><option value="PROFIT_SHARE">Profit-share</option><option value="DEBT">Debt</option></Select>
      <label className="flex gap-2 text-sm"><input type="checkbox" {...register("acceptedTerms")} /> I confirm this is not financial advice and I agree to the terms.</label>
      {Object.values(errors)[0] && <p className="text-sm text-red-700">Please complete required fields and accept terms.</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}
      <Button disabled={pending}>{pending ? "Submitting..." : "Express interest"}</Button>
    </form>
  );
}
