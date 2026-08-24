import type { Metadata } from 'next';
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: "PoshCodes - All About Coding",
    description: "PoshCodes by Paschal Ngaoka - Full-Stack Developer, UI/UX Designer & Software Engineer. I build fast, modern web and mobile apps using React, Next.js, and Firebase, with clean UI, optimized performance, and real-world scalability. Explore my portfolio, read insightful tech blogs, or learn through my free and premium coding courses. Ready to build your next idea? Let’s turn it into reality.",
    keywords: [
        "Coding Courses",
        "React",
        "Next.js",
        "Web Development",
        "Blog",
        "Software",
        "Developer",
        "Pasqal Ng",
        "PoshCodes",
        "PoshCodes Solutions",
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
    creator: "Paschal Ngaoka",
};

export default function HomePage () {
    return <HomeClient />;
}
