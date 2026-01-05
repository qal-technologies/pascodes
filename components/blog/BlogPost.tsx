"use client";

import { Box, Text, Image, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface BlogPostProps {
  post: {
    title: string;
    content: string;
    imageUrl: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box maxW="container.md" mx="auto" py={20}>
        <Heading as="h1" size="2xl" mb={6}>
          {post.title}
        </Heading>
        <Image src={post.imageUrl} alt={post.title} mb={10} borderRadius="lg" />
        <Box dangerouslySetInnerHTML={{ __html: post.content }} />
      </Box>
    </motion.div>
  );
}
