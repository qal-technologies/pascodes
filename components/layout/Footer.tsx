"use client";

import { Box, Flex, Text, Link, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Box as="footer" py={10} bg="gray.900" color="gray.400">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="container.lg" mx="auto">
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="white">
            PasCodes
          </Text>
          <Text mt={2}>A passionate developer creating amazing web experiences.</Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="white">
            Quick Links
          </Text>
          <Flex direction="column" mt={2}>
            <Link href="/services">Services</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="white">
            Connect With Me
          </Text>
          <Flex mt={2}>
            <Link href="https://github.com/pascal-ver" isExternal>
              <Icon as={FaGithub} boxSize={6} />
            </Link>
            <Link href="https://linkedin.com/in/pascal-ver" isExternal ml={4}>
              <Icon as={FaLinkedin} boxSize={6} />
            </Link>
            <Link href="https://twitter.com/pascal-ver" isExternal ml={4}>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
          </Flex>
        </Box>
      </SimpleGrid>
      <Text textAlign="center" mt={10} fontSize="sm">
        &copy; {new Date().getFullYear()} PasCodes. All Rights Reserved.
      </Text>
    </Box>
  );
}
