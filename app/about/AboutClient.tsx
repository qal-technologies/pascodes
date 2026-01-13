"use client";

import {Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Image, Separator} from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {SITE_CONFIG} from "@/lib/site-config";
import {FaBriefcase, FaGraduationCap} from "react-icons/fa";
import SocialButton from "@/components/buttons/SocialsButton";
import Footer from "@/components/layout/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PageBanner from "@/components/layout/PageBanner";
import WhatsGoingOn from "@/components/sections/WhatsGoingOn";

export default function AboutPage () {
  return (
    <Box minH="100vh" bg="black" color="white">
      <Navbar />
      <Container maxW="container.xl" padding={10} pt={'150px'} pb={20} alignSelf='center' placeItems='center' justifySelf={'center'}>
        <Reveal width="100%" >
          <VStack gap={12} align="stretch">
            {/* Hero Section */}
            <SimpleGrid columns={{base: 1, md: 2}} gap={10} alignItems="center" justifyContent={'space-evenly'}>
              <VStack align="start" gap={6} mb={2}>
                <Box mb={1}>
                  <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb={1}>
                    The Story Behind
                  </Text>
                  <Heading size="3xl" fontFamily="PoppinsBold" fontSize={25}>
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

            {/* Experience & Education Section */}
            <SimpleGrid columns={{base: 1, lg: 2}} gap={12}>
              {/* Experience */}
              <VStack align="start" gap={8}>
                <HStack gap={3}>
                  <Box p={2} bg="brandGreen.500/10" borderRadius="lg">
                    <FaBriefcase color="var(--chakra-colors-brandGreen-500)" />
                  </Box>
                  <Heading size="xl" fontFamily="PoppinsSemi" fontSize={22}>Professional Experience</Heading>
                </HStack>

                <VStack align="start" gap={6} width="full">
                  {[
                    {
                      role: "Senior Full-Stack Developer",
                      company: "PasCodez Solutions",
                      period: "2023 - Present",
                      desc: "Leading the development of high-performance web applications and specialized developer tools. Architecting scalable systems using Next.js and Cloud Firestore.",
                      tags: ["Next.js", "TypeScript", "Firebase"]
                    },
                    {
                      role: "Frontend Engineer & UI Designer",
                      company: "TechNova Systems",
                      period: "2021 - 2023",
                      desc: "Focused on creating intuitive user experiences and design systems. Optimized frontend performance resulting in 40% faster load times for client portals.",
                      tags: ["React", "Chakra UI", "Figma"]
                    }
                  ].map((exp, i) => (
                    <Box key={i} width="full" p={6} bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" className="hover-lift">
                      <HStack justify="space-between" mb={2}>
                        <Text color="brandGreen.500" fontWeight="bold" fontSize="sm">{exp.period}</Text>
                        <Text color="gray.500" fontSize="xs">{exp.company}</Text>
                      </HStack>
                      <Heading size="md" mb={2} fontSize={18}>{exp.role}</Heading>
                      <Text color="gray.400" fontSize="sm" mb={4}>{exp.desc}</Text>
                      <HStack gap={2} wrap="wrap">
                        {exp.tags.map(tag => (
                          <Box key={tag} px={2} py={1} bg="brandGreen.500/10" color="brandGreen.300" borderRadius="md" fontSize="xs" fontWeight="bold">
                            {tag}
                          </Box>
                        ))}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </VStack>

              {/* Education */}
              <VStack align="start" gap={8}>
                <HStack gap={3}>
                  <Box p={2} bg="blue.500/10" borderRadius="lg">
                    <FaGraduationCap color="var(--chakra-colors-blue-500)" />
                  </Box>
                  <Heading size="xl" fontFamily="PoppinsSemi" fontSize={22}>Academic Background</Heading>
                </HStack>

                <VStack align="start" gap={6} width="full">
                  {[
                    {
                      degree: "B.Sc. in Computer Science",
                      school: "University of Calabar",
                      period: "2018 - 2022",
                      desc: "Focused on Software Engineering, Data Structures, and Algorithmic Analysis. Graduated with honors."
                    },
                    {
                      degree: "Full-Stack Development Certification",
                      school: "Tech Institute of Africa",
                      period: "2020",
                      desc: "Intensive training in modern web technologies, focusing on MERN stack and cloud integrations."
                    }
                  ].map((edu, i) => (
                    <Box key={i} width="full" p={6} bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" className="hover-lift">
                      <HStack justify="space-between" mb={2}>
                        <Text color="blue.400" fontWeight="bold" fontSize="sm">{edu.period}</Text>
                        <Text color="gray.500" fontSize="xs">{edu.school}</Text>
                      </HStack>
                      <Heading size="md" mb={2} fontSize={18}>{edu.degree}</Heading>
                      <Text color="gray.400" fontSize="sm">{edu.desc}</Text>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </SimpleGrid>

            <Separator borderColor="whiteAlpha.100" />

            <ProjectsSection />

            <Separator borderColor="whiteAlpha.100" />

            {/* What's Going On Section */}
            <WhatsGoingOn />

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
