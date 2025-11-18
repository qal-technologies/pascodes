"use client";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function CoursePurchase() {
  return (
    <Box py={20} bg="gray.800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={6} textAlign="center">
          <Heading as="h2" size="2xl">
            Start Learning Today
          </Heading>
          <p>
            Take your coding skills to the next level with my comprehensive
            courses.
          </p>
          <Button
            as="a"
            href="/courses"
            colorScheme="green"
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
