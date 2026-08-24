import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from '@/components/ui/provider';
import FloatingButtons from '@/components/layout/FloatingButtons';
import {Toaster} from "@/components/ui/toaster";
import AnnouncementBar from '@/components/layout/AnnouncementBar';

import "@/styles/globals.css";

const origin = process.env.SITE_URL || "https://poshcodes.com";
const imageUrl = `/images/logo.png`;
const aboutUrl = `${origin}/about`;
const homeUrl = `${origin}/`;

export const viewport = {
  themeColor: "#00cae0ff",
  width: "device-width",
  initialScale: 1,
};


export const metadata: Metadata = {
  title: {
    default: "PoshCodes - High-Performance Software & Coding Platform",
    template: "%s | PoshCodes",
  },
  description:
    "PoshCodes by Paschal Ngaoka — Senior Full-Stack Developer, UI/UX Architect & Software Engineer. Building high-performance web and mobile solutions with React, Next.js, and Firebase.",
  keywords: [
    "Coding Courses",
    "React",
    "Next.js",
    "Web Development",
    "Software Platform",
    "Developer",
    "PoshCodes",
    "PoshCodes Solutions",
    "Mobile App Development",
    "UI/UX Design",
    "Software Engineering",
    "Learn Programming",
    "Online Coding Courses",
    "Developer Consultancy",
    "Custom Web Apps",
    "AI Integration",
    "API Development",
    "Automation"
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
    title: "PoshCodes - High-Performance Software & Coding Platform",
    description:
      "PoshCodes - Senior Full-Stack Developer, UI/UX Architect & Software Engineer. Building modern web & mobile apps and offering premium courses.",
    url: `${homeUrl}`,
    siteName: "PoshCodes",
    images: [
      {
        url: `${imageUrl}`,
        width: 1200,
        height: 630,
        alt: "PoshCodes Platform Preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PoshCodes - High-Performance Software & Coding Platform",
    description:
      "PoshCodes - Senior Full-Stack Developer, UI/UX Architect & Software Engineer. Building modern web & mobile apps and offering premium courses.",
    creator: "@poshcodes",
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Paschal Ngaoka",
                "jobTitle": "Software Engineer & Med. Lab Scientist",
                "url": `${origin}`,
                "alumniOf": {
                  "@type": "EducationalOrganization",
                  "name": "University of Calabar",
                  "sameAs": "https://unical.edu.ng"
                },

                "sameAs": [
                  "https://github.com/pasqal-dev",
                  "https://www.linkedin.com/in/paschal-ngaoka-693859280",
                  "https://twitter.com/PasQal_Ng",
                  "https://instagram.com/pasqal.dev",
                  "https://wa.me/2349016561308"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PoshCodes",
                "url": `${origin}`,
                "logo": `${imageUrl}`,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+2349016561308",
                  "contactType": "Customer Service",
                  "email": "poshcodes.dev@gmail.com"
                }
              }
            ]),
          }}
        />
      </head>
      <body
        className={`antialiased`}
      >
        <Provider>
          <AnnouncementBar />
          {children}
          <FloatingButtons />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
