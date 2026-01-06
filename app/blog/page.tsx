"use client";

import {Separator} from "@chakra-ui/react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";

export default function BlogPage () {
  return (
    <Scrollable>
      <Navbar />

      <Separator borderColor="whiteAlpha.100" />
      <Footer />
    </Scrollable>
  );
}