import { enhanceContentHtml } from "@/lib/blog/html";

type BlogPostContentProps = {
  html: string;
};

export function BlogPostContent({ html }: BlogPostContentProps) {
  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: enhanceContentHtml(html) }}
    />
  );
}
