import {Metadata} from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
    title: "Coding Courses ",
    description: "Master modern web development with our comprehensive coding courses. Learn React, Next.js, and Full-Stack Engineering from industry experts.",
    openGraph: {
        title: "Learn to Code with PasCodez - Expert-Led Courses",
        description: "From beginner basics to advanced masterclasses in software engineering.",
    }
};

export default function CoursesPage () {
    return <CoursesClient />;
}
