"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Scrollable from "@/components/layout/Scrollable";
import PlansSection from "@/components/home/PlansSection";
import { Reveal } from "@/components/utils/Reveal";
import { Box, Container, Heading, Text, VStack, SimpleGrid, Button, Badge, Separator } from "@chakra-ui/react";
import Link from "next/link";
import { FaCheck, FaRocket, FaShieldAlt, FaCode } from "react-icons/fa";

export default function PricingClient() {
  return (
    <Scrollable>
      <Navbar />
      <Box pt={36} pb={20} bg="background" color="foreground">
        <Container maxW="container.xl">
          <VStack gap={6} textAlign="center" mb={16}>
            <Reveal>
              <Badge colorPalette="brandGreen" px={4} py={1} borderRadius="full" fontSize="sm">
                Transparent & Flexible Pricing
              </Badge>
              <Heading size="3xl" fontFamily="PoppinsBold" color="white" mt={4} mb={2}>
                PoshCodes Service Plans & Course Pricing
              </Heading>
              <Text color="gray.400" fontSize="lg" maxW="2xl" mx="auto">
                Comprehensive breakdown of software development tiers, enterprise pricing, and developer training courses designed for maximum return on investment.
              </Text>
            </Reveal>
          </VStack>

          {/* Development Plans */}
          <Reveal width="100%">
            <PlansSection />
          </Reveal>

          <Separator borderColor="whiteAlpha.100" my={16} />

          {/* Value Highlights */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mb={16}>
            <Reveal delay={0.1}>
              <Box p={8} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" height="full">
                <Box p={3} bg="brandGreen.500/10" borderRadius="xl" color="brandGreen.400" w="max-content" mb={4}>
                  <FaRocket size={24} />
                </Box>
                <Heading size="md" color="white" mb={2}>High-Performance Delivery</Heading>
                <Text color="gray.400" fontSize="sm">
                  We engineer Next.js and React Native apps optimized for lightning speed, high SEO searchability, and sub-second load times.
                </Text>
              </Box>
            </Reveal>

            <Reveal delay={0.2}>
              <Box p={8} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" height="full">
                <Box p={3} bg="blue.500/10" borderRadius="xl" color="blue.400" w="max-content" mb={4}>
                  <FaShieldAlt size={24} />
                </Box>
                <Heading size="md" color="white" mb={2}>Security & Scalability</Heading>
                <Text color="gray.400" fontSize="sm">
                  Built-in Stripe payment security, Firebase database encryption, and Gemini AI backend integrations ready for high user volumes.
                </Text>
              </Box>
            </Reveal>

            <Reveal delay={0.3}>
              <Box p={8} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" height="full">
                <Box p={3} bg="purple.500/10" borderRadius="xl" color="purple.400" w="max-content" mb={4}>
                  <FaCode size={24} />
                </Box>
                <Heading size="md" color="white" mb={2}>Elite Developer Training</Heading>
                <Text color="gray.400" fontSize="sm">
                  Lifetime access to PoshCodes coding courses with interactive quizzes, downloadable resources, and hands-on projects.
                </Text>
              </Box>
            </Reveal>
          </SimpleGrid>

          {/* CTA Box */}
          <Reveal width="100%">
            <Box p={10} bg="brandGreen.900/30" borderRadius="3xl" border="1px solid" borderColor="brandGreen.500/30" textAlign="center">
              <Heading size="xl" color="white" mb={4}>Need a Custom Quote or AI Estimate?</Heading>
              <Text color="gray.300" maxW="xl" mx="auto" mb={8}>
                Use our AI-powered build estimator to get instant, dynamic pricing customized specifically to your project features and screen requirements.
              </Text>
              <Link href="/build">
                <Button size="xl" colorPalette="brandGreen" bg="brandGreen.500" color="black" borderRadius="full" px={10} className="hover-lift">
                  Start AI Estimator &rarr;
                </Button>
              </Link>
            </Box>
          </Reveal>
        </Container>
      </Box>
      <Footer />
    </Scrollable>
  );
}
