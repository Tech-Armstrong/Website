export type SocialPlatform =
  | "linkedin"
  | "instagram"
  | "x"
  | "youtube"
  | "facebook";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

/** Site-wide social profile URLs — update empty hrefs when profiles are confirmed. */
export const socialLinks: readonly SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/armstrong-capital-advisory-pvt-ltd/posts/?feedView=all",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "",
  },
  {
    id: "x",
    label: "X",
    href: "",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "http://www.youtube.com/@ArmstrongCapital",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "",
  },
] as const;

export function getSocialLink(id: SocialPlatform): SocialLink | undefined {
  return socialLinks.find((link) => link.id === id);
}

export const activeSocialLinks = socialLinks.filter((link) => link.href.length > 0);
