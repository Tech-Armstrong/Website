export type ContactPhone = {
  label: string;
  href: string;
  display: string;
};

export type ContactOffice = {
  id: string;
  label: string;
  address: string;
};

export const contactInfo = {
  eyebrow: "Let's Talk",
  title: "Contact us for Top-Notch Service",
  subtitle: "Call, Email, Or Drop By Our Office",
  phones: [
    {
      label: "Call Us",
      href: "tel:+919739041588",
      display: "+91 97390 41588",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/918660158193",
      display: "+91 86601 58193",
    },
  ] satisfies ContactPhone[],
  email: {
    label: "Write an email",
    href: "mailto:reachus@armstrong-cap.com",
    display: "reachus@armstrong-cap.com",
  },
  addressTitle: "Address",
  addressSubtitle: "To visiting our company",
  offices: [
    {
      id: "head",
      label: "Head Office",
      address:
        "Corporate Block, GOLDEN ENCLAVE, 5th Floor, A1 Tower, HAL Old Airport Rd, Bengaluru, Karnataka 560017",
    },
    {
      id: "branch",
      label: "Branch Office",
      address:
        "XII/404, First Floor TJ Complex, Kallumutty Iritty P.O, 670703, Kannur, Kerala",
    },
  ] satisfies ContactOffice[],
};
