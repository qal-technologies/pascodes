"use client";

import {Box, Heading, Separator, SimpleGrid} from "@chakra-ui/react";
import BlogCard from "@/components/blog/BlogCard";
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