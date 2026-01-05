import {Box, Button, Container, Heading, SimpleGrid, Text, Badge} from "@chakra-ui/react";

export default function CourseSection () {
    return (
        <Box py={20} bg="black">
            <Container maxW="container.xl">
                <Heading
                    color="white"
                    mb={12}
                    textAlign="center"
                    fontFamily="PoppinsSemi"
                >
                    Learn with <Text as="span" color="brandGreen.500">PasCodes</Text>
                </Heading>

                <Box
                    bg="gray.900"
                    borderRadius="2xl"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    maxW="4xl"
                    mx="auto"
                >
                    <SimpleGrid columns={{base: 1, md: 2}} gap={0}>
                        <Box h="300px" bg="gray.800" position="relative">
                            {/* Placeholder for Course Image */}
                            <Box
                                position="absolute"
                                inset={0}
                                bgGradient="to-br"
                                gradientFrom="brandGreen.900"
                                gradientTo="black"
                                opacity={0.6}
                            />
                            <Text
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                color="whiteAlpha.500"
                                fontWeight="bold"
                            >
                                Course Cover
                            </Text>
                        </Box>
                        <Box p={10} display="flex" flexDirection="column" justifyContent="center">
                            <Badge colorPalette="green" mb={4} alignSelf="start">Coming Soon</Badge>
                            <Heading size="lg" color="white" mb={4}>Master Modern Web Development</Heading>
                            <Text color="gray.400" mb={6}>
                                From Zero to Full Stack Hero. Learn React, Next.js, TypeScript and more in this comprehensive course designed for 2026.
                            </Text>
                            <Button
                                variant="outline"
                                borderColor="brandGreen.500"
                                color="brandGreen.500"
                                _hover={{bg: "brandGreen.500", color: "black"}}
                                size="lg"
                            >
                                Join Waitlist
                            </Button>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    );
}
