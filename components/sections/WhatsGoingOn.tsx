"use client";

import {Box, Heading, SimpleGrid, Tabs, Text, VStack, HStack, Badge, Image} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {db} from "@/lib/firebase";
import {collection, query, orderBy, limit, onSnapshot} from "firebase/firestore";
import {Reveal} from "../utils/Reveal";
import {FaCalendarAlt, FaChevronRight} from "react-icons/fa";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    excerpt: string;
    image?: string;
    category: string;
    date: {toDate: () => Date;} | null;
    slug: string;
}

const SAMPLE_POSTS: Post[] = [
    {
        id: "sample-1",
        title: "Next.js 15: The Future of Web Performance",
        excerpt: "Exploring the new React Compiler, revamped caching strategies, and improved developer experience in the latest Next.js release.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
        slug: "nextjs-15-performance",
        category: "Tech",
        date: {toDate: () => new Date("2026-01-10")}
    },
    {
        id: "sample-2",
        title: "Building Agentic AI Systems",
        excerpt: "How autonomous agents are transforming the way we build software and interact with technology.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        slug: "agentic-ai-systems",
        category: "Tech",
        date: {toDate: () => new Date("2026-01-08")}
    },
    {
        id: "sample-3",
        title: "The Minimalist Coder's Setup",
        excerpt: "Less is more. How I optimized my workspace for maximum focus and productivity.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        slug: "minimalist-coder-setup",
        category: "Lifestyle",
        date: {toDate: () => new Date("2026-01-05")}
    },
    {
        id: "sample-4",
        title: "PoshCodes Milestone: 5,000 Visitors",
        excerpt: "We've reached a huge milestone in our journey to empower developers worldwide.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        slug: "milestone-5k-visitors",
        category: "News",
        date: {toDate: () => new Date("2026-01-02")}
    },
    {
        id: "sample-5",
        title: "Launch: Advanced React Patterns Course",
        excerpt: "Master high-level patterns, optimization, and state management in our latest masterclass.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        slug: "advanced-react-patterns-launch",
        category: "Announcement",
        date: {toDate: () => new Date("2025-12-28")}
    }
];

export default function WhatsGoingOn () {
    const [posts, setPosts] = useState<Post[]>([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(10));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if(!snapshot.empty) {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Post[];
                setPosts(data);
            } else {
                setPosts(SAMPLE_POSTS);
            }
        });
        return () => unsubscribe();
    }, []);

    const filteredPosts = category === "All"
        ? posts
        : posts.filter(p => p.category === category);

    const categories = ["All", "News", "Lifestyle", "Announcement", "Blog"];

    return (
        <Box py={16} id="whats-going-on">
            <VStack align="stretch" gap={10}>
                <Box>
                    <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb={2} fontSize="md">
                        Latest Updates
                    </Text>
                    <Heading size="2xl" fontFamily="PoppinsBold" color="white" fontSize={{base: '2xl', md: '4xl'}}>
                        What&apos;s Going On?
                    </Heading>
                </Box>

                <Tabs.Root defaultValue="All" onValueChange={(e) => setCategory(e.value)}>
                    <Tabs.List mb={10} gap={10}
                        justifyContent='space-between' p={1} overflowX={'auto'} width='full' scrollbarColor={'transparent'} px={3}
                    >
                        {categories.map(cat => (
                            <Tabs.Trigger
                                key={cat}
                                value={cat}
                                color="gray.500"
                                _selected={{color: "brandGreen.500", borderBottom: "2px solid"}}
                                fontWeight="bolder"
                                fontSize="sm"
                                pb={4}
                                m={0} p={0} minWidth='max-content' flexShrink={1}
                            >
                                {cat}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    <Tabs.Content value={category}>
                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8}>
                            {filteredPosts.map((post, index) => (
                                <Reveal key={post.id} delay={index * 0.1}>
                                    <Box
                                        bg="whiteAlpha.50"
                                        borderRadius="2xl"
                                        overflow="hidden"
                                        border="1px solid"
                                        borderColor="whiteAlpha.100"
                                        transition="all 0.3s"
                                        _hover={{transform: "translateY(-5px)", borderColor: "brandGreen.500/50"}}
                                        height="full"
                                        display="flex"
                                        flexDirection="column"
                                    >
                                        <Box position="relative" height="200px">
                                            <Image
                                                src={post.image ? post.image : "/images/logo.png"}
                                                alt={post.title}
                                                w="100%"
                                                h="100%"
                                                objectFit="cover"
                                            />
                                            <Badge
                                                position="absolute"
                                                top={4}
                                                left={4}
                                                colorPalette="brandGreen"
                                                variant="solid"
                                                borderRadius="full"
                                                px={3}
                                            >
                                                {post.category}
                                            </Badge>
                                        </Box>

                                        <VStack p={6} align="start" gap={4} flex={1}>
                                            <HStack color="gray.500" fontSize="xs">
                                                <FaCalendarAlt />
                                                <Text>
                                                    {post.date?.toDate ? post.date.toDate().toLocaleDateString() : 'Recent'}
                                                </Text>
                                            </HStack>

                                            <Heading size="md" color="white" lineHeight="short">
                                                {post.title}
                                            </Heading>

                                            <Text color="gray.400" fontSize="sm" lineClamp={2}>
                                                {post.excerpt}
                                            </Text>

                                            <Link href={`/blog/${post.slug}`} style={{marginTop: 'auto', width: '100%'}}>
                                                <HStack color="brandGreen.500" fontWeight="bold" fontSize="sm" _hover={{gap: 3}} transition="all 0.2s">
                                                    <Text>Read More</Text>
                                                    <FaChevronRight />
                                                </HStack>
                                            </Link>
                                        </VStack>
                                    </Box>
                                </Reveal>
                            ))}
                        </SimpleGrid>

                        {filteredPosts.length === 0 && (
                            <Box py={20} textAlign="center">
                                <Text color="gray.500">No updates found in this category.</Text>
                            </Box>
                        )}
                    </Tabs.Content>
                </Tabs.Root>
            </VStack>
        </Box>
    );
}
