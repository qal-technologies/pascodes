"use client";

import {Box, Container, Heading, SimpleGrid, Link, VStack, Text} from "@chakra-ui/react";
import {FaGithub, FaLinkedin, FaYoutube, FaTwitter, FaInstagram} from "react-icons/fa";
import {SITE_CONFIG} from "@/lib/site-config";
import {Reveal} from "../utils/Reveal";

const socialPlatforms = [
    {name: "GitHub", icon: FaGithub, url: SITE_CONFIG.socials.github, color: "#ffffff"},
    {name: "LinkedIn", icon: FaLinkedin, url: SITE_CONFIG.socials.linkedin, color: "#0A66C2"},
    {name: "YouTube", icon: FaYoutube, url: SITE_CONFIG.socials.youtube, color: "#FF0000"},
    {name: "Twitter", icon: FaTwitter, url: SITE_CONFIG.socials.twitter, color: "#1DA1F2"},
    {name: "Instagram", icon: FaInstagram, url: SITE_CONFIG.socials.instagram, color: "#E4405F"},
];

export default function SocialSection () {
    return (
        <Box py={{base: 16, md: 20}} px={{base: 6, md: 12}} bg="background" textAlign="center">
            <Container maxW="container.lg">
                <Reveal>
                    <VStack gap={4} mb={12}>
                        <Heading
                            fontSize={{base: "3xl", md: "4xl"}}
                            fontWeight="bold"
                            color="foreground"
                            className="neon-text"
                        >
                            Let's Connect
                        </Heading>
                        <Text fontSize="lg" color="gray.200" maxW="2xl">
                            Follow my journey, check out my code, and stay updated with the latest in tech.
                        </Text>
                    </VStack>
                </Reveal>

                <SimpleGrid columns={{base: 2, sm: 3, md: 5}} gap={8}>
                    {socialPlatforms.map((platform, index) => (
                        <Reveal key={platform.name} delay={0.1 * index}>
                            <Link
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                p={5}
                                borderRadius="2xl"
                                transition="all 0.4s ease"
                                _hover={{
                                    transform: "translateY(-10px) scale(1.05)",
                                    boxShadow: `0 20px 40px ${platform.color}40`,
                                    borderColor: platform.color,
                                    textDecoration: "none"
                                }}
                            >
                                <Box
                                    as={platform.icon}
                                    fontSize="xl"
                                    color={platform.color}
                                    transition="transform 0.3s ease"
                                    _groupHover={{transform: "rotate(360deg)"}}
                                    gap={6}
                                />
                                <Text
                                    color="foreground"
                                    fontWeight="semibold"
                                    fontSize="md"
                                >
                                    {platform.name}
                                </Text>
                            </Link>
                        </Reveal>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
