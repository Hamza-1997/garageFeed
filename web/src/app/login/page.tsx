"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { token } = response.data;
      
      localStorage.setItem("token", token);
      
      // Redirect to dashboard/projects
      router.push("/projects");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900/80 p-8 shadow-2xl border border-white/10 backdrop-blur-md relative overflow-hidden">
        
        {/* Decorative gradient blob */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
            GarageFeed
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Log in to manage your workshop
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6 relative z-10">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-zinc-500 transition-colors h-11"
                placeholder="admin@projectcars.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-zinc-500 transition-colors h-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-zinc-200 font-semibold h-11 transition-all active:scale-[0.98]"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
