import {Box, Container, Heading, Text, SimpleGrid, Avatar, VStack, Link} from "@chakra-ui/react";
import {Reveal} from "../utils/Reveal";
import {FaQuoteLeft, FaExternalLinkAlt, FaArrowRight} from "react-icons/fa";

const testimonials = [
    {
        name: "Alex Johnson",
        role: "CEO, TechWave",
        content: "PoshCodes delivered our platform ahead of schedule. The code quality and attention to detail were exceptional.",
        link: "https://example.com",
    },
    {
        name: "Sarah Martinez",
        role: "Founder, Designify",
        content: "The UI/UX work was exactly what we needed. Responsive, beautiful, and performant. Highly recommended!",
    },
    {
        name: "Michael Chen",
        role: "CTO, DataFlow Systems",
        content: "Working with PoshCodes on our data analytics dashboard was seamless. Expert-level React and cloud integration.",
        link: "https://example.com",
    },
    {
        name: "Emily Rodriguez",
        role: "Product Manager, StartupHub",
        content: "From web to mobile, PoshCodes handled our cross-platform needs perfectly. Great communication throughout.",
    },
    {
        name: "David Park",
        role: "Blockchain Entrepreneur",
        content: "Built our Web3 marketplace with cutting-edge tech. Solid understanding of crypto and smart contracts.",
        link: "https://example.com",
    },
    {
        name: "Lisa Thompson",
        role: "Director, SecureOps",
        content: "Security-first approach impressed us. PoshCodes helped us build a compliant, robust cybersecurity platform.",
    },
];

export default function TestimonialSection ({page}: {page?: string;}) {
    return (
        <Box py={{base: 20, md: 32}} bg="black" position="relative" overflow="hidden" id='testimonial-section'>
            <Box
                width={'600px'}
                height={'600px'}
                bgGradient="to-tr"
                gradientFrom={'orange.400/30'}
                gradientVia={'purple.500/40'}
                gradientTo={'darkcyan/35'}
                position='absolute'
                top={-200}
                left={-200}
                opacity={0.24}
                filter={'blur(60px)'}
                zIndex={0}
                rotate={'-40'}
            />

            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={11} position="relative">
                <Reveal width="100%">
                    <VStack mb={20} gap={6} textAlign="center" maxW="3xl" mx="auto">
                        <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                            Trust & Commitment
                        </Text>
                        <Heading
                            fontSize={{base: "3xl", md: "5xl"}}
                            color="white"
                            fontWeight="bold"
                            lineHeight="shorter"
                            px={2}
                            fontFamily='PoppinsSemi'
                        >
                            Building <Text as="span" color="brandGreen.500" className="neon-text" fontSize={{base: "3xl", md: "5xl"}}
                                fontFamily='PoppinsSemi'>Relationships</Text>, Not Just Code.
                        </Heading>
                        <Text color="gray.400" fontSize="lg" lineHeight="tall" px={2}>
                            We don&apos;t just deliver projects; we build long-term partnerships rooted in transparency, quality, and mutual growth.
                            Our clients&apos; success is our ultimate benchmark.
                        </Text>

                        {
                            page !== 'service' &&
                            <Link
                                as="a"
                                href="/services"
                                variant="plain"
                                color="brandGreen.500"
                                _hover={{color: "brandGreen.300", transform: "translateX(5px)", textDecoration: 'underline'}}
                                transition="all 0.3s"
                                fontSize="md"
                                fontWeight="bold"
                                gap={2}
                                display="inline-flex"
                                alignItems="center"
                            >
                                Explore Our Services
                                <FaArrowRight />
                            </Link>
                        }
                    </VStack>
                </Reveal>

                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8} p={4} zIndex={2}>
                    {testimonials.map((t, i) => (
                        <Reveal key={i} delay={0.1 * i}>
                            <Box
                                p={8}
                                borderRadius="2xl"
                                bg="whiteAlpha.50"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                                transition="all 0.4s ease"
                                className="hover-lift"
                                height="full"
                                position="relative"
                                _hover={{
                                    borderColor: "brandGreen.500",
                                    bg: "whiteAlpha.100",
                                    transform: "translateY(-8px)"
                                }}
                                onClick={() => t.link && window.open(t.link, "_blank")}
                                cursor={t.link ? "pointer" : "default"}
                                role="group"
                            >
                                <Box color="brandGreen.500" mb={6} opacity={0.5}>
                                    <FaQuoteLeft size={24} />
                                </Box>

                                <Text color="gray.300" mb={8} fontSize="md" lineHeight="relaxed">
                                    {t.content}
                                </Text>

                                <Box display="flex" alignItems="center" gap={4} mt="auto">
                                    <Avatar.Root size="md" bg="brandGreen.600">
                                        <Avatar.Fallback name={t.name} color="white" fontWeight="bold" />
                                    </Avatar.Root>
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="md">{t.name}</Text>
                                        <Text color="brandGreen.400" fontSize="sm">{t.role}</Text>
                                    </Box>
                                    {t.link && (
                                        <Box ml="auto" opacity={0} _groupHover={{opacity: 1}} transition="opacity 0.3s" color="gray.400">
                                            <FaExternalLinkAlt size={14} />
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Reveal>
                    ))}
                </SimpleGrid>
            </Container>
        </Box >
    );
}
