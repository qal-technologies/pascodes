"use client";

import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import Banner from "./home/Banner";
import Skillset from "@/components/sections/Skillset";
import Pricing from "@/components/sections/Pricing";
import WorkedWith from "@/components/sections/WorkedWith";
import Collaboration from "@/components/sections/Collaboration";
import CoursePurchase from "@/components/sections/CoursePurchase";

export default function HomePage() {
  return (
    <Scrollable>
      <Navbar />
      <Banner />
      <Skillset />
      <Pricing />
      <WorkedWith />
      <Collaboration />
      <CoursePurchase />
    </Scrollable>
  );
}
