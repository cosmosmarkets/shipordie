import type { Metadata } from "next";
import { Anton, Pirata_One } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { copy } from "@/lib/copy";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const pirata = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shipordie.vercel.app"
  ),
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.ogTitle,
    description: copy.meta.ogDescription,
    images: [{ url: "/opengraph-image.png", width: 1672, height: 941 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.ogTitle,
    description: copy.meta.ogDescription,
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${pirata.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
