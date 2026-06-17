import { revalidatePath } from "next/cache";

export function revalidatePublicPath(path: string): void {
  revalidatePath(path, "page");
  revalidatePath(path, "layout");
}

export function revalidateBlogPaths(slug: string): void {
  revalidatePublicPath("/blog");
  revalidatePublicPath(`/blog/${slug}`);
}
