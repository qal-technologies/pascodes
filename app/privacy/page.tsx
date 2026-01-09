import {Box, Container, Heading, Text, VStack, Link, Flex} from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {SITE_CONFIG} from "@/lib/site-config";
import {FooterLink, UnderLine} from "@/components/layout/Footer";

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for PasCodez platform."
};

export default function PrivacyPage () {

    return (
        <Box bg="background" minH="100vh">
            <Navbar />
            <Box pt={32} pb={20} px={10}>
                <Container maxW="container.md">
                    <Reveal>
                        <VStack align="start" gap={8}>
                            <Heading size="3xl" color="brandGreen.500" className="neon-text" fontFamily={'PoppinsSemi'} fontSize={22}>Privacy Policy</Heading>
                            <Text color="gray.400">Last Updated: January 2026</Text>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">1. Introduction</Heading>
                                <UnderLine />

                                <Text color="gray.300">
                                    Welcome to PasCodez. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">2. Data We Collect</Heading>
                                <UnderLine />

                                <Text color="gray.300">
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                                </Text>
                                <Text color="gray.300" ps={4}>
                                    • Identity Data: name, username.<br />
                                    • Contact Data: email address and phone numbers.<br />
                                    • Technical Data: IP address, browser type and version, time zone setting and location.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">3. How We Use Your Data</Heading>
                                <UnderLine />

                                <Text color="gray.300">
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide services to you, to manage our relationship with you, and to improve our website.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">4. Data Security</Heading>
                                <UnderLine />

                                <Text color="gray.300">
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                                </Text>
                            </VStack>

                            <VStack align="start" gap={4}>
                                <Heading size="lg" color="foreground">5. Contact Us</Heading>
                                <UnderLine />

                                <Text color="gray.300">
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

                        <MiniFooter focus="privacy" />
                    </Reveal>
                </Container>
            </Box>
        </Box>
    );
}

export function MiniFooter ({focus}: {focus: string;}) {
    const currentYear = new Date().getFullYear();

    const arrays = [
        {
            name: 'Privacy Policy',
            link: '/privacy',
            focus: 'privacy',
        },
        {
            name: 'Terms of Service',
            link: '/terms',
            focus: 'terms',
        }
    ];
    return (
        <Flex width='full' p={5} pt={10} borderTop={'1px solid gray'} wrap={'wrap'} gap={2} color={'gray.400'}>


            <Box w={'full'} gap={2} flexDirection={'row'} flexWrap={'wrap'} mb={2}>
                {
                    arrays.map(({link, name, focus: myFocus}, index) => {
                        return <FooterLink href={link as string} key={index} fontSize="xs" color={myFocus === focus as string ? 'brandGreen.500' : 'gray.400'}>
                            {name}
                        </FooterLink>;
                    })
                }
            </Box>

            <Text fontSize="sm">
                &copy; {currentYear} PasCodez.
            </Text>
        </Flex>
    );
}
