"use client";

import {Box, Heading, SimpleGrid, Text, VStack, HStack, Image, Badge} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {db} from "@/lib/firebase";
import {collection, query, where, limit, getDocs} from "firebase/firestore";
import Link from "next/link";
import {FaCalendarAlt, FaChevronRight} from "react-icons/fa";

interface RelatedPost {
    id: string;
    title: string;
    image: string;
    category: string;
    slug: string;
    date: {seconds: number; nanoseconds: number;};
}

export default function RelatedBlogs ({category, currentSlug}: {category: string, currentSlug: string}) {
    const [posts, setPosts] = useState<RelatedPost[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            const q = query(
                collection(db, "blogs"), 
                where("category", "==", category), 
                limit(4)
            );
            const snap = await getDocs(q);
            const data = snap.docs
                .map(doc => ({id: doc.id, ...doc.data()} as RelatedPost))
                .filter(post => post.slug !== currentSlug)
                .slice(0, 3);
            setPosts(data);
        };
        if(category) fetchRelated();
    }, [category, currentSlug]);

    if(posts.length === 0) return null;

    return (
        <Box mt={20} pt={10} borderTop="1px solid" borderColor="whiteAlpha.100">
            <VStack align="start" gap={8}>
                <Box>
                    <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb={2} fontSize="xs">
                        Continue Reading
                    </Text>
                    <Heading size="xl" color="white" fontFamily="PoppinsBold">Related Posts</Heading>
                </Box>

                <SimpleGrid columns={{base: 1, md: 3}} gap={6} w="full">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id}>
                            <Box 
                                bg="whiteAlpha.50" 
                                borderRadius="2xl" 
                                overflow="hidden" 
                                border="1px solid" 
                                borderColor="whiteAlpha.100"
                                transition="all 0.3s"
                                _hover={{transform: "translateY(-5px)", borderColor: "brandGreen.500/50"}}
                                height="full"
                            >
                                <Box h="150px" position="relative">
                                    <Image src={post.image} alt={post.title} w="full" h="full" objectFit="cover" />
                                    <Badge position="absolute" top={3} left={3} colorPalette="brandGreen" variant="solid" fontSize="2xs">{post.category}</Badge>
                                </Box>
                                <VStack p={4} align="start" gap={2}>
                                    <Heading size="xs" color="white" lineClamp={2}>{post.title}</Heading>
                                    <HStack color="gray.500" fontSize="2xs">
                                        <FaCalendarAlt />
                                        <Text>{new Date(post.date.seconds * 1000).toLocaleDateString()}</Text>
                                    </HStack>
                                </VStack>
                            </Box>
                        </Link>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}
