import {Box, Button, Container, Heading, SimpleGrid, Text, VStack, HStack, IconButton, Portal} from "@chakra-ui/react";
import {FaHandshake, FaProjectDiagram, FaWhatsapp, FaEnvelope, FaTimes} from "react-icons/fa";
import {Reveal} from "../utils/Reveal";
import {useState} from "react";
import {SITE_CONFIG} from "@/lib/site-config";

export default function PartnershipSection () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactType, setContactType] = useState<"partnership" | "collaboration">("partnership");

    const handleOpenModal = (type: "partnership" | "collaboration") => {
        setContactType(type);
        setIsModalOpen(true);
    };

    const handleContact = (method: "email" | "whatsapp") => {
        const subject = contactType === "partnership" ? "Partnership Inquiry" : "Collaboration Request";
        const body = contactType === "partnership"
            ? "Hi PasCodez, I represent [Company/Agency] and we are interested in a partnership..."
            : "Hi PasCodez, I am a developer/creator and I would like to collaborate on...";

        if(method === "email") {
            window.open(`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        } else {
            window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(body)}`);
        }
        setIsModalOpen(false);
    };

    return (
        <Box py={{base: 20, md: 40}} px={{base: 6, md: 12}} bg="background" >
            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={99}>
                <Box
                    width={'60vw'}
                    height={'40vh'}
                    maxW={'300px'}
                    maxH='400px'
                    background={'brandGreen.500'}
                    position='absolute'
                    top={-12}
                    left={-20}
                    opacity={.3}
                    filter={'blur(160px)'}
                    borderRadius={'50%'}
                />

                <SimpleGrid columns={{base: 1, md: 2}} gap={10}>
                    <Reveal delay={0.2} glow>
                        <VStack
                            p={10}
                            borderRadius="2xl"
                            align="start"
                            borderLeft="10px solid"
                            borderColor="brandGreen.500"
                            transition="all 0.4s ease"
                            className="glass-panel hover-lift"
                        >
                            <Box color="brandGreen.500" fontSize="6xl" mb={2} className="neon-text">
                                <FaHandshake size={'60px'} />
                            </Box>
                            <Heading color="foreground" mb={2} size="xl" fontWeight="bold" fontSize={{base: 20, md: 25}}>
                                Partnerships
                            </Heading>
                            <Text color="gray.200" mb={6} fontSize="md">
                                Looking for a technical partner? I collaborate with agencies, startups, and designers to bring complex visions to life. Let&apos;s build something greater together.
                            </Text>
                            <Button
                                variant="plain"
                                color="brandGreen.500"
                                _hover={{transform: "translateX(5px)", fontWeight: 'bold', bg: 'brandGreen.500', color: 'black'}}
                                className="hover-lift"
                                borderColor="brandGreen.500"
                                colorPalette={'brandGreen.400'}
                                size="lg"
                                border='2px solid '
                                paddingInline={10}
                                borderRadius='12px'
                                fontFamily="PoppinsSemi"
                                maxW={'100%'}
                                onClick={() => handleOpenModal("partnership")}
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
                            borderLeft="10px solid"
                            borderColor="primary"
                            transition="all 0.4s ease"
                            className="glass-panel hover-lift"
                        >
                            <Box color="primary" fontSize="6xl" mb={2}>
                                <FaProjectDiagram size={'60px'} />
                            </Box>
                            <Heading color="foreground" mb={2} size="xl" fontWeight="bold" fontSize={{base: 20, md: 25}}>
                                Collaborations
                            </Heading>
                            <Text color="gray.200" mb={6} fontSize="md">
                                Open source contributor? Fellow developer? I&apos;m always open to interesting side projects and community initiatives.
                            </Text>
                            <Button
                                variant="plain"
                                color="primary"
                                className="hover-lift"
                                _hover={{transform: "translateX(5px)", fontWeight: 'bold', bg: "primary", color: 'black'}}
                                borderColor="primary"
                                colorPalette={'primary'}
                                size="lg"
                                border='2px solid '
                                paddingInline={10}
                                borderRadius='12px'
                                fontFamily="PoppinsSemi"
                                maxW={'100%'}
                                onClick={() => handleOpenModal("collaboration")}
                            >
                                Let&apos;s Collab &rarr;
                            </Button>
                        </VStack>
                    </Reveal>
                </SimpleGrid>

                <Box
                    width={'66%'}
                    height={'50%'}
                    maxW={'300px'}
                    maxH='400px'
                    background={'primary'}
                    position='absolute'
                    bottom={-20}
                    right={-10}
                    opacity={.35}
                    filter={'blur(120px)'}
                    borderRadius={'50%'}
                />
            </Container>

            {/* Modal Overlay */}
            {isModalOpen && (
                <Portal>
                    <Box
                        position="fixed"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        width="100vw"
                        height="100vh"
                        inset={0}
                        bg="blackAlpha.800/30"
                        backdropFilter="blur(20px)"
                        zIndex={9999}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflowY="auto"
                        p={4}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <Box
                            bg="blackAlpha.900"
                            p={8}
                            borderRadius="2xl"
                            maxW="400px"
                            w="full"
                            onClick={(e) => e.stopPropagation()}
                            border="1px solid"
                            borderColor="brandGreen.500"
                            position="relative"
                            m="auto"
                            className="neon-glow-accent"
                        >
                            <IconButton
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close modal"
                                size="sm"
                                variant="ghost"
                                position="absolute"
                                top={4}
                                right={4}
                                color="brandGreen.500"
                            >
                                <FaTimes />
                            </IconButton>


                            <Heading size="lg" fontSize={20} color="white" mb={1} textAlign="center" fontWeight={'bolder'} fontFamily={'PoppinsSemi'}>
                                {contactType === "partnership" ? "Partnership" : "Collaboration"}
                            </Heading>
                            <Text color="gray.400" textAlign="center" fontSize={16} mb={6}>
                                Choose your preferred way to connect
                            </Text>

                            <HStack gap={5} width="100%" wrap={'wrap'} align='center'
                                alignItems='center'
                                justifyContent='center'>
                                <Button
                                    size="lg"
                                    borderRadius='full'
                                    fontFamily={'PoppinsSemi'}
                                    color='black'
                                    colorPalette="brandGreen.500"
                                    onClick={() => handleContact("whatsapp")}
                                    gap={10}
                                    _hover={{bg: 'brandGreen.500'}}
                                >
                                    <FaWhatsapp/>
                                </Button>
                                <Button
                                    size="lg"
                                    borderRadius='full'
                                    color='black'
                                    colorPalette="brandGreen.500"
                                    fontFamily={'PoppinsSemi'}
                                    gap={10}
                                    onClick={() => handleContact("email")}
                                    _hover={{bg:'brandGreen.500'}}
                                >
                                    <FaEnvelope/>
                                </Button>
                            </HStack>
                        </Box>
                    </Box>
                </Portal>
            )}
        </Box>
    );
};
