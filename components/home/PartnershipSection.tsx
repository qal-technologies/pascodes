import {Box, Button, Container, Heading, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {FaHandshake, FaProjectDiagram} from "react-icons/fa";
import {Reveal} from "../utils/Reveal";

export default function PartnershipSection () {
    return (
        <Box py={{base: 16, md: 20}} px={{base: 6, md: 12}} bg="background">
            <Container maxW="container.xl">
                <SimpleGrid columns={{base: 1, md: 2}} gap={10}>
                    <Reveal delay={0.2} glow>
                        <VStack
                            p={10}
                            borderRadius="2xl"
                            align="start"
                            borderLeft="4px solid"
                            borderColor="brandGreen.500"
                            transition="all 0.4s ease"
                            className="glass-panel hover-lift"
                        >
                            <Box color="brandGreen.500" fontSize="6xl" mb={4} className="neon-text">
                                <FaHandshake />
                            </Box>
                            <Heading color="foreground" mb={4} size="lg" fontWeight="bold">
                                Partnerships
                            </Heading>
                            <Text color="gray.200" mb={6} fontSize="md">
                                Looking for a technical partner? I collaborate with agencies, startups, and designers to bring complex visions to life. Let&apos;s build something greater together.
                            </Text>
                            <Button
                                variant="plain"
                                color="brandGreen.500"
                                _hover={{color: "brandGreen.400", transform: "translateX(5px)"}}
                                className="hover-lift"
                            >
                                Let&apos;s Partner Up &rarr;
                            </Button>
                        </VStack>
                    </Reveal>

                    <Reveal delay={0.4} glow>
                        <VStack
                            p={10}
                            borderRadius="2xl"
                            align="start"
                            borderLeft="4px solid"
                            borderColor="primary"
                            transition="all 0.4s ease"
                            className="glass-panel hover-lift"
                        >
                            <Box color="primary" fontSize="6xl" mb={4}>
                                <FaProjectDiagram />
                            </Box>
                            <Heading color="foreground" mb={4} size="lg" fontWeight="bold">
                                Collaborations
                            </Heading>
                            <Text color="gray.200" mb={6} fontSize="md">
                                Open source contributor? Fellow developer? I&apos;m always open to interesting side projects and community initiatives.
                            </Text>
                            <Button
                                variant="plain"
                                color="primary"
                                _hover={{color: "brandNavy.400", transform: "translateX(5px)"}}
                                className="hover-lift"
                            >
                                Start a Conversation &rarr;
                            </Button>
                        </VStack>
                    </Reveal>
                </SimpleGrid>
            </Container>
        </Box>
    );
};
