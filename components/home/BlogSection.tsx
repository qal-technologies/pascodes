"use client";

import {Box, Container, Heading, SimpleGrid, Text, Image, Link, VStack} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {db} from "@/lib/firebase";
import {collection, query, orderBy, limit, onSnapshot} from "firebase/firestore";
import {Reveal} from "../utils/Reveal";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: any;
    slug: string;
}

export default function BlogSection () {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(3));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BlogPost[];
            setPosts(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Box p={{base: 10, md: 20}}
            py={{base: 20, md: 40}}
            bg="brandGreen.900/40">
            <Container alignSelf='center' maxW="container.xl" placeItems='center' justifySelf={'center'} zIndex={99}>
                <VStack align="start" gap={8} mb={12}>
                    <Reveal>
                        <Heading color="white" fontWeight="bold" textAlign={'center'} fontSize={{base: "3xl", md: "5xl"}}
                            fontFamily='PoppinsSemi'>Latest From
                            <Text as="span" color="brandGreen.500" className="neon-text" fontSize={{base: "3xl", md: "5xl"}}
                                fontFamily='PoppinsSemi'> The Blog</Text></Heading>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <Text color="gray.400" maxW="2xl" textAlign={'center'}>
                            Deep dives into modern web technologies, technical tutorials, and industry insights to keep you ahead of the curve.
                        </Text>
                    </Reveal>
                </VStack>

                <SimpleGrid columns={{base: 1, md: 3}} gap={8}>
                    {loading ? (
                        [1, 2, 3].map(i => <Box key={i} h="350px" bg="whiteAlpha.100" borderRadius="xl" className="skeleton" />)
                    ) : (
                        posts.map((post, index) => (
                            <Reveal key={post.id} delay={0.2 * index}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    _hover={{textDecoration: "none"}}
                                    className="group"
                                >
                                    <Box
                                        borderRadius="xl"
                                        overflow="hidden"
                                        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                        _groupHover={{transform: "translateY(-12px)"}}
                                        className="glass-panel"
                                    >
                                        <Box h="200px" overflow="hidden" position="relative">
                                            <Image
                                                src={post.image || "/images/blog-placeholder.jpg"}
                                                alt={post.title}
                                                w="full"
                                                h="full"
                                                objectFit="cover"
                                                transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                                                _groupHover={{transform: "scale(1.15) rotate(2deg)"}}
                                            />
                                            <Box
                                                position="absolute"
                                                inset={0}
                                                bgGradient="to-t"
                                                gradientFrom="black"
                                                gradientTo="transparent"
                                                opacity={0.7}
                                            />
                                        </Box>
                                        <Box p={6}>
                                            <Text color="brandGreen.500" fontSize="xs" fontWeight="bold" mb={2}>
                                                {post.date?.toDate ? post.date.toDate().toLocaleDateString() : 'Recent Post'}
                                            </Text>
                                            <Heading size="md" color="white" mb={3} transition="color 0.3s" _groupHover={{color: "brandGreen.500"}}>
                                                {post.title}
                                            </Heading>
                                            <Text color="gray.400" fontSize="sm" lineClamp={3}>
                                                {post.excerpt}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Link>
                            </Reveal>
                        ))
                    )}
                </SimpleGrid>

                {posts.length === 0 && !loading && (
                    <Box textAlign="center" py={10}>
                        <Text color="gray.500">No blog posts found. Check back soon!</Text>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
