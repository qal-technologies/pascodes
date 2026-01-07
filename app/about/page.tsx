"use client";

import {Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Image, Separator} from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {SITE_CONFIG} from "@/lib/site-config";
import SocialButton from "@/components/buttons/SocialsButton";
import {FaRocket, FaCode, FaLightbulb} from "react-icons/fa";
import Footer from "@/components/layout/Footer";

export default function AboutPage () {
  return (
    <Box minH="100vh" bg="black" color="white">
      <Navbar />

      <Container maxW="container.xl" padding={10} pt={150} pb={20} alignSelf='center' placeItems='center' justifySelf={'center'}>
        <Reveal width="100%" >
          <VStack gap={12} align="stretch">
            {/* Hero Section */}
            <SimpleGrid columns={{base: 1, md: 2}} gap={10} alignItems="center" justifyContent={'space-evenly'}>
              <VStack align="start" gap={6} mb={2}>
                <Box mb={1}>
                  <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb={1}>
                    The Story Behind
                  </Text>
                  <Heading size="3xl" fontFamily="PoppinsBold"  fontSize={25}>
                    Paschal Ngaoka
                  </Heading>
                </Box>
                <Text fontSize="lg" color="gray.400" lineHeight="tall">
                  I&apos;m a Full-Stack Developer and UI/UX Designer dedicated to building high-performance, aesthetically pleasing digital solutions. My mission is to simplify complex problems through clean code and intuitive design.
                </Text>
                <HStack gap={4} wrap={'wrap'} mt={2}>
                  <Text minW={'100%'} fontSize="md" color="whiteAlpha.800" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" >Let&apos;s connect</Text>
                  {Object.entries(SITE_CONFIG.socials).map(([name, link]) => (
                    <SocialButton
                      key={name}
                      socialsName={name}
                      href={link}
                      themeColor="brandGreen.500"
                      size="md"
                      glow
                    />
                  ))}
                </HStack>
              </VStack>

              <Box position="relative" alignSelf={'end'}>
                <Box
                  position="absolute"
                  inset="-20px"
                  bg="brandGreen.500/10"
                  filter="blur(40px)"
                  borderRadius="full"
                />
                <Image
                  src="/images/logo.png"
                  alt="Pasqal"
                  borderRadius="2xl"
                  width="90%"
                  maxW="400px"
                  mx="auto"
                  position="relative"
                  zIndex={1}
                />
              </Box>
            </SimpleGrid>

            <Separator borderColor="whiteAlpha.100" />

            {/* What's Going On Section */}
            <Box id="whats-going-on">
              <Heading size="xl" mb={8} fontFamily="PoppinsSemi" color="brandGreen.500">
                What&apos;s Going On?
              </Heading>
              <SimpleGrid columns={{base: 1, md: 3}} gap={8}>
                <NewsCard
                  icon={<FaRocket />}
                  title="New Platform Launch"
                  date="Jan 2026"
                  description="Currently finalizing the PasCodes v2 portal with automated price estimation and developer toolkits."
                />
                <NewsCard
                  icon={<FaCode />}
                  title="Advanced React Course"
                  date="Coming Soon"
                  description="Recording a comprehensive series on Next.js 15 and Chakra UI v3 for the upcoming course release."
                />
                <NewsCard
                  icon={<FaLightbulb />}
                  title="Open Source Projects"
                  date="Ongoing"
                  description="Exploring AI integration for workflow automation and contributing to modern web ecosystems."
                />
              </SimpleGrid>
            </Box>

            <Separator borderColor="whiteAlpha.100" />

            {/* Vision Section */}
            <SimpleGrid columns={{base: 1, md: 2}} gap={10}>
              <Box p={8} bg="gray.900" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
                <Heading size="md" mb={4} color="brandGreen.400">Our Vision</Heading>
                <Text color="gray.400">
                  To bridge the gap between imagination and reality by providing developers and businesses with the tools and knowledge they need to succeed in the digital age.
                </Text>
              </Box>
              <Box p={8} bg="gray.900" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
                <Heading size="md" mb={4} color="blue.400">The Mission</Heading>
                <Text color="gray.400">
                  Empowering the next generation of coders through high-quality resources, transparent collaboration, and innovative software solutions.
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Reveal>
      </Container>

      <Separator borderColor="whiteAlpha.100" />
      <Footer />
    </Box>
  );
}

function NewsCard ({icon, title, date, description}: {icon: React.ReactNode, title: string, date: string, description: string;}) {
  return (
    <Box
      p={6}
      bg="whiteAlpha.50"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      transition="all 0.3s"
      _hover={{transform: "translateY(-5px)", borderColor: "brandGreen.500/50", bg: "whiteAlpha.100"}}
    >
      <Box color="brandGreen.500" fontSize="2xl" mb={4}>{icon}</Box>
      <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" mb={1}>{date}</Text>
      <Heading size="md" mb={3}>{title}</Heading>
      <Text color="gray.400" fontSize="sm">{description}</Text>
    </Box>
  );
}
