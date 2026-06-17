"use client";

import { useActionState } from "react";
import { loginAction, type AuthActionResult } from "@/lib/admin/actions/auth";

const initialState: AuthActionResult = { ok: true };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-[var(--elevation-card)] sm:p-8">
        <h1 className="font-display text-2xl font-semibold text-brand-navy">
          Admin sign in
        </h1>
        <p className="mt-2 font-body text-sm text-brand-muted">
          Manage Knowledge Hub content, blog posts, and uploads.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-body text-sm font-medium text-brand-navy"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
            />
          </div>

          {state.error ? (
            <p className="font-body text-sm text-brand-accent" role="alert">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-brand-navy px-4 py-2.5 font-body text-sm font-medium text-white focus-settle disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
