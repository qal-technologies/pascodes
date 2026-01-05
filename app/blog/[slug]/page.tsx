import {db} from "@/lib/firebase";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {Metadata} from "next";
import {Box, Container, Heading, Text, Image, VStack, Separator} from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {notFound} from "next/navigation";

interface BlogPost {
    title: string;
    excerpt: string;
    image: string;
    date: {seconds: number; nanoseconds: number;};
    content?: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    return snapshot.docs[0].data() as BlogPost;
}

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
    const post = await getBlogPost(params.slug);
    
    if (!post) {
        return {
            title: "Post Not Found",
        };
    }
    
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        }
    };
}

export default async function BlogPostPage({params}: {params: {slug: string}}) {
    const post = await getBlogPost(params.slug);
    
    if (!post) notFound();

    const date = new Date(post.date.seconds * 1000).toLocaleDateString();

    return (
        <Box bg="background" minH="100vh">
            <Navbar />
            
            <Box pt={32} pb={20}>
                <Container maxW="container.md">
                    <Reveal>
                        <VStack align="start" gap={6}>
                            <Box w="full" h={{base: "250px", md: "400px"}} borderRadius="2xl" overflow="hidden" className="neon-glow-primary">
                                <Image 
                                    src={post.image} 
                                    alt={post.title} 
                                    w="full" 
                                    h="full" 
                                    objectFit="cover" 
                                />
                            </Box>
                            
                            <VStack align="start" gap={2}>
                                <Text color="brandGreen.500" fontWeight="bold" fontSize="sm">{date}</Text>
                                <Heading size="3xl" color="foreground">{post.title}</Heading>
                            </VStack>

                            <Separator borderColor="border" />

                            <Box color="gray.300" fontSize="lg" lineHeight="tall">
                                {/* For now displaying excerpt as content if content field missing */}
                                <Text whiteSpace="pre-wrap">
                                    {post.content || post.excerpt}
                                </Text>
                            </Box>
                        </VStack>
                    </Reveal>
                </Container>
            </Box>
        </Box>
    );
}
