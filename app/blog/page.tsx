import {Metadata} from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
    title: "Tech Blog ",
    description: "Stay updated with the latest in tech, software engineering, and lifestyle. Insightful blogs and announcements from the PasCodez community.",
    openGraph: {
        title: "PasCodez Tech Blog - Insights & Updates",
        description: "Deep dives into React, Next.js, AI, and modern software development.",
    }
};

export default function BlogListingPage () {
    return <BlogClient />;
}
