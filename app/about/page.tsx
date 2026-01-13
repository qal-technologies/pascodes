import {Metadata} from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me | Paschal Ngaoka",
  description: "Learn about Paschal Ngaoka, a Full-Stack Developer and UI/UX Designer dedicated to building high-performance digital solutions and empowering coders.",
  openGraph: {
    title: "About Paschal Ngaoka - Full-Stack Developer",
    description: "Discover the story, experience, and mission of Paschal Ngaoka.",
    type: "profile",
  }
};

export default function AboutPage () {
  return <AboutClient />;
}
