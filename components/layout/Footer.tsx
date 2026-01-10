"use client";

import {Box, Container, SimpleGrid, HStack, Text, Heading, Link, Separator, Image, VStack, Icon} from "@chakra-ui/react";
import {SITE_CONFIG} from "@/lib/site-config";
import SocialButton from "@/components/buttons/SocialsButton";
import {FaMapMarkerAlt, FaPaperPlane} from "react-icons/fa";

export default function Footer () {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg="background/80"
      color="gray.400"
      pt={25}
      pb={12}
      padding={12}
      borderTop="1px solid"
      borderColor="border"
      backdropFilter={'blur(10px)'}
      bgGradient="to-br"
      gradientFrom='background'
      gradientVia='background'
      gradientTo='brandGreen.900/90'
    >
      <Container maxW="container.xl">
        <SimpleGrid columns={{base: 1, md: 2, lg: 4}} gap={11} mb={16}>
          {/* Brand Section */}
          <VStack align="start" gap={8} mb={4}>
            <HStack gap={3}>
              <Box position="relative">
                <Image src="/images/logo.png" alt="PasCodez" w="40px" borderRadius="12px" className="neon-glow-accent" />
              </Box>
              <Heading size="md" color="brandGreen.500" letterSpacing="1px" className="neon-text">pascodez_</Heading>
            </HStack>
            <Text fontSize="md" lineHeight="tall">
              Building next-generation digital experiences. Specializing in high-performance web applications, specialized developer tools, and comprehensive coding education.
            </Text>
            <VStack align="start" gap={3}>
              <Text fontSize="xs" mt={2}>Reach out to me on any of the socials</Text>
              <HStack gap={4} wrap={'wrap'}>
                {Object.entries(SITE_CONFIG.socials).map(([name, link]) => (
                  <SocialButton
                    key={name}
                    socialsName={name}
                    href={link}
                    themeColor="brandGreen.500"
                    size="sm"
                    glow
                  />
                ))}
              </HStack>
            </VStack>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" gap={4}>
            <Heading size="sm" color="foreground" mb={1} fontFamily={'PoppinsSemi'}>Quick Navigation
            <UnderLine />
            </Heading>

            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Me</FooterLink>
            <FooterLink href="/services">Our Services</FooterLink>
            <FooterLink href="/courses">Courses</FooterLink>
            <FooterLink href="/blog">Tech Blog</FooterLink>
          </VStack>

          {/* Services */}
          <VStack align="start" gap={4}>
            <Heading size="sm" color="foreground" mb={1} fontFamily={'PoppinsSemi'}>Core Services
            <UnderLine />
            </Heading>

            <FooterLink href="/build?type=portfolio">Portfolio Design</FooterLink>
            <FooterLink href="/build?type=business" >Business Solutions</FooterLink>
            <FooterLink href="/build?type=e-commerce">E-Commerce Systems</FooterLink>
            <FooterLink href="/build?type=webapp">Custom Web Apps</FooterLink>
            <FooterLink href="/services">Technical Audit</FooterLink>
          </VStack>

          {/* Newsletter/Contact */}
          <VStack align="start" gap={4}>
            <Heading size="sm" color="foreground" mb={1} fontFamily={'PoppinsSemi'}>Stay Connected
              <UnderLine />
            </Heading>
            <Text fontSize="sm">Got a project in mind? Let&apos;s talk about it.</Text>
            <Box w="full">
              <HStack
                bg="blackAlpha.200"
                p={1}
                borderRadius="full"
                border="1px solid"
                gap={1}
                borderColor="border"
                transition="all 0.3s"
                _focusWithin={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500}"}}
                _active={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500}"}}
              >
                <Box flex={1} px={4} color="foreground" fontSize="xs" fontWeight="bold" letterSpacing={1}>
                  {SITE_CONFIG.email}
                </Box>
                <Box
                  as="button"
                  p={3}
                  bg="brandGreen.500"
                  borderRadius="full"
                  color="black"
                  onClick={() => window.location.href = `mailto:${SITE_CONFIG.email}`}
                  className="hover-lift neon-glow-accent"
                >
                  <FaPaperPlane size={12} />
                </Box>
              </HStack>
            </Box>
            <VStack gap={2} align="start">
              <Box flexDirection="row" direction={'row'} width={'full'} gap={2}>
                <Icon color={'brandGreen.500'} as={FaMapMarkerAlt} size={'sm'} width={'fit-content'} />
                <Text fontSize="xs" maxWidth={'fit-content'} as='span' ml={2}>Located</Text>
              </Box>

              <Text fontWeight="bolder" fontSize="sm" mb={-2}> Calabar, Nigeria</Text>
              <Text fontWeight="bold" fontSize="xs"> (Remotely Available)</Text>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Separator borderColor="border" mb={8} />

        <HStack justify="space-between" wrap="wrap" gap={4}>
          <Text fontSize="sm">
            &copy; {currentYear} PasCodez.
          </Text>
          <HStack gap={6}>
            <FooterLink href="/privacy" fontSize="xs">Privacy Policy</FooterLink>
            <FooterLink href="/terms" fontSize="xs">Terms of Service</FooterLink>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

export function FooterLink ({href, children, ...props}: {href: string, children: React.ReactNode, [key: string]: unknown;}) {
  return (
    <Link
      href={href}
      fontSize="sm"
      _hover={{color: "brandGreen.500", textDecoration: "none", transform: "translateX(5px)"}}
      transition="all 0.2s"
      {...props}
    >
      {children}
    </Link>
  );
}

export function UnderLine ({maxWidth = 150}: {maxWidth?: string | number;}) {
  return (
    <Box height={'3px'} background={'brandGreen.500'} borderRadius={'full'} width='70%' maxWidth={maxWidth} className="neon-glow-primary" mb={2} mt={1} />
  );
}
