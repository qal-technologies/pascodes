"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage() {
  return (
    <Box maxW="container.lg" mx="auto" py={20}>
      <Heading as="h1" size="2xl" mb={10}>
        Blog
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {/* {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))} */}
      </SimpleGrid>
    </Box>
  );
}