"use client";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import {useRouter} from "next/navigation";

export default function CoursePurchase() {
  const router = useRouter();

  return (
    <Box py={20} bg="gray.800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <VStack gap={6} textAlign="center">
          <Heading as="h2" size="2xl">
            Start Learning Today
          </Heading>
          <p>
            Take your coding skills to the next level with my comprehensive
            courses.
          </p>
          <Button
            onClick={() => router.push('/courses')}
            colorPalette="brandGreen"
            size="lg"
            px={8}
            py={6}
          >
            View Courses
          </Button>
        </VStack>
      </motion.div>
    </Box>
  );
}
