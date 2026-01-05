import {Box, SimpleGrid, Text, VStack, Container} from "@chakra-ui/react";
import {FaReact, FaNodeJs, FaPython, FaDatabase, FaAws, FaMobile} from "react-icons/fa";
import {SiTypescript, SiTailwindcss, SiFirebase} from "react-icons/si";
import {Reveal} from "../utils/Reveal";

const skills = [
    {name: "React / Next.js", icon: FaReact, color: "#61DAFB"},
    {name: "React Native", icon: FaMobile, color: "#61DAFB"},
    {name: "TypeScript", icon: SiTypescript, color: "#3178C6"},
    {name: "Node.js", icon: FaNodeJs, color: "#339933"},
    {name: "Python", icon: FaPython, color: "#3776AB"},
    {name: "Database Design", icon: FaDatabase, color: "#fff"},
    {name: "Cloud (AWS)", icon: FaAws, color: "#FF9900"},
    {name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4"},
    {name: "Firebase", icon: SiFirebase, color: "#FFCA28"},
];

export default function SkillsSection () {
    return (
        <Box py={{base: 16, md: 20}} px={{base: 6, md: 12}} bg="background">
            <Container maxW="container.xl">
                <VStack gap={4} mb={12} textAlign="center">
                    <Text
                        fontSize={{base: "3xl", md: "4xl"}}
                        fontWeight="bold"
                        color="brandGreen.500"
                        fontFamily="PoppinsSemi"
                        className="neon-text"
                    >
                        My Tech Stack
                    </Text>
                    <Text fontSize={{base: "md", md: "lg"}} color="gray.200" maxW="2xl">
                        Crafting high-performance, scalable solutions across web, mobile, and cloud platforms using cutting-edge technologies.
                    </Text>
                </VStack>
                <SimpleGrid columns={{base: 2, sm: 3, md: 4}} gap={10}>
                    {skills.map((skill, index) => (
                        <Reveal key={skill.name} delay={0.1 * index} glow>
                            <VStack
                                bg="whiteAlpha.50"
                                p={6}
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                    bg: "whiteAlpha.100",
                                    transform: "translateY(-10px)",
                                    borderColor: skill.color,
                                    boxShadow: `0 10px 30px ${skill.color}30`,
                                }}
                                className="group hover-lift"
                            >
                                <Box
                                    as={skill.icon}
                                    size="40px"
                                    color={skill.color}
                                    mb={2}
                                    transition="transform 0.5s ease"
                                    _groupHover={{transform: "scale(1.2) rotate(10deg)"}}
                                />
                                <Text color="gray.200" fontWeight="medium" fontSize="sm" textAlign={'center'}>
                                    {skill.name}
                                </Text>
                            </VStack>
                        </Reveal>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
