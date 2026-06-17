import { isAdminAuthenticated } from "@/lib/admin/auth";

export async function requireAdmin(): Promise<void> {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    throw new Error("Unauthorized");
  }
}
