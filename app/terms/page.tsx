import {Box, Container, Heading, Link, Text, VStack, } from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {SITE_CONFIG} from "@/lib/site-config";
import {MiniFooter} from "../privacy/page";
import {UnderLine} from "@/components/layout/Footer";

export const metadata = {
    title: "Terms of Service",
    description: "Terms of Service for PasCodez platform."
};

export default function TermsPage () {
    return (
        <Box bg="background" minH="100vh">
            <Navbar />
            <Box pt={32} pb={20} px={10}>
                <Container maxW="container.md">
                    <Reveal>
                        <VStack align="start" gap={10}>
                            <Box>
                                <Heading size="xl" color="brandGreen.500" className="neon-text" fontFamily={'PoppinsSemi'} fontSize={25}>Terms of Service</Heading>
                                <Text color="gray.400">Last Updated: January 2026</Text>
                            </Box>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">1. Terms
                                    <UnderLine />
                                </Heading>

                                <Text color="gray.300">
                                    By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">2. Use License
                                    <UnderLine />
                                </Heading>

                                <Text color="gray.300">
                                    Permission is granted to temporarily download one copy of the materials on PasCodez&apos;s website for personal, non-commercial transitory viewing only.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">3. Disclaimer
                                    <UnderLine />
                                </Heading>

                                <Text color="gray.300">
                                    The materials on PasCodez&apos;s website are provided &quot;as is&quot;. PasCodez makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">4. Limitations
                                    <UnderLine />
                                </Heading>

                                <Text color="gray.300">
                                    In no event shall PasCodez or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PasCodez&apos;s Internet site.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">5. Governing Law
                                    <UnderLine />
                                </Heading>


                                <Text color="gray.300">
                                    Any claim relating to PasCodez&apos;s website shall be governed by the laws of Nigeria without regard to its conflict of law provisions.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">6. Contact Us
                                    <UnderLine />
                                </Heading>

                                <Text color="gray.300">
                                    If you have any questions about this terms and conditions or our usage practices, please contact us at:
                                </Text>

                                <VStack gap={2} align='start'>
                                    <Link href={`mailto:${SITE_CONFIG.email}`} color="brandGreen.500" fontWeight="bold">
                                        {SITE_CONFIG.email}
                                    </Link>

                                    <Link href={`${SITE_CONFIG.socials.whatsapp}`} color="brandGreen.500" fontWeight="bold">
                                        +{SITE_CONFIG.whatsappNumber}
                                    </Link>
                                </VStack>
                            </VStack>
                        </VStack>

                        <MiniFooter focus="terms" />

                    </Reveal>
                </Container>
            </Box>
        </Box>
    );
}
