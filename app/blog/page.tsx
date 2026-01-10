"use client";

import {Box, Separator} from "@chakra-ui/react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import BlogSection from "@/components/home/BlogSection";
import {Reveal} from "@/components/utils/Reveal";
import PartnershipSection from "@/components/home/PartnershipSection";

export default function BlogPage () {
  return (
    <Scrollable>
      <Navbar />

      <Box width={'100%'} padding={'11vh'} />

      <Reveal width='100%'>
        <BlogSection />
      </Reveal>

      <Reveal width="100%">
        <PartnershipSection />
      </Reveal>
      <Separator borderColor="whiteAlpha.100" />
      <Footer />
    </Scrollable>
  );
}