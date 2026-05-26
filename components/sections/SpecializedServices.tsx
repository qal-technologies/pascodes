"use client";

import {Box, Container, Heading, SimpleGrid, Text, VStack, HStack, Button} from "@chakra-ui/react";
import {FaEthereum, FaRobot, FaSearch, FaCogs, FaArrowRight, } from "react-icons/fa";
import {Reveal} from "../utils/Reveal";
import {SITE_CONFIG} from "@/lib/site-config";

const serviceDetails = [
    {
        title: "Web3 & Blockchain",
        icon: FaEthereum,
        description: "Decentralized applications (dApps), smart contract development, and NFT marketplace integration. We build secure, transparent, and scalable blockchain solutions.",
        features: ["Smart Contract Audits", "DeFi Protocols", "Tokenomics Design"],
        color: "purple.400"
    },
    {
        title: "AI & Machine Learning",
        icon: FaRobot,
        description: "Integrating intelligent algorithms into your workflow. From chatbot automation to predictive analytics, we make your apps smarter and more efficient.",
        features: ["NLP Integration", "Custom AI Models", "Data Insights"],
        color: "blue.400"
    },
    {
        title: "SEO & Growth",
        icon: FaSearch,
        description: "Technical SEO audits, keyword optimization, and high-performance page builds. We ensure your project doesn't just look good, but also ranks high.",
        features: ["Speed Optimization", "Content Strategy", "Advanced Analytics"],
        color: "brandGreen.600"
    }
];

export default function SpecializedServices () {
    return (
        <Box py={20} bg="black" p={10}>
            <Container maxW="container.xl">
                <Box
                    width={'30vw'}
                    height={'10vh'}
                    background={'orange'}
                    position='absolute'
                    top={-32}
                    right={-11}
                    opacity={.55}
                    filter={'blur(100px) brightness(110%)'}
                    rotate={'40deg'}
                    borderRadius={'50%'}
                />

                <Box
                    width={'30vw'}
                    height={'10vh'}
                    background={'blue'}
                    position='absolute'
                    top={-22}
                    left={-22}
                    opacity={.65}
                    filter={'blur(100px) brightness(110%)'}
                    rotate={'40deg'}
                    borderRadius={'50%'}
                />

                <VStack gap={16} align="stretch" mt={40}>
                    <Box textAlign="center">
                        <Reveal>
                            <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb={2}>
                                Advanced Solutions
                            </Text>
                            <Heading size="2xl" fontFamily="PoppinsBold" color="white" mb={4} fontSize={{base: '3xl', md: '4xl'}}>
                                Specialized Expertise
                            </Heading>
                            <Text color="gray.400" maxW="2xl" mx="auto">
                                Beyond standard web and mobile development, we offer cutting-edge tech integration to keep you ahead of the digital curve.
                            </Text>
                        </Reveal>
                    </Box>

                    <SimpleGrid columns={{base: 1, md: 3}} gap={10}>
                        {serviceDetails.map((service, index) => (
                            <Reveal key={index} delay={index * 0.2}>
                                <VStack
                                    p={8}
                                    bg="whiteAlpha.50"
                                    borderRadius="3xl"
                                    border="1px solid"
                                    borderColor="whiteAlpha.100"
                                    align="start"
                                    gap={6}
                                    transition="all 0.3s"
                                    _hover={{borderColor: service.color, transform: "scale(1.02)"}}
                                    height="full"
                                >
                                    <Box p={3} bg={`${service.color}/10`} borderRadius="xl" color={service.color}>
                                        <service.icon size={30} />
                                    </Box>

                                    <VStack align="start" gap={3}>
                                        <Heading size="md" color="white">{service.title}</Heading>
                                        <Text color="gray.400" fontSize="sm" lineHeight="relaxed">
                                            {service.description}
                                        </Text>
                                    </VStack>

                                    <VStack align="start" gap={2} w="100%" pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
                                        {service.features.map((feature, i) => (
                                            <HStack key={i} color="gray.500" fontSize="xs">
                                                <FaCogs />
                                                <Text>{feature}</Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </VStack>
                            </Reveal>
                        ))}
                    </SimpleGrid>
                    <Box minWidth='full' alignItems='center' justifyContent='center' p={'10px'} mt={8} display='flex'>
                        <Button
                            size="lg"
                            bgColor='brandGreen.500'
                            color='black'
                            borderRadius='full'
                            p={'10px'}
                            px={'20px'}
                            gap={2}
                            w='full'
                            maxW="300px"
                            onClick={() => window.open(SITE_CONFIG.socials.whatsapp)}
                            alignSelf='center'
                            className='hover-lift'
                            transition='all .2s ease-in-out'
                            boxShadow='lg'
                            shadowColor={'brandGreen.500'}
                        >
                            Contact Us <FaArrowRight />
                        </Button>
                    </Box>
                </VStack>
            </Container>
        </Box >
    );
}
