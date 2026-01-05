import {Box, Button, Container, Heading, SimpleGrid, Text, Badge} from "@chakra-ui/react";

export default function CourseSection () {
    return (
        <Box py={40} bg="black">
            <Box
                width={'350px'}
                height={'34vh'}
                bgGradient="to-tl"
                gradientFrom={'brandGreen.500'}
                gradientTo={'yellow.400'}
                position='absolute'
                top={-30}
                left={-22}
                opacity={.26}
                filter={'blur(100px) brightness(105%)'}
                rotate={'125deg'}
            />

            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={9}>
                <Box>
                    <Heading
                        color="white"
                        textAlign="center"
                        fontFamily="PoppinsSemi"
                        maxW="4xl"
                        mb={12}
                        alignSelf='center'
                        justifySelf={'center'}
                        fontWeight="bold"
                        fontSize={{base: "3xl", md: "4xl"}}
                    >
                        Learn with <Text as="span" color="brandGreen.500" className="neon-text" fontSize={{base: "3xl", md: "4xl"}}>PasCodes</Text>
                    </Heading>
                    {/* <Text>Add </Text> */}
                </Box>

                <Box
                    bg="gray.900/90"
                    backdropFilter={'blur(20px)'}
                    borderRadius="2xl"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="whiteAlpha.100/90"
                    width='90%'
                    maxW="4xl"
                    mx="auto"
                >
                    <SimpleGrid columns={{base: 1, md: 2}} gap={0}>
                        <Box h={{base: '300px', md: "320px"}} bg="gray.800" position="relative">
                            {/* Placeholder for Course Image */}
                            <Box
                                position="absolute"
                                inset={0}
                                bgGradient="to-br"
                                gradientFrom="brandGreen.800"
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
                            <Badge colorPalette="green" mb={4} alignSelf="start" padding={1} px={2} borderRadius={10}>Coming Soon</Badge>
                            <Heading size="lg" color="white" mb={4}>Master Modern Web Development</Heading>
                            <Text color="gray.400" mb={8}>
                                From Zero to Full Stack Hero. Learn React, Next.js, TypeScript and more in this comprehensive course designed for 2026.
                            </Text>
                            <Button
                                variant="subtle"
                                borderColor="brandGreen.500"
                                color="brandGreen.500"
                                colorPalette={'brandGreen.500'}
                                _hover={{bg: "brandGreen.500", color: "black", fontWeight: 'bolder'}}
                                size="lg"
                                border='2px solid '
                                borderRadius='16px'
                                fontFamily="PoppinsSemi"
                            >
                                Join Waitlist
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
