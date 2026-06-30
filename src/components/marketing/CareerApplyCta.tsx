import { careersEmail } from "@/data/contact";

type CareerApplyCtaProps = {
  label: string;
};

export function CareerApplyCta({ label }: CareerApplyCtaProps) {
  return (
    <div className="mt-8">
      <a href={careersEmail.href} className="theme-btn btn-two focus-settle inline-block">
        {label}
      </a>
      <p className="mt-4 font-body text-sm leading-relaxed text-brand-muted sm:text-[15px]">
        Or email your resume to{" "}
        <a
          href={careersEmail.href}
          className="focus-settle font-medium text-brand-blue underline-offset-2 hover:underline"
        >
          {careersEmail.display}
        </a>
      </p>
    </div>
  );
}
