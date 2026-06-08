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
        data-blog-content
        dangerouslySetInnerHTML={{ __html: enhanceContentHtml(html) }}
      />
    </ScrollReveal>
  );
}
