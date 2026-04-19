"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <main className="container py-12">
      <Card className="max-w-md p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <form
          className="mt-4 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await signIn("credentials", { email, password, redirect: false });
            if (result?.ok) router.push("/admin");
            else setError("Invalid credentials");
          }}
        >
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <Button>Sign in</Button>
        </form>
      </Card>
    </main>
  );
}
