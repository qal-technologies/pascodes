"use client";

import {Box, Container, Heading, SimpleGrid, Tabs, Text, Button, Input, VStack, HStack, Badge, Flex, Textarea} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {db} from "@/lib/firebase";
import {collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, serverTimestamp} from "firebase/firestore";
import {sendBuildStatusEmail} from "@/lib/email-service";
import {FaWhatsapp, FaEnvelope, FaSearch, FaCheckCircle, FaSignOutAlt, FaUpload} from "react-icons/fa";
import {useAuth} from "@/hooks/useAuth";
import {signOut} from "firebase/auth";
import {auth, storage} from "@/lib/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

// Interface for Build Data
interface BuildData {
    id: string; // Firestore Doc ID
    buildId: string;
    title: string;
    name: string;
    email?: string;
    projectType: string;
    status?: "pending" | "progress" | "complete" | "cancelled";
    createdAt?: {seconds: number; nanoseconds: number;};
    [key: string]: unknown;
}

interface ContactData {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "unread" | "read";
    createdAt: unknown;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: unknown;
    slug: string;
}

export default function AdminDashboard () {
    const {user, loading: authLoading} = useAuth();
    const [builds, setBuilds] = useState<BuildData[]>([]);
    const [contacts, setContacts] = useState<ContactData[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBuild, setSelectedBuild] = useState<BuildData | null>(null);
    const [selectedContact, setSelectedContact] = useState<ContactData | null>(null);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [newBlog, setNewBlog] = useState({title: "", excerpt: "", slug: "", image: ""});
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setUploadingImage(true);
        try {
            const storageRef = ref(storage, `blogs/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setNewBlog(prev => ({...prev, image: url}));
            alert("Image uploaded successfully!");
        } catch(error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        } finally {
            setUploadingImage(false);
        }
    };

    const fetchBuilds = () => {
        const q = query(collection(db, "builds"), orderBy("buildId", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const buildsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BuildData[];
            setBuilds(buildsData);
        });
        return unsubscribe;
    };

    const fetchContacts = () => {
        const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ContactData[];
            setContacts(data);
        });
        return unsubscribe;
    };

    const fetchBlogs = () => {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BlogPost[];
            setBlogs(data);
        });
        return unsubscribe;
    };

    useEffect(() => {
        let unsubBuilds: (() => void) | undefined;
        let unsubContacts: (() => void) | undefined;
        let unsubBlogs: (() => void) | undefined;

        const init = () => {
            unsubBuilds = fetchBuilds();
            unsubContacts = fetchContacts();
            unsubBlogs = fetchBlogs();
            setLoading(false);
        };

        init();
        return () => {
            if(unsubBuilds) unsubBuilds();
            if(unsubContacts) unsubContacts();
            if(unsubBlogs) unsubBlogs();
        };
    }, []);

    const filteredBuilds = builds.filter(b =>
        b.buildId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateStatus = async (build: BuildData, status: "progress" | "complete" | "cancelled" | "issue", extraData?: Record<string, string>) => {
        if(!build.email) {
            alert("No email linked to this build!");
            return;
        }

        // 1. Send Email
        await sendBuildStatusEmail(build.email, status, {title: build.title, ...extraData});

        // 2. Update Firestore Status
        if(status !== 'issue') { // Issue doesn't necessarily change status
            const buildRef = doc(db, "builds", build.id);
            await updateDoc(buildRef, {status: status});
            alert(`Status updated to ${status} and email sent.`);
        } else {
            alert(`Email sent regarding issue.`);
        }
    };

    // In a real app, you'd put "Tabs" properly.
    // Since Chakra v3 Tabs API might differ or require context, using visual tabs for simplicity or checking docs.
    // Assuming standard composition.

    if(authLoading) {
        return (
            <Flex h="100vh" align="center" justify="center" bg="background">
                <VStack gap={4}>
                    <Box className="skeleton" w="40px" h="40px" borderRadius="full" />
                    <Text color="gray.400">Verifying Session...</Text>
                </VStack>
            </Flex>
        );
    }

    if(!user) return null;

    return (
        <Box minH="100vh" bg="background" color="foreground" p={8}>
            <Container maxW="container.xl">
                <Flex justify="space-between" align="center" mb={10}>
                    <VStack align="start" gap={1}>
                        <Heading color="brandGreen.500" size="2xl">
                            Admin <Text as="span" color="foreground">Dashboard</Text>
                        </Heading>
                        <Text color="gray.500">Welcome back, {user.email}</Text>
                    </VStack>
                    <Button
                        onClick={() => signOut(auth)}
                        variant="ghost"
                        color="red.400"
                        _hover={{bg: "red.500/10"}}
                        className="hover-lift"
                    >
                        <FaSignOutAlt style={{marginRight: '8px'}} /> Logout
                    </Button>
                </Flex>

                <Flex justify="space-between" align="center" mb={8}>
                    <HStack>
                        <Input
                            placeholder="Search Build ID or Client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            maxW="300px"
                            borderRadius="full"
                            bg="gray.800"
                            border="none"
                        />
                        <Button borderRadius="full" colorPalette="brandGreen"><FaSearch /></Button>
                    </HStack>
                </Flex>

                <Tabs.Root defaultValue="builds">
                    <Tabs.List mb={6}>
                        <Tabs.Trigger value="builds">Builds</Tabs.Trigger>
                        <Tabs.Trigger value="blogs">Blogs</Tabs.Trigger>
                        <Tabs.Trigger value="contacts">Contacts</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="builds">
                        <SimpleGrid columns={{base: 1, lg: 2}} gap={8}>
                            {/* List Column */}
                            <VStack align="stretch" gap={4} maxH="80vh" overflowY="auto" pr={2}>
                                {filteredBuilds.map(build => (
                                    <Box
                                        key={build.id}
                                        p={6}
                                        bg={selectedBuild?.id === build.id ? "brandGreen.900" : "gray.800"}
                                        borderRadius="xl"
                                        cursor="pointer"
                                        onClick={() => setSelectedBuild(build)}
                                        border="1px solid"
                                        borderColor={selectedBuild?.id === build.id ? "brandGreen.500" : "transparent"}
                                        transition="all 0.2s"
                                        _hover={{bg: "gray.700"}}
                                    >
                                        <HStack justify="space-between" mb={2}>
                                            <Badge colorPalette={
                                                build.status === 'complete' ? 'green' :
                                                    build.status === 'progress' ? 'yellow' :
                                                        build.status === 'cancelled' ? 'red' : 'gray'
                                            }>{build.status || 'NEW'}</Badge>
                                            <Text fontSize="xs" color="gray.500">{build.buildId}</Text>
                                        </HStack>
                                        <Heading size="md" mb={1}>{build.title}</Heading>
                                        <Text color="gray.400" fontSize="sm">{build.name} • {build.projectType}</Text>
                                    </Box>
                                ))}
                            </VStack>

                            {/* Detail Column */}
                            <Box bg="gray.800" p={8} borderRadius="xl" border="1px solid white" borderColor="whiteAlpha.200">
                                {selectedBuild ? (
                                    <VStack align="stretch" gap={6}>
                                        <Heading size="lg">{selectedBuild.title}</Heading>

                                        <SimpleGrid columns={2} gap={4}>
                                            <Box>
                                                <Text color="gray.500" fontSize="sm">Client</Text>
                                                <Text fontWeight="bold">{selectedBuild.name}</Text>
                                            </Box>
                                            <Box>
                                                <Text color="gray.500" fontSize="sm">Type</Text>
                                                <Text fontWeight="bold">{selectedBuild.projectType}</Text>
                                            </Box>
                                            <Box>
                                                <Text color="gray.500" fontSize="sm">Email</Text>
                                                {selectedBuild.email ? (
                                                    <HStack>
                                                        <Text fontWeight="bold">{selectedBuild.email}</Text>
                                                        <FaCheckCircle color="green" />
                                                    </HStack>
                                                ) : (
                                                    <HStack>
                                                        <Text color="red.400">Not Linked</Text>
                                                        <Button size="xs" variant="plain" colorPalette="brandGreen">Link Now</Button>
                                                    </HStack>
                                                )}
                                            </Box>
                                            <Box>
                                                <Text color="gray.500" fontSize="sm">Pages</Text>
                                                <Text fontWeight="bold">{selectedBuild?.pages || 0}</Text>
                                            </Box>
                                        </SimpleGrid>

                                        <Box bg="blackAlpha.500" p={4} borderRadius="md">
                                            <Text fontStyle="italic" color="gray.300">
                                                {selectedBuild?.description}
                                            </Text>
                                        </Box>

                                        <Heading size="sm" mt={4}>Actions</Heading>
                                        <SimpleGrid columns={2} gap={4}>
                                            <Button
                                                colorPalette="green"
                                                onClick={() => handleUpdateStatus(selectedBuild, "progress")}
                                                disabled={selectedBuild.status === 'progress'}
                                            >
                                                Start Progress
                                            </Button>
                                            <Button
                                                colorPalette="blue"
                                                onClick={() => handleUpdateStatus(selectedBuild, "complete")}
                                                disabled={selectedBuild.status === 'complete'}
                                            >
                                                Mark Complete
                                            </Button>
                                            <Button
                                                colorPalette="red" variant="outline"
                                                onClick={() => {
                                                    const reason = prompt("Enter cancellation reason:");
                                                    if(reason) handleUpdateStatus(selectedBuild, "cancelled", {reason});
                                                }}
                                            >
                                                Cancel Build
                                            </Button>
                                            <Button
                                                colorPalette="yellow" variant="outline"
                                                onClick={() => {
                                                    const message = prompt("Enter update message:");
                                                    if(message) handleUpdateStatus(selectedBuild, "issue", {message});
                                                }}
                                            >
                                                Send Update
                                            </Button>
                                        </SimpleGrid>

                                        <HStack pt={6} justify="center">
                                            <Button variant="ghost">
                                                <FaWhatsapp style={{marginRight: "8px"}} /> Chat on WhatsApp
                                            </Button>
                                            <Button variant="ghost">
                                                <FaEnvelope style={{marginRight: "8px"}} /> Email Client
                                            </Button>
                                        </HStack>

                                    </VStack>
                                ) : (
                                    <Flex height="100%" align="center" justify="center" direction="column" color="gray.500">
                                        <FaSearch size={40} />
                                        <Text mt={4}>Select a build to view details</Text>
                                    </Flex>
                                )}
                            </Box>
                        </SimpleGrid>
                    </Tabs.Content>

                    <Tabs.Content value="blogs">
                        <VStack align="stretch" gap={6}>
                            <HStack justify="space-between">
                                <Heading size="md" color="white">Blog Posts</Heading>
                                <Button colorPalette="brandGreen" onClick={() => setIsBlogModalOpen(true)}>Add New Post</Button>
                            </HStack>

                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
                                {blogs.map(post => (
                                    <Box
                                        key={post.id}
                                        bg="whiteAlpha.50"
                                        p={6}
                                        borderRadius="xl"
                                        border="1px solid"
                                        borderColor="whiteAlpha.100"
                                    >
                                        <HStack justify="space-between" mb={3}>
                                            <Badge colorPalette="gray">{post.slug}</Badge>
                                            <Text fontSize="xs" color="gray.500">
                                                {post.date?.toDate ? post.date.toDate().toLocaleDateString() : 'Draft'}
                                            </Text>
                                        </HStack>
                                        <Heading size="sm" mb={2} color="white">{post.title}</Heading>
                                        <Text color="gray.400" fontSize="sm" lineClamp={2}>{post.excerpt}</Text>
                                        <HStack mt={4} gap={4}>
                                            <Button size="xs" variant="outline">Edit</Button>
                                            <Button size="xs" variant="ghost" colorPalette="red">Delete</Button>
                                        </HStack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Tabs.Content>

                    <Tabs.Content value="contacts">
                        <VStack align="stretch" gap={4}>
                            <Box bg="whiteAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                                <Input
                                    placeholder="Search contacts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    bg="black"
                                />
                            </Box>

                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
                                {contacts
                                    .filter(c =>
                                        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        c.subject.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((contact) => (
                                        <Box
                                            key={contact.id}
                                            bg="whiteAlpha.50"
                                            p={6}
                                            borderRadius="xl"
                                            border="1px solid"
                                            borderColor={contact.status === 'unread' ? "brandGreen.500" : "whiteAlpha.200"}
                                            cursor="pointer"
                                            onClick={() => setSelectedContact(contact)}
                                            _hover={{bg: "whiteAlpha.100"}}
                                        >
                                            <HStack justify="space-between" mb={3}>
                                                <Badge colorPalette={contact.status === 'read' ? 'gray' : 'green'}>
                                                    {contact.status}
                                                </Badge>
                                                <Text fontSize="xs" color="gray.500">
                                                    {contact.createdAt?.toDate ? contact.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                                </Text>
                                            </HStack>
                                            <Heading size="sm" mb={1} color="white">{contact.name}</Heading>
                                            <Text color="brandGreen.500" fontSize="xs" mb={3}>{contact.email}</Text>
                                            <Text color="gray.400" fontSize="sm" lineClamp={2}>{contact.subject}</Text>
                                        </Box>
                                    ))}
                            </SimpleGrid>
                        </VStack>
                    </Tabs.Content>
                </Tabs.Root>
            </Container>
            {/* Contact Details Modal Placeholder - For brevity using a simple overlay */}
            {selectedContact && (
                <Box
                    position="fixed"
                    inset={0}
                    bg="blackAlpha.800"
                    backdropFilter="blur(10px)"
                    zIndex={1000}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={6}
                    onClick={() => setSelectedContact(null)}
                >
                    <Box
                        bg="gray.900"
                        p={8}
                        borderRadius="2xl"
                        maxW="600px"
                        w="full"
                        onClick={(e) => e.stopPropagation()}
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                    >
                        <HStack justify="space-between" mb={6}>
                            <VStack align="start" gap={1}>
                                <Heading size="lg" color="white">{selectedContact.name}</Heading>
                                <Text color="brandGreen.500">{selectedContact.email}</Text>
                            </VStack>
                            <Button size="sm" onClick={() => setSelectedContact(null)}>Close</Button>
                        </HStack>

                        <VStack align="stretch" gap={6}>
                            <Box>
                                <Text color="gray.500" fontSize="xs" textTransform="uppercase" fontWeight="bold" mb={2}>Subject</Text>
                                <Text color="white" fontSize="lg">{selectedContact.subject}</Text>
                            </Box>

                            <Box>
                                <Text color="gray.500" fontSize="xs" textTransform="uppercase" fontWeight="bold" mb={2}>Message</Text>
                                <Text color="gray.300" whiteSpace="pre-wrap">{selectedContact.message}</Text>
                            </Box>

                            <HStack gap={4} pt={4}>
                                <Button
                                    colorPalette="brandGreen"
                                    flex={1}
                                    onClick={async () => {
                                        await updateDoc(doc(db, "contacts", selectedContact.id), {status: "read"});
                                        setSelectedContact(null);
                                    }}
                                >
                                    Mark as Read
                                </Button>
                                <Button
                                    variant="outline"
                                    flex={1}
                                    onClick={() => window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                                >
                                    Reply via Email
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </Box>
            )}
            {/* Blog Post Modal */}
            {isBlogModalOpen && (
                <Box
                    position="fixed"
                    inset={0}
                    bg="blackAlpha.800"
                    backdropFilter="blur(10px)"
                    zIndex={1000}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={6}
                    onClick={() => setIsBlogModalOpen(false)}
                >
                    <Box
                        bg="gray.900"
                        p={8}
                        borderRadius="2xl"
                        maxW="600px"
                        w="full"
                        onClick={(e) => e.stopPropagation()}
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                    >
                        <Heading size="lg" color="white" mb={6}>Create New Post</Heading>
                        <VStack gap={4}>
                            <Input
                                placeholder="Title"
                                value={newBlog.title}
                                onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                                bg="black"
                            />
                            <Input
                                placeholder="Slug (e.g. future-of-web)"
                                value={newBlog.slug}
                                onChange={e => setNewBlog({...newBlog, slug: e.target.value})}
                                bg="black"
                            />
                            <Box w="full">
                                <Text color="gray.400" mb={2} fontSize="sm">Blog Cover Image</Text>
                                <HStack>
                                    <Input
                                        placeholder="Image URL"
                                        value={newBlog.image}
                                        onChange={e => setNewBlog({...newBlog, image: e.target.value})}
                                        bg="black"
                                        flex={1}
                                    />
                                    <Box position="relative">
                                        <Button
                                            as="label"
                                            htmlFor="blog-image"
                                            size="md"
                                            colorPalette="brandNavy"
                                            cursor="pointer"
                                            loading={uploadingImage}
                                        >
                                            <FaUpload style={{marginRight: '8px'}} /> Upload
                                        </Button>
                                        <input
                                            type="file"
                                            id="blog-image"
                                            accept="image/*"
                                            style={{display: 'none'}}
                                            onChange={handleImageUpload}
                                        />
                                    </Box>
                                </HStack>
                            </Box>
                            <Textarea
                                placeholder="Excerpt"
                                value={newBlog.excerpt}
                                onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                                bg="black"
                                rows={4}
                            />
                            <HStack w="full" gap={4} pt={4}>
                                <Button flex={1} variant="outline" onClick={() => setIsBlogModalOpen(false)}>Cancel</Button>
                                <Button
                                    flex={1}
                                    colorPalette="brandGreen"
                                    onClick={async () => {
                                        await addDoc(collection(db, "blogs"), {
                                            ...newBlog,
                                            date: serverTimestamp()
                                        });
                                        setIsBlogModalOpen(false);
                                        setNewBlog({title: "", excerpt: "", slug: "", image: ""});
                                    }}
                                >Create Post</Button>
                            </HStack>
                        </VStack>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
