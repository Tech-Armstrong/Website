export const AIRTABLE_CONTACT_FORM_URL =
  "https://airtable.com/embed/appFH8nVIFq1sPPgK/pagEAbxXQ3LTRtuZs/form";

export function AirtableContactForm() {
  return (
    <div className="rounded-xl border border-[#e8eaed] bg-white p-3">
      <iframe
        className="airtable-embed w-full bg-transparent"
        src={AIRTABLE_CONTACT_FORM_URL}
        width="100%"
        height={533}
        title="Contact Armstrong Capital"
      />
    </div>
  );
}
