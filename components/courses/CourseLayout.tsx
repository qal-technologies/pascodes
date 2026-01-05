"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

interface CourseLayoutProps {
  children: React.ReactNode;
}

export default function CourseLayout({ children }: CourseLayoutProps) {
  return (
    <Flex>
      <Box w="250px" bg="gray.800" p={4} h="100vh" position="sticky" top="0">
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          Course Content
        </Text>
        {/* Navigation links will go here */}
      </Box>
      <Box flex="1" p={10}>
        {children}
      </Box>
    </Flex>
  );
}
