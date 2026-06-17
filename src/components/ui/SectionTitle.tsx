type SectionTitleProps = {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  headingId?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  align = "left",
  className = "",
  titleClassName = "",
  headingId,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`sec-title mb-8 flex flex-col ${alignClass} ${className}`}>
      <span className="te-subtitle mb-3 inline-block rounded-full rounded-br-none border border-brand-blue/80 bg-brand-blue/[0.06] px-4 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-brand-blue sm:text-xs sm:leading-[26px]">
        {eyebrow}
      </span>
      <h2
        id={headingId}
        className={
          titleClassName
            ? `te_title font-display font-semibold text-brand-navy ${titleClassName}`
            : "te_title font-display text-[26px] font-semibold leading-[34px] text-brand-navy sm:text-[30px] sm:leading-[38px] md:text-[32px] md:leading-[40px]"
        }
      >
        {title}
      </h2>
    </div>
  );
}
