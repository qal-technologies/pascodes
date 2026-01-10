"use client";

import {Box, Button, Heading, Input, Text, VStack, IconButton} from "@chakra-ui/react";
import {useState} from "react";
import {FaTimes, FaEnvelope, FaUser} from "react-icons/fa";
import {db} from "@/lib/firebase";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {toaster} from "./toaster";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    source?: string;
}

export default function WaitlistModal ({isOpen, onClose, title = "Join the Waitlist", source = "general"}: WaitlistModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if(!name || !email) {
            toaster.create({
                title: "Missing fields",
                description: "Please fill in both name and email.",
                type: "warning",
                duration: 3000,
            });
            return;
        }

        setIsLoading(true);
        try {
            await addDoc(collection(db, "waitlist"), {
                name,
                email,
                source,
                createdAt: serverTimestamp(),
            });

            toaster.create({
                title: "Success!",
                description: "You've been added to the waitlist.",
                type: "success",
                duration: 5000,
            });
            onClose();
            setName("");
            setEmail("");
        } catch(error) {
            console.error("Error adding to waitlist:", error);
            toaster.create({
                title: "Error",
                description: "Something went wrong. Please try again.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if(!isOpen) return null;

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            width="100vw"
            height="100vh"
            inset={0}
            bg="blackAlpha.800/80"
            backdropFilter="blur(10px)"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
            onClick={onClose}
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
                className="neon-glow-accent"
            >
                <IconButton
                    onClick={onClose}
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

                <VStack gap={6} align="stretch">
                    <Box textAlign="center">
                        <Heading size="lg" mb={2} color="white">{title}</Heading>
                        <Text color="gray.400" fontSize="sm">
                            Be the first to know when we launch!
                        </Text>
                    </Box>

                    <VStack gap={4}>
                        <Box w="full" position="relative">
                            <Input
                                placeholder="Your Name"
                                pl={10}
                                bg="whiteAlpha.100"
                                border="none"
                                _focus={{bg: "whiteAlpha.200", boxShadow: "0 0 0 2px var(--chakra-colors-brandGreen-500)"}}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                color="white"
                                h="50px"
                                borderRadius="lg"
                            />
                            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500">
                                <FaUser />
                            </Box>
                        </Box>

                        <Box w="full" position="relative">
                            <Input
                                placeholder="Email Address"
                                type="email"
                                pl={10}
                                bg="whiteAlpha.100"
                                border="none"
                                _focus={{bg: "whiteAlpha.200", boxShadow: "0 0 0 2px var(--chakra-colors-brandGreen-500)"}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                color="white"
                                h="50px"
                                borderRadius="lg"
                            />
                            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500">
                                <FaEnvelope />
                            </Box>
                        </Box>
                    </VStack>

                    <Button
                        w="full"
                        size="lg"
                        colorPalette="green"
                        bg="brandGreen.500"
                        color="black"
                        _hover={{bg: "brandGreen.400", transform: "translateY(-2px)"}}
                        onClick={handleSubmit}
                        loading={isLoading}
                        loadingText="Joining..."
                        fontFamily="PoppinsSemi"
                        borderRadius="lg"
                    >
                        Join Waitlist
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
