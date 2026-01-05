import {Box, Container, Heading, Text, SimpleGrid, Avatar} from "@chakra-ui/react";
import {Reveal} from "../utils/Reveal";

const testimonials = [
    {
        name: "Alex Johnson",
        role: "CEO, TechWave",
        content: "PasCodes delivered our platform ahead of schedule. The code quality and attention to detail were exceptional.",
    },
    {
        name: "Sarah Martinez",
        role: "Founder, Designify",
        content: "The UI/UX work was exactly what we needed. Responsive, beautiful, and performant. Highly recommended!",
    },
    {
        name: "Michael Chen",
        role: "CTO, DataFlow Systems",
        content: "Working with PasCodes on our data analytics dashboard was seamless. Expert-level React and cloud integration.",
    },
    {
        name: "Emily Rodriguez",
        role: "Product Manager, StartupHub",
        content: "From web to mobile, PasCodes handled our cross-platform needs perfectly. Great communication throughout.",
    },
    {
        name: "David Park",
        role: "Blockchain Entrepreneur",
        content: "Built our Web3 marketplace with cutting-edge tech. Solid understanding of crypto and smart contracts.",
    },
    {
        name: "Lisa Thompson",
        role: "Director, SecureOps",
        content: "Security-first approach impressed us. PasCodes helped us build a compliant, robust cybersecurity platform.",
    },
];

export default function TestimonialSection () {
    return (
        <Box p={{base: 12, md: 20}} bg="foregound">
            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={99}>
                <Reveal>
                    <Heading
                        fontSize={{base: "3xl", md: "4xl"}}
                        color="foreground"
                        mb={12}
                        textAlign="center"
                        fontWeight="bold"
                        className="neon-text"
                    >
                        Client Stories
                    </Heading>
                </Reveal>
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8}>
                    {testimonials.map((t, i) => (
                        <Reveal key={i} delay={0.15 * i}>
                            <Box
                                p={8}
                                borderRadius="xl"
                                transition="all 0.4s ease"
                                className="glass-panel hover-lift"
                                height="full"
                            >
                                <Text color="gray.200" mb={6} fontSize="md" fontStyle="italic" lineHeight="tall">
                                    &quot;{t.content}&quot;
                                </Text>
                                <Box display="flex" alignItems="center" gap={4}>
                                    <Avatar.Root size="md" bg="brandGreen.500">
                                        <Avatar.Fallback name={t.name} />
                                    </Avatar.Root>
                                    <Box>
                                        <Text color="foreground" fontWeight="bold">{t.name}</Text>
                                        <Text color="gray.400" fontSize="sm">{t.role}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Reveal>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
