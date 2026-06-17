"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  createSessionToken,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export type AuthActionResult = {
  ok: boolean;
  error?: string;
};

export async function loginAction(
  _prev: AuthActionResult | null,
  formData: FormData,
): Promise<AuthActionResult> {
  const password = String(formData.get("password") ?? "");

  try {
    if (!verifyAdminPassword(password)) {
      return { ok: false, error: "Invalid password." };
    }

    await setAdminSessionCookie(createSessionToken());
    redirect("/admin");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed.";
    return { ok: false, error: message };
  }
}

export async function logoutAction(): Promise<void> {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
