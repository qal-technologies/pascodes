"use client";

import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import Banner from "./home/Banner";

export default function HomePage() {
  return (
    <Scrollable>
      <Navbar />
      <Banner />


    </Scrollable>
  );
}
