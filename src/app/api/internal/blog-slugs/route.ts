import { NextResponse } from "next/server";
import { getPostsIndex } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

export async function GET() {
  const index = await getPostsIndex();
  const slugs = index.items.map((item) => item.slug);
  return NextResponse.json(slugs);
}
