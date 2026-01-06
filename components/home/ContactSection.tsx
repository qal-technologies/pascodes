"use client";

import {Box, Container, Heading, SimpleGrid, Text, VStack, Input, Textarea, Button, Field} from "@chakra-ui/react";
import {FaEnvelope, FaWhatsapp, FaGithub, FaPaperPlane} from "react-icons/fa";
import {SITE_CONFIG} from "@/lib/site-config";
import {useState} from "react";
import {db} from "@/lib/firebase";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {toaster} from "@/components/ui/toaster";
import {Reveal} from "../utils/Reveal";

export default function ContactSection () {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.message) {
            toaster.create({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                type: "error"
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                status: "unread",
                createdAt: serverTimestamp()
            });

            toaster.create({
                title: "Message Sent",
                description: "Thank you! I'll get back to you soon.",
                type: "success"
            });

            setFormData({name: "", email: "", subject: "", message: ""});
        } catch(error) {
            console.error("Error sending message:", error);
            toaster.create({
                title: "Error",
                description: "Failed to send message. Please try again.",
                type: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box py={{base: 20, md: 40}}
            padding={10} bg="background" id="contact">
            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={99}>
                <SimpleGrid columns={{base: 1, md: 2}} gap={16}>
                    <Box>
                        <Reveal>
                            <Heading color="foreground" mb={6} size="xl" fontSize={{base: 22, md: 30}}>
                                Let&apos;s Build <br />
                                <Text as="span" color="brandGreen.500" className="neon-text" fontSize={{base: 20, md: 28}}>Something Amazing</Text>
                            </Heading>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <Text color="gray.400" fontSize="lg" mb={10}>
                                Have a project in mind or just want to say hi? Reach out and let&apos;s discuss how we can help you achieve your goals.
                            </Text>
                        </Reveal>

                        <VStack align="stretch" gap={8}>
                            <Reveal delay={0.4}>
                                <ContactItem
                                    icon={<FaEnvelope />}
                                    label="Email"
                                    value={SITE_CONFIG.email}
                                    link={SITE_CONFIG.socials.email}

                                />
                            </Reveal>
                            <Reveal delay={0.5}>
                                <ContactItem
                                    icon={<FaWhatsapp />}
                                    label="WhatsApp"
                                    value={SITE_CONFIG.whatsappNumber}
                                    link={SITE_CONFIG.socials.whatsapp}

                                />
                            </Reveal>
                            <Reveal delay={0.6}>
                                <ContactItem
                                    icon={<FaGithub />}
                                    label="GitHub"
                                    value="@pasqal-dev"
                                    link={SITE_CONFIG.socials.github}
                                />
                            </Reveal>
                        </VStack>
                    </Box>

                    <Reveal delay={0.4} glow>
                        <Box
                            as="form"
                            onSubmit={handleSubmit}
                            p={8}
                            borderRadius="2xl"
                            className="glass-panel"
                            pt={15}
                        >
                            <VStack gap={5}>
                                <Field.Root invalid={!formData.name && isSubmitting}>
                                    <Input
                                        placeholder="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        bg="blackAlpha.200"
                                        border="1px solid"
                                        borderColor="border"
                                        _focus={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500/40}"}}
                                        style={{padding: 10, borderRadius: '12px'}}
                                    />
                                </Field.Root>

                                <Field.Root invalid={!formData.email && isSubmitting}>
                                    <Input
                                        placeholder="Email Address"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        bg="blackAlpha.200"
                                        border="1px solid"
                                        borderColor="border"
                                        _focus={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500/40}"}}
                                        style={{padding: 10, borderRadius: '12px'}}
                                    />
                                </Field.Root>

                                <Input
                                    placeholder="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    bg="blackAlpha.200"
                                    border="1px solid"
                                    borderColor="border"
                                    _focus={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500/40}"}}
                                    style={{padding: 10, borderRadius: '12px'}}

                                />

                                <Field.Root invalid={!formData.message && isSubmitting}>
                                    <Textarea
                                        placeholder="Your Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        bg="blackAlpha.200"
                                        border="1px solid"
                                        borderColor="border"
                                        _focus={{borderColor: "brandGreen.500", boxShadow: "0 0 10px {colors.brandGreen.500/40}"}}
                                        style={{padding: 10, borderRadius: '12px'}}
                                    />
                                </Field.Root>

                                <Button
                                    type="submit"
                                    colorPalette="brandGreen"
                                    background="brandGreen.500"
                                    color="black"
                                    width="full"
                                    size="lg"
                                    loading={isSubmitting}
                                    loadingText="Sending..."
                                    className="hover-lift neon-glow-accent"
                                    style={{padding: 10, borderRadius: '16px', marginTop: 20}}

                                >
                                    Send Message <FaPaperPlane style={{marginLeft: '8px'}} />
                                </Button>
                            </VStack>
                        </Box>
                    </Reveal>
                </SimpleGrid>
            </Container>
        </Box>
    );
}

function ContactItem ({icon, label, value, link}: {icon: React.ReactNode, label: string, value: string, link?: string;}) {
    const content = (
        <Box display="flex" alignItems="center" gap={4}>
            <Box p={3} bg="brandGreen.500" borderRadius="full" color="black" className="neon-glow-accent">
                {icon}
            </Box>
            <Box>
                <Text color="gray.400" fontSize="sm">{label}</Text>
                <Text color="foreground" fontWeight="bold">{value}</Text>
            </Box>
        </Box>
    );

    if(link) {
        return (
            <Box
                onClick={() => window.open(link, '_blank')}
                display="block"
                transition="transform 0.2s ease"
                _hover={{transform: "translateX(5px)", cursor: "pointer"}}
            >
                {content}
            </Box>
        );
    }

    return content;
}
