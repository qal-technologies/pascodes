"use client";

import {Box, Button, Container, Heading, Input, VStack, Text, Field} from "@chakra-ui/react";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase";
import {useRouter} from "next/navigation";
import {toaster} from "@/components/ui/toaster";
import {Reveal} from "@/components/utils/Reveal";
import {FaLock} from "react-icons/fa";

export default function AdminLoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toaster.create({
                title: "Welcome back!",
                description: "Successfully logged into Admin Dashboard.",
                type: "success"
            });
            router.push("/admin");
        } catch(error: unknown) {
            console.error("Login error:", error);
            const errorMessage = error instanceof Error ? error.message : "Invalid credentials.";
            toaster.create({
                title: "Login Failed",
                description: errorMessage,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="background"
            position="relative"
            overflow="hidden"
        >
            {/* Background Glows */}
            <Box
                position="absolute"
                top="-10%"
                right="-10%"
                w="400px"
                h="400px"
                bg="brandGreen.900"
                borderRadius="full"
                filter="blur(100px)"
                opacity={0.1}
            />
            <Box
                position="absolute"
                bottom="-10%"
                left="-10%"
                w="400px"
                h="400px"
                bg="brandNavy.900"
                borderRadius="full"
                filter="blur(100px)"
                opacity={0.1}
            />

            <Container maxW="md">
                <Reveal glow>
                    <Box
                        p={10}
                        borderRadius="3xl"
                        className="glass-panel"
                        textAlign="center"
                    >
                        <VStack gap={8}>
                            <Box
                                p={4}
                                bg="brandGreen.500"
                                borderRadius="2xl"
                                color="black"
                                className="neon-glow-accent"
                            >
                                <FaLock size={24} />
                            </Box>

                            <Box>
                                <Heading size="2xl" mb={2} color="foreground">Admin <Text as="span" color="brandGreen.500" className="neon-text">Access</Text></Heading>
                                <Text color="gray.400" fontSize="sm">Please enter your credentials to continue</Text>
                            </Box>

                            <VStack as="form" onSubmit={handleLogin} gap={5} w="full">
                                <Button
                                    type="button"
                                    colorPalette="blue"
                                    bg="white"
                                    color="gray.800"
                                    size="lg"
                                    w="full"
                                    className="hover-lift"
                                    onClick={async () => {
                                        setLoading(true);
                                        try {
                                            const {GoogleAuthProvider, signInWithPopup} = await import("firebase/auth");
                                            const provider = new GoogleAuthProvider();
                                            await signInWithPopup(auth, provider);
                                            toaster.create({
                                                title: "Welcome back!",
                                                description: "Successfully logged into Admin Dashboard via Google.",
                                                type: "success"
                                            });
                                            router.push("/admin");
                                        } catch(error: any) {
                                            console.error("Google Login error:", error);
                                            toaster.create({
                                                title: "Login Failed",
                                                description: error.message || "Failed to sign in with Google.",
                                                type: "error"
                                            });
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                >
                                    <Box as="span" mr={2} fontWeight="bold" color="blue.500">G</Box> Sign in with Google
                                </Button>

                                <Box position="relative" w="full" py={2}>
                                    <Text fontSize="sm" color="gray.500" bg="background" px={2} position="relative" zIndex={1}>
                                        Or continue with email
                                    </Text>
                                    <Box position="absolute" top="50%" left={0} w="full" h="1px" bg="whiteAlpha.200" />
                                </Box>

                                <Field.Root>
                                    <Input
                                        placeholder="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        bg="blackAlpha.200"
                                        border="1px solid"
                                        borderColor="border"
                                        size="lg"
                                        required
                                        _focus={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500}"}}
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        bg="blackAlpha.200"
                                        border="1px solid"
                                        borderColor="border"
                                        size="lg"
                                        required
                                        _focus={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500}"}}
                                    />
                                </Field.Root>

                                <Button
                                    type="submit"
                                    colorPalette="brandGreen"
                                    bg="brandGreen.500"
                                    color="black"
                                    size="xl"
                                    w="full"
                                    loading={loading}
                                    className="hover-lift neon-glow-accent"
                                    mt={2}
                                >
                                    Login to Dashboard
                                </Button>
                            </VStack>
                        </VStack>
                    </Box>
                </Reveal>
            </Container>
        </Box>
    );
}
