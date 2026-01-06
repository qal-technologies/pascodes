"use client";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import {useRouter} from "next/navigation";

export default function Collaboration() {
  const router = useRouter();

  return (
    <Box py={20}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <VStack gap={6} textAlign="center">
          <Heading as="h2" size="2xl">
            Let&apos;s Collaborate
          </Heading>
          <p>
            Have a project in mind? I&apos;m always open to discussing new ideas and
            opportunities. Let&apos;s work together to create something amazing.
          </p>
          <Button
            onClick={() => router.push('/contact')}
            colorPalette="brandGreen"
            size="lg"
            px={8}
            py={6}
          >
            Let&apos;s Work
          </Button>
        </VStack>
      </motion.div>
    </Box>
  );
}
