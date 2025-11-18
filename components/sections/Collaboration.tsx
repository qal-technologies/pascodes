"use client";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Collaboration() {
  return (
    <Box py={20}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={6} textAlign="center">
          <Heading as="h2" size="2xl">
            Let's Collaborate
          </Heading>
          <p>
            Have a project in mind? I'm always open to discussing new ideas and
            opportunities. Let's work together to create something amazing.
          </p>
          <Button
            as="a"
            href="/contact"
            colorScheme="green"
            size="lg"
            px={8}
            py={6}
          >
            Let's Work
          </Button>
        </VStack>
      </motion.div>
    </Box>
  );
}
