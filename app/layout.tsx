import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from '@/components/ui/provider';
import FloatingButtons from '@/components/layout/FloatingButtons';
import {Toaster} from "@/components/ui/toaster";
import AnnouncementBar from '@/components/layout/AnnouncementBar';

import "@/styles/globals.css";

const origin = process.env.SITE_URL || "https://pascodez.com";
const imageUrl = `${origin}/images/logo.png`;
const aboutUrl = `${origin}/about`;
const homeUrl = `${origin}/`;

export const viewport = {
  themeColor: "#00E072",
  width: "device-width",
  initialScale: 1,
};


export const metadata: Metadata = {
  title: {
    default: "PasCodez - All About Tech",
    template: "%s | PasCodez",
  },
  description:
    "PasCodez by Paschal Ngaoka — Full-Stack Developer, UI/UX Designer & Software Engineer. I build fast, modern web and mobile apps using React, Next.js, and Firebase — with clean UI, optimized performance, and real-world scalability. Explore my portfolio, read insightful tech blogs, or learn through my free and premium coding courses. Ready to build your next idea? Let’s turn it into reality.",
  keywords: [
    "Coding Courses",
    "React",
    "Next.js",
    "Web Development",
    "Blog",
    "Software",
    "Developer",
    "Pasqal Ng",
    "PasCodez",
    "PasCodez Solutions",
    "Mobile App Developer",
    "UI/UX Design",
    "Nigeria Tech Hub",
    "Software Engineering Nigeria",
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
    title: "PasCodez - All About Tech",
    description:
      "PasCodez - Full-Stack Developer, UI/UX Designer & Software Engineer. Building modern apps, sharing coding courses & tutorials by Paschal Ngaoka.",
    url: `${homeUrl}`,
    siteName: "PasCodez",
    images: [
      {
        url: `${imageUrl}`,
        width: 1200,
        height: 630,
        alt: "PasCodez Image Preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PasCodez - All About Tech",
    description:
      "PasCodez - Full-Stack Developer, UI/UX Designer & Software Engineer. Building modern apps, sharing coding courses & tutorials by Paschal Ngaoka.",
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Paschal Ngaoka",
                "jobTitle": "Full-Stack Developer & UI/UX Designer",
                "url": `${origin}`,
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
                "name": "PasCodez",
                "url": `${origin}`,
                "logo": `${imageUrl}`,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+2349016561308",
                  "contactType": "Customer Service",
                  "email": "pasqal.dev@gmail.com"
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
