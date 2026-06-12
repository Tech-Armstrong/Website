import type { Metadata, Viewport } from "next";
import { Mulish, Urbanist } from "next/font/google";
import { CalendlyBadge } from "@/components/integrations/CalendlyBadge";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site/config";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} and Financial services Pvt Ltd`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} and Financial services Pvt Ltd`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14203a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${mulish.variable}`}>
      <head>
        <link rel="preconnect" href="https://armstrong-cap.com" />
        <link rel="dns-prefetch" href="https://armstrong-cap.com" />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          {children}
        </MotionProvider>
        <SocialSidebar />
        <CalendlyBadge />
      </body>
    </html>
  );
}
