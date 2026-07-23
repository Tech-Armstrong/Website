import { careersEmail } from "@/data/contact";

type CareerApplyCtaProps = {
  label: string;
  href?: string;
};

export function CareerApplyCta({
  label,
  href = careersEmail.href,
}: CareerApplyCtaProps) {
  const isMailto = href.startsWith("mailto:");

  return (
    <div className="mt-8">
      <a href={href} className="theme-btn btn-two focus-settle inline-block">
        {label}
      </a>
      {isMailto ? (
        <p className="mt-4 font-body text-sm leading-relaxed text-brand-muted sm:text-[15px]">
          Or email your resume to{" "}
          <a
            href={careersEmail.href}
            className="focus-settle font-medium text-brand-blue underline-offset-2 hover:underline"
          >
            {careersEmail.display}
          </a>
        </p>
      ) : null}
    </div>
  );
}
