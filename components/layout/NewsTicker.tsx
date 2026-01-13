"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";

interface NewsTickerData {
    items: string[];
    isActive: boolean;
}

export default function NewsTicker() {
    const [data, setData] = useState<NewsTickerData | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "news_ticker", "global"), (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.data() as NewsTickerData);
            }
        });
        return () => unsubscribe();
    }, []);

    if (!data || !data.isActive || !data.items || data.items.length === 0) return null;

    return (
        <Box 
            bg="whiteAlpha.50" 
            backdropFilter="blur(10px)" 
            borderY="1px solid" 
            borderColor="whiteAlpha.100"
            py={2} 
            overflow="hidden"
            width="100%"
        >
            <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            >
                <HStack gap={10} whiteSpace="nowrap">
                    {data.items.map((item, index) => (
                        <HStack key={index} gap={3}>
                            <Box w={2} h={2} borderRadius="full" bg="brandGreen.500" shadow="0 0 8px var(--chakra-colors-brandGreen-500)" />
                            <Text fontSize="sm" color="gray.300" fontWeight="medium">
                                {item}
                            </Text>
                        </HStack>
                    ))}
                    {/* Duplicate items for seamless loop if needed, but for simple ticker this works */}
                    {data.items.map((item, index) => (
                        <HStack key={`dup-${index}`} gap={3}>
                            <Box w={2} h={2} borderRadius="full" bg="brandGreen.500" shadow="0 0 8px var(--chakra-colors-brandGreen-500)" />
                            <Text fontSize="sm" color="gray.300" fontWeight="medium">
                                {item}
                            </Text>
                        </HStack>
                    ))}
                </HStack>
            </motion.div>
        </Box>
    );
}
