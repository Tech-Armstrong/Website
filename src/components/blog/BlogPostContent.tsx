import { enhanceContentHtml } from "@/lib/blog/html";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type BlogPostContentProps = {
  html: string;
};

export function BlogPostContent({ html }: BlogPostContentProps) {
  return (
    <ScrollReveal delay={120}>
      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: enhanceContentHtml(html) }}
      />
    </ScrollReveal>
  );
}
