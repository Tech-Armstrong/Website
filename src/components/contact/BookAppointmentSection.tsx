import { appointmentForm } from "@/data/appointment";

type BookAppointmentSectionProps = {
  showDescription?: boolean;
  className?: string;
};

export function BookAppointmentSection({
  showDescription = false,
  className = "",
}: BookAppointmentSectionProps) {
  const { title, description, embedUrl, embedHeight } = appointmentForm;

  return (
    <section
      className={className}
      aria-labelledby="book-appointment-heading"
    >
      <h2
        id="book-appointment-heading"
        className="font-display text-[22px] font-semibold text-brand-navy sm:text-2xl"
      >
        {title}
      </h2>
      {showDescription ? (
        <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-brand-muted md:text-base">
          {description}
        </p>
      ) : null}
      <div className="mt-5 overflow-hidden rounded-xl border border-[#e8eaed] bg-white p-3 sm:p-4">
        <iframe
          className="airtable-embed w-full bg-transparent"
          src={embedUrl}
          width="100%"
          height={embedHeight}
          title="Book an appointment with Armstrong Capital"
          style={{ background: "transparent", border: "1px solid #ccc" }}
        />
      </div>
    </section>
  );
}
