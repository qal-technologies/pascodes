import {Box, Button, Container, Heading, SimpleGrid, Text, Badge, HStack, Progress} from "@chakra-ui/react";
import {useState} from "react";
import WaitlistModal from "../ui/WaitlistModal";
import {FaReact, FaJs, FaHtml5, FaCss3, FaNodeJs, FaVideo, FaClock, FaUserGraduate, FaCalendarAlt} from "react-icons/fa";
import {SiNextdotjs, SiTypescript} from "react-icons/si";

// Mock data - eventually from Admin
const courseData = {
    title: "Master Modern Web Development",
    description: "From Zero to Full Stack Hero. Learn React, Next.js, TypeScript and more in this comprehensive course designed for 2026. comprehensive curriculum covering the latest tech stack.",
    status: "Recording in Progress",
    progress: 65,
    launchDate: "March 2026",
    duration: "40+ Hours",
    audience: "Beginner to Intermediate",
    languages: ["React", "Next.js", "TypeScript", "JavaScript", "Node.js"],
};

const iconMap: Record<string, React.ComponentType<{size: number;}>> = {
    "React": FaReact,
    "Next.js": SiNextdotjs,
    "TypeScript": SiTypescript,
    "JavaScript": FaJs,
    "Node.js": FaNodeJs,
    "HTML": FaHtml5,
    "CSS": FaCss3,
};

export default function CourseSection () {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    return (
        <Box py={40} bg="black" position="relative" overflow="hidden" id='course-section'>
            <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                title="Join Course Waitlist"
                source="course_section"
            />
            <Box
                width={'500px'}
                height={'500px'}
                bgGradient="to-tl"
                gradientFrom={'brandGreen.500/30'}
                gradientTo={'transparent'}
                position='absolute'
                top={-100}
                left={-100}
                opacity={0.3}
                filter={'blur(50px)'}
                zIndex={0}
            />

            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={9} position="relative">
                <Box mb={16} textAlign="center">
                    <Heading
                        color="white"
                        fontFamily="PoppinsSemi"
                        maxW="4xl"
                        textAlign={'center'}
                        mb={6}
                        fontWeight="bold"
                        fontSize={{base: "3xl", md: "5xl"}}
                    >
                        Learn with <Text as="span" color="brandGreen.500" className="neon-text"
                            fontSize={{base: "3xl", md: "5xl"}}
                            fontFamily='PoppinsSemi'>PasCodez</Text>
                    </Heading>
                    <Text color="gray.400" fontSize="lg">
                        Elevate your skills with premium, industry-standard courses.
                    </Text>
                </Box>

                <Box
                    bg="gray.900"
                    borderRadius="3xl"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    width="90%"
                    maxW="5xl"
                    position="relative"
                    boxShadow="2xl"
                >
                    <SimpleGrid columns={{base: 1, lg: 2}} gap={0}>
                        {/* Left Side: Visual/Cover */}
                        <Box
                            minH={{base: '300px', lg: "auto"}}
                            bg="gray.800"
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            overflow="hidden"
                        >
                            <Box
                                position="absolute"
                                inset={0}
                                bgGradient="to-br"
                                gradientFrom="brandGreen.900"
                                gradientTo="black"
                                opacity={0.8}
                                zIndex={1}
                            />
                            {/* Decorative Background Icons */}
                            <Box position="absolute" inset={0} opacity={0.1} zIndex={0}>
                                <SimpleGrid columns={5} gap={4} p={4} flexWrap='wrap'>
                                    {Array(60).fill(0).map((_, i) => (
                                        <Box key={i} bg="white" w={i + 0.2 + 0.8 * i} h={i * 1.5 + 10 / i % 5} borderRadius="full" style={{transform: `rotate(${-i * 2.9 / (i || 1) - 2}deg)`}} opacity={i - 0.5 + 1.5} />
                                    ))}
                                </SimpleGrid>
                            </Box>

                            <Box zIndex={2} textAlign="center" p={8}>
                                <Box
                                    bg="blackAlpha.600"
                                    backdropFilter="blur(10px)"
                                    p={6}
                                    borderRadius="2xl"
                                    border="1px solid"
                                    borderColor="brandGreen.500/50"
                                >
                                    <Heading size="2xl" color="white" mb={2}>JS</Heading>
                                    <Heading size="2xl" color="brandGreen.400">Mastery</Heading>
                                </Box>
                            </Box>
                        </Box>

                        {/* Right Side: Content */}
                        <Box p={{base: 8, md: 12}} display="flex" flexDirection="column" justifyContent="center">
                            <HStack mb={6} gap={4} wrap="wrap">
                                <Badge
                                    colorPalette="green"
                                    variant="solid"
                                    size="lg"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    Coming Soon
                                </Badge>
                                <Badge
                                    colorPalette="blue"
                                    variant="subtle"
                                    size="lg"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    <HStack gap={2}>
                                        <FaVideo /> {courseData.status}
                                    </HStack>
                                </Badge>
                            </HStack>

                            <Heading size="2xl" color="white" mb={4} lineHeight="short">
                                {courseData.title}
                            </Heading>

                            <Text color="gray.400" mb={8} fontSize="lg" lineHeight="tall">
                                {courseData.description}
                            </Text>

                            {/* Details Grid */}
                            <SimpleGrid columns={{sm: 1, base: 2}} gap={6} mb={8}>
                                <Box>
                                    <HStack color="brandGreen.400" mb={1}><FaClock /> <Text fontWeight="bold">Duration</Text></HStack>
                                    <Text color="gray.300">{courseData.duration}</Text>
                                </Box>
                                <Box>
                                    <HStack color="brandGreen.400" mb={1}><FaUserGraduate /> <Text fontWeight="bold">Level</Text></HStack>
                                    <Text color="gray.300">{courseData.audience}</Text>
                                </Box>
                                <Box>
                                    <HStack color="brandGreen.400" mb={1}><FaCalendarAlt /> <Text fontWeight="bold">Launch</Text></HStack>
                                    <Text color="gray.300">{courseData.launchDate}</Text>
                                </Box>
                                <Box>
                                    <HStack color="brandGreen.400" mb={1}><FaVideo /> <Text fontWeight="bold">Progress</Text></HStack>
                                    <Progress.Root value={courseData.progress} width="100%"  size="sm" mt={1}>
                                        <Progress.Track bg="gray.600" borderRadius={'md'}>
                                            <Progress.Range borderRadius={'md'} colorPalette="brandGreen.500" bgColor={'brandGreen.400'} />
                                        </Progress.Track>
                                    </Progress.Root>
                                    <Text fontSize="xs" color="gray.500" mt={1}>{courseData.progress}% recorded</Text>
                                </Box>
                            </SimpleGrid>

                            {/* Tech Stack */}
                            <Box mb={10}>
                                <Text fontWeight="bold" color="white" mb={3} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Tech Stack</Text>
                                <HStack gap={3} wrap="wrap">
                                    {courseData.languages.map(lang => {
                                        const IconComp = iconMap[lang];
                                        return (
                                            <Box
                                                key={lang}
                                                p={2}
                                                bg="gray.800"
                                                borderRadius="lg"
                                                color="gray.300"
                                                title={lang}
                                                _hover={{color: "brandGreen.400", bg: "gray.700", transform: "scale(1.1)"}}
                                                transition="all 0.2s"
                                            >
                                                {IconComp ? <IconComp size={24} /> : <Text fontSize="xs" fontWeight="bold">{lang}</Text>}
                                            </Box>
                                        );
                                    })}
                                </HStack>
                            </Box>

                            <Button
                                size="xl"
                                colorPalette="green"
                                bg="brandGreen.500"
                                color="black"
                                _hover={{bg: "brandGreen.400", transform: "translateY(-2px)", boxShadow: "0 0 20px rgba(0, 255, 128, 0.4)"}}
                                onClick={() => setIsWaitlistOpen(true)}
                                borderRadius="xl"
                                fontWeight="bold"
                                fontSize="lg"
                                width="full"
                            >
                                Get Early Access &rarr;
                            </Button>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Container>


            <Box
                width={'250px'}
                height={'30vh'}
                bgGradient="to-br"
                gradientFrom={'brandGreen.500'}
                gradientTo={'brandNavy.500'}
                position='absolute'
                bottom={-30}
                right={-12}
                opacity={.6}
                filter={'blur(10px) brightness(105%)'}
                rotate={'25deg'}
            />
        </Box>
    );
}
