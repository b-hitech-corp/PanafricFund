"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModelType } from "@prisma/client";
import { createFounderApplication } from "@/lib/actions";
import { founderApplicationSchema } from "@/lib/validations";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

type Values = z.infer<typeof founderApplicationSchema>;

export function FounderApplicationForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(founderApplicationSchema),
    defaultValues: { modelType: ModelType.EQUITY, revenue: "no" },
  });

  const onSubmit = (values: Values) => {
    startTransition(async () => {
      await createFounderApplication(values);
      setMessage("Application submitted successfully.");
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Full name" {...register("name")} />
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="Company" {...register("companyName")} />
      <Input placeholder="Country" {...register("country")} />
      <Input placeholder="Industry" {...register("industry")} />
      <Textarea placeholder="Summary" {...register("summary")} />
      <Input type="number" placeholder="Funding amount" {...register("fundingAmount")} />
      <Select {...register("modelType")}><option value="EQUITY">Equity</option><option value="PROFIT_SHARE">Profit-share</option><option value="DEBT">Debt</option></Select>
      <Input placeholder="Pitch deck URL" {...register("pitchDeckUrl")} />
      <Input placeholder="Website (optional)" {...register("website")} />
      <Input placeholder="Stage" {...register("stage")} />
      <Select {...register("revenue")}><option value="yes">Revenue: Yes</option><option value="no">Revenue: No</option></Select>
      <Textarea placeholder="Additional notes" {...register("notes")} />
      {Object.values(errors)[0] && <p className="text-sm text-red-700">Please complete required fields correctly.</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}
      <Button disabled={pending}>{pending ? "Submitting..." : "Submit application"}</Button>
    </form>
  );
}
