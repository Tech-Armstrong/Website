import { headOffice } from "@/data/contact";
import { ContactMapEmbed } from "@/components/contact/ContactMapEmbed";
import { buildMapEmbedUrl, buildMapSearchUrl } from "@/lib/google/embed";
import { geocodeAddress } from "@/lib/google/geocode";

export async function ContactMap() {
  const location = await geocodeAddress(headOffice.address);
  const embedUrl = location
    ? buildMapEmbedUrl({ lat: location.lat, lng: location.lng })
    : buildMapEmbedUrl({ query: headOffice.address });
  const mapSearchUrl = buildMapSearchUrl(headOffice.address);

  return (
    <section
      className="rounded-xl border border-[#e8eaed] bg-white p-4 md:p-5"
      aria-labelledby="contact-map-heading"
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-blue">
            {headOffice.label}
          </p>
          <h2
            id="contact-map-heading"
            className="mt-1 font-display text-[18px] font-semibold text-brand-navy"
          >
            Find us on the map
          </h2>
        </div>
        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-settle rounded-md font-display text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
        >
          View on Google Maps
        </a>
      </div>

      {embedUrl ? (
        <ContactMapEmbed src={embedUrl} title="Armstrong Capital head office map" />
      ) : (
        <div className="rounded-lg border border-[#eef0f2] bg-brand-surface/60 p-4">
          <p className="font-body text-sm leading-relaxed text-brand-muted">
            {headOffice.address}
          </p>
          <p className="mt-3 font-body text-sm text-brand-muted">
            Add <code className="text-brand-navy">GOOGLE_MAPS_API_KEY</code> to
            enable the embedded map.
          </p>
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
          >
            View on Google Maps
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </section>
  );
}
