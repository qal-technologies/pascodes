"use client";

import { Box, Text, Link, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
  };
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={cardVariants}>
        <Link href={`/blog/${post.slug}`} _hover={{ textDecoration: "none" }}>
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
            transition="all 0.2s"
        >
            <Image src={post.imageUrl} alt={post.title} />
            <Box p={6}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
                {post.title}
            </Text>
            <Text noOfLines={3}>{post.excerpt}</Text>
            </Box>
        </Box>
        </Link>
    </motion.div>
  );
}
