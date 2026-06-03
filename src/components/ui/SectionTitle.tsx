type SectionTitleProps = {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  align = "left",
  className = "",
  headingId,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`sec-title mb-12 flex flex-col ${alignClass} ${className}`}>
      <span className="te-subtitle mb-[13px] inline-block rounded-full rounded-br-none border border-brand-blue px-[15px] py-[2px] font-display text-xs font-bold uppercase leading-[26px] text-brand-blue">
        {eyebrow}
      </span>
      <h2
        id={headingId}
        className="te_title font-display text-[30px] font-semibold leading-[38px] text-brand-navy"
      >
        {title}
      </h2>
    </div>
  );
}
