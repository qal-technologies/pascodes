"use client";

import {Box, Container, Heading, Text, VStack} from "@chakra-ui/react";
import NewsTicker from "./NewsTicker";
import {Reveal} from "../utils/Reveal";

interface PageBannerProps {
    title: string;
    subtitle?: string;
    showTicker?: boolean;
}

export default function PageBanner ({title, subtitle, showTicker = true}: PageBannerProps) {
    return (
        <Box position="relative">
            {/* Background Decorations */}
            <Box
                position="absolute"
                top="-10%"
                right="-5%"
                w="400px"
                h="400px"
                bg="brandGreen.700/20"
                filter="blur(100px)"
                borderRadius="full"
                zIndex={0}
            />
            <Box
                position="absolute"
                bottom="-10%"
                left="-5%"
                w="300px"
                h="300px"
                bg="brandNavy.500/20"
                filter="blur(100px)"
                borderRadius="full"
                zIndex={0}
            />

            <Box
                bg="black"
                pt={{base: "150px", lg: "200px"}}
                pb={{base: 12, lg: 20}}
                position="relative"
                zIndex={1}
                borderBottom="1px solid"
                borderColor="whiteAlpha.100"
            >
                <Container maxW="container.xl">
                    <VStack align="start" gap={6}>
                        <Reveal>
                            <VStack align="start" gap={2}>
                                <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="xs">
                                    {subtitle || "PoshCodes / Resources"}
                                </Text>
                                <Heading size="3xl" fontFamily="PoppinsBold" color="white">
                                    {title}
                                </Heading>
                            </VStack>
                        </Reveal>
                    </VStack>
                </Container>
            </Box>

            {showTicker && <NewsTicker />}
        </Box>
    );
}
