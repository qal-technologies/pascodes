import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from '@/components/ui/provider';

import "@/styles/globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const origin = process.env.SITE_URL || "http://localhost:3000";
const imageUrl = `${origin}/images/logo.png`;
const aboutUrl = `${origin}/about`;
const homeUrl = `${origin}/`;


export const metadata: Metadata = {
  title: {
    default: "PasCodes - All About Coding",
    template: "%s | PasCodes",
  },
  description:
    "PasCodes by Paschal Ngaoka — Full-Stack Developer, UI/UX Designer & Software Engineer. I build fast, modern web and mobile apps using React, Next.js, and Firebase — with clean UI, optimized performance, and real-world scalability. Explore my portfolio, read insightful tech blogs, or learn through my free and premium coding courses. Ready to build your next idea? Let’s turn it into reality.",
  keywords: [
    "coding courses",
    "React",
    "Next.js",
    "web development",
    "blog",
    "software",
    "developer",
    "pasqalng",
    "PasQal Ng",
    "PasQalNg",
    "pascodes",
    "pasCodes",
    "web developer",
    "mobile app developer",
    "web development",
    "learn coding",
    "API integration",
    "Automation",
    "Nigeria",
    "all about coding",
    "coding courses",
    "React",
    "Next.js",
    "web development",
    "mobile development",
    "software engineering",
    "UI/UX",
    "PasCodes",
    "Paschal Ngaoka",
    "learn programming",
    "online courses",
    "developer consultancy",
  ],
  authors: [{ name: "Paschal Ngaoka", url: `${aboutUrl}` }],
  creator: "Paschal Ngaoka",
  manifest: `${origin}/manifest.json`,
  icons: {
    icon: `${imageUrl}`,
    shortcut: `${imageUrl}`,
    apple: `${imageUrl}`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    title: "PasCodes - All About Coding",
    description:
      "PasCodes - Full-Stack Developer, UI/UX Designer & Software Engineer. Building modern apps, sharing coding courses & tutorials by Paschal Ngaoka.",
    url: `${homeUrl}`,
    siteName: "PasCodes",
    images: [
      {
        url: `${imageUrl}`,
        width: 1200,
        height: 630,
        alt: "PasCodes Image Preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PasCodes - All About Coding",
    description:
      "PasCodes - Full-Stack Developer, UI/UX Designer & Software Engineer. Building modern apps, sharing coding courses & tutorials by Paschal Ngaoka.",
    creator: "@pasqal.dev",
    images: [`${imageUrl}`],
  },
  alternates: {
    canonical: `${homeUrl}`
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Paschal Ngaoka",
              jobTitle: "Software Engineer",
              url: `${origin}`,
              sameAs: [
                "https://github.com/pasqal-dev",
                "https://www.linkedin.com/in/paschal-ngaoka-693859280",
                "https://twitter.com/PasQal_Ng",
                "https://instagram.com/pasqal.dev",
                "https://wa.me/2349016561308",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`antialiased`}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
