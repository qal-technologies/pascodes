"use client";

import { Box, Container, Text, HStack, CloseButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

interface Announcement {
    id: string;
    content: string;
    isActive: boolean;
    type: "info" | "warning" | "success";
}

export default function AnnouncementBar() {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "announcements"), where("isActive", "==", true));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data() as Announcement;
                setAnnouncement({...data, id: snapshot.docs[0].id});
            } else {
                setAnnouncement(null);
            }
        });
        return () => unsubscribe();
    }, []);

    if (!announcement || !isVisible) return null;

    const bgColor = announcement.type === "warning" ? "yellow.600" : 
                    announcement.type === "success" ? "green.600" : "brandGreen.700";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: "hidden", position: "relative", zIndex: 2000 }}
            >
                <Box bg={bgColor} color="white" py={2} position="relative">
                    <Container maxW="container.xl">
                        <HStack justify="center" gap={3} px={10}>
                            <FaInfoCircle />
                            <Text fontSize="sm" fontWeight="bold" textAlign="center">
                                {announcement.content}
                            </Text>
                        </HStack>
                    </Container>
                    <CloseButton 
                        size="sm" 
                        position="absolute" 
                        right={4} 
                        top="50%" 
                        transform="translateY(-50%)"
                        onClick={() => setIsVisible(false)}
                    />
                </Box>
            </motion.div>
        </AnimatePresence>
    );
}
