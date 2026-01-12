"use client";

import {Box, Container, Heading, SimpleGrid, Tabs, Text, Button, Input, VStack, HStack, Badge, Flex, Textarea, IconButton, Switch, Table} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {db} from "@/lib/firebase";
import {collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, serverTimestamp, deleteDoc, setDoc} from "firebase/firestore";
import {sendBuildStatusEmail} from "@/lib/email-service";
import {FaWhatsapp, FaEnvelope, FaSearch, FaCheckCircle, FaSignOutAlt, FaUpload, FaGlobe, FaTimes, FaPlus, FaDownload, FaTools, FaNewspaper, FaLink} from "react-icons/fa";
import {useAuth} from "@/hooks/useAuth";
import {signOut} from "firebase/auth";
import {useRouter} from "next/navigation";
import {auth, storage} from "@/lib/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import "@/styles/loading.css";
import {toaster} from "@/components/ui/toaster";
import {LuSettings, LuUser} from "react-icons/lu";
import {BiPen, BiSolidGraduation} from "react-icons/bi";


// Interface for Build Data
interface BuildData {
    id: string; // Firestore Doc ID
    buildId: string;
    title: string;
    name: string;
    email?: string;
    phone?: string | number;
    projectType: string;
    pages?: number;
    status?: "pending" | "progress" | "complete" | "cancelled";
    createdAt?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface ContactData {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "unread" | "read";
    createdAt?: any;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    date: any;
    slug: string;
    category?: string;
    content?: string;
}

interface CourseData {
    id: string;
    title: string;
    description: string;
    status: string;
    progress: number;
    launchDate: string;
    duration: string;
    audience: string;
    languages: string[];
}

interface AnnouncementData {
    id: string;
    content: string;
    isActive: boolean;
    type: "info" | "warning" | "success";
}

interface NewsTickerData {
    id: string;
    items: string[];
    isActive: boolean;
}

interface WaitlistEntry {
    id: string;
    name: string;
    email: string;
    source: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
}

export default function AdminDashboard () {
    const {user, loading: authLoading} = useAuth();
    const [builds, setBuilds] = useState<BuildData[]>([]);
    const [contacts, setContacts] = useState<ContactData[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
    const [newsTicker, setNewsTicker] = useState<NewsTickerData | null>(null);
    const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBuild, setSelectedBuild] = useState<BuildData | null>(null);
    const [selectedContact, setSelectedContact] = useState<ContactData | null>(null);

    // Modals & New Items
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [newBlog, setNewBlog] = useState<BlogPost | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState<Partial<CourseData>>({
        title: "",
        description: "",
        status: "Recording",
        progress: 0,
        launchDate: "",
        duration: "",
        audience: "Beginner",
        languages: []
    });
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

    const [uploadingImage, setUploadingImage] = useState(false);

    const router = useRouter();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setUploadingImage(true);
        try {
            const storageRef = ref(storage, `blogs/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            if(selectedBlog) {
                setSelectedBlog({...selectedBlog, image: url});
            } else if(newBlog) {
                setNewBlog({...newBlog, image: url});
            }
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

    const fetchCourses = () => {
        const q = query(collection(db, "courses"), orderBy("title", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as CourseData[];
            setCourses(data);
        });
        return unsubscribe;
    };

    const fetchWaitlist = () => {
        const q = query(collection(db, "waitlist"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as WaitlistEntry[];
            setWaitlist(data);
        });
        return unsubscribe;
    };

    const fetchAnnouncements = () => {
        const q = query(collection(db, "announcements"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as AnnouncementData[];
            setAnnouncements(data);
        });
        return unsubscribe;
    };

    const fetchNewsTicker = () => {
        const unsubscribe = onSnapshot(doc(db, "settings", "news_ticker"), (doc) => {
            if(doc.exists()) {
                setNewsTicker({id: doc.id, ...doc.data()} as NewsTickerData);
            }
        });
        return unsubscribe;
    };

    const generateBlogId = () => {
        const randomString = Math.random().toString(36).substring(2, 8);
        const timestamp = Date.now().toString().substring(7);
        return `${randomString}-${timestamp}`;
    };

    const deleteBlog = async (id: string) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogs(prev => prev.filter(blog => blog.id !== id));
        } catch(error) {
            toaster.create({
                title: 'Blog Post',
                type: 'error',
                description: 'Error deleting the blog'
            });
            console.error("Error deleting blog:", error);
        }
    };


    useEffect(() => {
        let unsubBuilds: (() => void) | undefined;
        let unsubContacts: (() => void) | undefined;
        let unsubBlogs: (() => void) | undefined;

        const init = () => {
            unsubBuilds = fetchBuilds();
            unsubContacts = fetchContacts();
            unsubBlogs = fetchBlogs();
            fetchCourses();
            fetchWaitlist();
            fetchAnnouncements();
            fetchNewsTicker();
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

    const handleSaveCourse = async () => {
        try {
            if(selectedCourse) {
                const {id, ...courseData} = selectedCourse;
                await updateDoc(doc(db, "courses", id), courseData);
                toaster.create({title: "Course Updated", type: "success"});
            } else {
                await addDoc(collection(db, "courses"), {
                    ...newCourse,
                    createdAt: serverTimestamp()
                });
                toaster.create({title: "Course Created", type: "success"});
            }
            setIsCourseModalOpen(false);
            setSelectedCourse(null);
        } catch(error) {
            console.error("Error saving course:", error);
            toaster.create({title: "Error saving course", type: "error"});
        }
    };

    const handleSaveAnnouncement = async (id: string, content: string, isActive: boolean) => {
        try {
            await updateDoc(doc(db, "announcements", id), {content, isActive});
            toaster.create({title: "Announcement Saved", type: "success"});
        } catch(error) {
            console.error("Error saving announcement:", error);
            toaster.create({title: "Error saving announcement", type: "error"});
        }
    };

    const handleExportCSV = () => {
        if(waitlist.length === 0) return;
        const headers = ["Email", "Joined Date"];
        const csvContent = [
            headers.join(","),
            ...waitlist.map(entry => {
                const date = entry.createdAt?.toDate ? entry.createdAt.toDate().toLocaleDateString() : 'N/A';
                return `"${entry.email}","${date}"`;
            })
        ].join("\n");

        const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "waitlist.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if(authLoading) {
        return (
            <Flex h="100vh" align="center" justify="center" bg="background">
                <VStack gap={4}>
                    <Box as={"div"} className="spinner" />

                    <Text color="gray.400" mt={4}>Verifying Session...</Text>
                </VStack>
            </Flex>
        );
    }

    if(!user && !authLoading) {
        router.push("/admin/login");
        return null;
    }

    return (
        <Box maxH="100vh" overflow='hidden' bg="background" color="foreground" minWidth='full'>
            <Container position={'relative'} minWidth='100%' p={8} >
                <Flex justify="space-between" align="center" mb={10} wrap={'wrap'} gap={3} width='full' mt={4}>
                    <VStack align="start" gap={1}>
                        <Heading color="brandGreen.500" size="2xl" fontSize={{base: 25, md: 30}} fontFamily={'PoppinsSemi'}>
                            Admin <Text as="span" color="foreground" fontSize={{base: 25, md: 30}} fontFamily={'PoppinsSemi'} >Dashboard</Text>
                        </Heading>
                        <Text color="gray.500" fontSize={{base: 18, md: 20}}>Welcome back, Admin</Text>
                    </VStack>

                    <HStack gap={2}>
                        <Button
                            onClick={() => signOut(auth)}
                            variant="ghost"
                            color="red.400"
                            _hover={{bg: "red.500/10"}}
                            className="hover-lift"
                            aria-label="Log out"
                            borderRadius='lg'
                            title="Log Out"
                        >
                            <FaSignOutAlt />
                        </Button>

                        <Button
                            onClick={() => {
                                const base = window.location.origin;
                                window.open(base as string);
                            }}
                            variant="ghost"
                            color="blue.400"
                            _hover={{bg: "blue.500/10"}}
                            className="hover-lift"
                            aria-label="View Website"
                            borderRadius='lg'
                            title='View Website'
                        >
                            <FaGlobe />
                        </Button>
                    </HStack>

                    <Flex justify="space-between" gap={4} align="center" mt={4} minW='100%'>
                        <HStack width='full'>
                            <Box bg="whiteAlpha.50" borderRadius="full" overflow='hidden' border="1px solid" borderColor="whiteAlpha.100" maxW='600px' width='full'>
                                <Input
                                    placeholder="Search Build ID or Client..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    bg="black"
                                    style={{padding: '10px', paddingInline: '15px'}}
                                />
                            </Box>

                            <Button borderRadius="full" colorPalette="brandGreen"><FaSearch /></Button>
                        </HStack>
                    </Flex>
                </Flex>


                <Tabs.Root
                    defaultValue="builds"
                    style={{
                        position: 'relative',
                        height: '100vh',
                        overflowY: 'auto',
                    }}
                >
                    <Tabs.List mb={6} gap={5} position='sticky' top={0} bg="background/70" backdropFilter='blur(10px) brightness(80%)' pt={3} pb={1}>
                        <Tabs.Trigger value="builds" fontFamily={'PoppinsSemi'} gap={2}> <FaTools /> Builds</Tabs.Trigger>
                        <Tabs.Trigger value="blogs" fontFamily={'PoppinsSemi'} gap={2}><FaNewspaper /> Blogs</Tabs.Trigger>

                        <Tabs.Trigger value='posts' fontFamily='PoppinsSemi' gap={2}><BiPen /> Posts</Tabs.Trigger>
                        <Tabs.Trigger value='courses' fontFamily='PoppinsSemi' gap={2}><BiSolidGraduation /> Courses</Tabs.Trigger>
                        <Tabs.Trigger value='waitlist' fontFamily='PoppinsSemi' gap={2}><FaLink/> Waitlist</Tabs.Trigger>
                        <Tabs.Trigger value='settings' fontFamily='PoppinsSemi' gap={2}><LuSettings /> Settings</Tabs.Trigger>
                        <Tabs.Trigger value="contacts" fontFamily={'PoppinsSemi'} gap={2}> <LuUser /> Contacts</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="builds">
                        <SimpleGrid columns={{base: 1, lg: 2}} gap={8}>
                            {/* List Column */}
                            {filteredBuilds !== null && filteredBuilds.length > 0 &&
                                <VStack align="stretch" gap={4} maxH="80vh" overflowY="auto">
                                    {filteredBuilds.map(build => (
                                        <Box
                                            key={build.id}
                                            p={4}
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
                                                } padding={2} paddingInline={4}>{build.status || 'NEW'}</Badge>
                                                <Text fontSize="xs" color="gray.500">{build.buildId}</Text>
                                            </HStack>
                                            <Heading size="md" mb={1}>{build.title}</Heading>
                                            <Text color="gray.400" fontSize="sm">{build.name} • {build.projectType}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            }

                            {/* Detail Column */}
                            <Box bg="gray.800" p={4} borderRadius="xl" border="1px solid white" borderColor="whiteAlpha.200">
                                {selectedBuild ? (
                                    <Flex align="stretch" gap={4} overflowY="auto" maxH="80vh" justify="center" direction="row" wrap='wrap' style={{padding: '10px'}}>
                                        <Heading size="lg" fontFamily={'PoppinsSemi'} minWidth='100%'>{selectedBuild.title}</Heading>

                                        <HStack gap={4} wrap={'wrap'} align="stretch" justify={'center'}>
                                            <Box>
                                                <Text color="gray.500" fontSize="sm" textAlign={{base: 'center', md: 'left'}}>Client</Text>
                                                <Text fontWeight="bold">{selectedBuild.name}</Text>
                                            </Box>
                                            <Box>
                                                <Text color="gray.500" fontSize="sm" textAlign={{base: 'center', md: 'left'}}>Type</Text>
                                                <Text fontWeight="bold">{selectedBuild.projectType}</Text>
                                            </Box>
                                            <Box maxWidth={'95%'} flexWrap={'wrap'}>
                                                <Text color="gray.500" fontSize="sm" textAlign={{base: 'center', md: 'left'}}>Email</Text>
                                                {selectedBuild.email ? (
                                                    <HStack>
                                                        <Text fontWeight="bold" lineClamp={1} maxW={'95%'} textWrap={'stable'} overflow='hidden'>{selectedBuild.email}</Text>
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
                                                <Text color="gray.500" fontSize="sm" textAlign={{base: 'center', md: 'left'}}>Pages</Text>
                                                <Text fontWeight="bold">{selectedBuild?.pages || '4'}</Text>
                                            </Box>
                                        </HStack>

                                        <Box bg="blackAlpha.500" p={2} borderRadius="md">
                                            <Text fontStyle="italic" color="gray.300">
                                                {selectedBuild?.description}
                                            </Text>
                                        </Box>

                                        <Heading size="sm" mt={4} minW='100%' >Actions</Heading>
                                        <HStack gap={4} flexWrap={'wrap'} wrap={'wrap'} justify="center" style={{padding: '10px'}}>
                                            <Button
                                                colorPalette="green"
                                                onClick={() => handleUpdateStatus(selectedBuild, "progress")}
                                                disabled={selectedBuild.status === 'progress'}
                                                padding={2}
                                                paddingInline={5}
                                                borderRadius={'md'}
                                            >
                                                Start Progress
                                            </Button>
                                            <Button
                                                colorPalette="blue"
                                                onClick={() => handleUpdateStatus(selectedBuild, "complete")}
                                                disabled={selectedBuild.status === 'complete'}
                                                padding={2}
                                                paddingInline={5}
                                                borderRadius={'md'}
                                            >
                                                Mark Complete
                                            </Button>
                                            <Button
                                                colorPalette="red" variant="solid"
                                                onClick={() => {
                                                    const reason = prompt("Enter cancellation reason:");
                                                    if(reason) handleUpdateStatus(selectedBuild, "cancelled", {reason});
                                                }}
                                                padding={2}
                                                paddingInline={5}
                                                borderRadius={'md'}
                                            >
                                                Cancel Build
                                            </Button>
                                            <Button
                                                colorPalette="yellow" variant="subtle"
                                                onClick={() => {
                                                    const message = prompt("Enter update message:");
                                                    if(message) handleUpdateStatus(selectedBuild, "issue", {message});
                                                }}
                                                padding={2}
                                                paddingInline={5}
                                                borderRadius={'md'}
                                            >
                                                Send Update
                                            </Button>
                                        </HStack>

                                        <HStack pt={6} justify="center" wrap={'wrap'}>
                                            {selectedBuild.phone &&
                                                (
                                                    <Button variant="outline" colorPalette={'#00d435'} onClick={() => {
                                                        if(!selectedBuild.phone) return;
                                                        window.open('https://wa.me/' + selectedBuild.phone);
                                                    }}>
                                                        <FaWhatsapp style={{marginRight: "8px"}} /> Chat on WhatsApp
                                                    </Button>
                                                )}

                                            <Button variant="ghost" onClick={() => {
                                                if(!selectedBuild.email) return;
                                                window.open('mailto:' + selectedBuild.email);
                                            }}>
                                                <FaEnvelope style={{marginRight: "8px"}} /> Email Client
                                            </Button>
                                        </HStack>

                                    </Flex>
                                ) : (
                                    <>
                                        <Flex height="100%" align="center" justify="center" direction="column" color="gray.500" p={4} gap={4}>
                                            <FaSearch size={40} />
                                            <Text mt={5}>Select a build to view details</Text>
                                        </Flex>
                                    </>
                                )}
                            </Box>
                        </SimpleGrid>
                    </Tabs.Content>

                    <Tabs.Content value="blogs">
                        <VStack align="stretch" gap={6}>
                            <HStack justify="space-between">
                                <Heading size="md" color="white" fontFamily={'PoppinsSemi'}>Blog Posts</Heading>
                                <Button
                                    bgColor="brandGreen.500"
                                    color='black'
                                    onClick={() => {
                                        setSelectedBlog(null);
                                        setNewBlog({
                                            id: "",
                                            title: "",
                                            excerpt: "",
                                            image: "",
                                            date: null,
                                            slug: "",
                                            category: "Blog"
                                        });
                                        setIsBlogModalOpen(true);
                                    }}
                                    padding={2}
                                    borderRadius={'full'}
                                    _hover={{opacity: .7}}
                                    className='hover-lift'
                                    size={'sm'}
                                >
                                    <FaPlus />
                                </Button>
                            </HStack>

                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
                                {blogs.filter(p => !p.category || p.category === 'Blog').map(post => (
                                    <Box
                                        key={post.id}
                                        bg="whiteAlpha.50"
                                        p={6}
                                        borderRadius="xl"
                                        border="1px solid"
                                        borderColor="whiteAlpha.100"
                                        onClick={() => {
                                            setSelectedBlog(post);
                                            setIsBlogModalOpen(true);
                                        }}
                                        cursor="pointer"
                                        _hover={{borderColor: "brandGreen.500"}}
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
                                            <Button size="xs" variant="outline" onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedBlog(post);
                                                setIsBlogModalOpen(true);
                                            }}>Edit</Button>
                                            <Button size="xs" variant="ghost" colorPalette="red" onClick={(e) => {
                                                e.stopPropagation();
                                                if(confirm("Delete this blog?")) deleteBlog(post.id);
                                            }}>Delete</Button>
                                        </HStack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Tabs.Content>

                    <Tabs.Content value="posts">
                        <VStack align="stretch" gap={6}>
                            <HStack justify="space-between">
                                <Heading size="md" color="white" fontFamily={'PoppinsSemi'}>General Posts</Heading>
                                <Button
                                    bgColor="brandGreen.500"
                                    color='black'
                                    onClick={() => {
                                        setSelectedBlog(null);
                                        setNewBlog({
                                            id: "",
                                            title: "",
                                            excerpt: "",
                                            image: "",
                                            date: null,
                                            slug: "",
                                            category: "Lifestyle"
                                        });
                                        setIsBlogModalOpen(true);
                                    }}
                                    padding={2}
                                    borderRadius={'full'}
                                    _hover={{opacity: .7}}
                                    className='hover-lift'
                                    size={'sm'}
                                >
                                    <FaPlus />
                                </Button>
                            </HStack>

                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
                                {blogs.filter(p => p.category && p.category !== 'Blog').map(post => (
                                    <Box
                                        key={post.id}
                                        bg="whiteAlpha.50"
                                        p={6}
                                        borderRadius="xl"
                                        border="1px solid"
                                        borderColor="whiteAlpha.100"
                                        onClick={() => {
                                            setSelectedBlog(post);
                                            setIsBlogModalOpen(true);
                                        }}
                                        cursor="pointer"
                                        _hover={{borderColor: "brandGreen.500"}}
                                    >
                                        <HStack justify="space-between" mb={3}>
                                            <Badge colorPalette="blue">{post.category}</Badge>
                                            <Text fontSize="xs" color="gray.500">
                                                {post.date?.toDate ? post.date.toDate().toLocaleDateString() : 'Draft'}
                                            </Text>
                                        </HStack>
                                        <Heading size="sm" mb={2} color="white">{post.title}</Heading>
                                        <Text color="gray.400" fontSize="sm" lineClamp={2}>{post.excerpt}</Text>
                                        <HStack mt={4} gap={4}>
                                            <Button size="xs" variant="outline" onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedBlog(post);
                                                setIsBlogModalOpen(true);
                                            }} px={2}>Edit</Button>
                                            <Button size="xs" variant="ghost" colorPalette="red" onClick={(e) => {
                                                e.stopPropagation();
                                                if(confirm("Delete this post?")) deleteBlog(post.id);
                                            }} px={2}>Delete</Button>
                                        </HStack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Tabs.Content>

                    <Tabs.Content value="courses">
                        <VStack align="stretch" gap={6}>
                            <HStack justify="space-between">
                                <Heading size="md" color="white" fontFamily={'PoppinsSemi'}>Courses Management</Heading>
                                <Button colorPalette="brandGreen" onClick={() => setIsCourseModalOpen(true)} padding={2} paddingInline={4}>Add New Course</Button>
                            </HStack>

                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
                                {courses.map(course => (
                                    <Box
                                        key={course.id}
                                        bg="whiteAlpha.50"
                                        p={6}
                                        borderRadius="xl"
                                        border="1px solid"
                                        borderColor="whiteAlpha.100"
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setIsCourseModalOpen(true);
                                        }}
                                        cursor="pointer"
                                        _hover={{borderColor: "brandGreen.500"}}
                                    >
                                        <HStack justify="space-between" mb={3}>
                                            <Badge colorPalette={course.status === 'Live' ? 'green' : 'yellow'}>{course.status}</Badge>
                                            <Text fontSize="xs" color="gray.500">{course.duration}</Text>
                                        </HStack>
                                        <Heading size="sm" mb={2} color="white">{course.title}</Heading>
                                        <Text color="gray.400" fontSize="sm" mb={4} lineClamp={2}>{course.description}</Text>
                                        <HStack justify="space-between">
                                            <Text fontSize="xs" color="brandGreen.400">{course.progress}% Complete</Text>
                                            <Button size="xs" variant="ghost" colorPalette="red" onClick={(e) => {
                                                e.stopPropagation();
                                                if(confirm("Delete this course?")) deleteDoc(doc(db, "courses", course.id));
                                            }}>Delete</Button>
                                        </HStack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Tabs.Content>

                    <Tabs.Content value="waitlist">
                        <VStack align="stretch" gap={6}>
                            <HStack justify="space-between">
                                <Heading size="md" color="white" fontFamily={'PoppinsSemi'}>Waitlist Management</Heading>
                                <Button colorPalette="blue" onClick={handleExportCSV} padding={2} paddingInline={4}>
                                    <FaDownload style={{marginRight: '8px'}} /> Export CSV
                                </Button>
                            </HStack>
                            <Box bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
                                <Table.Root size="sm" variant="line">
                                    <Table.Header bg="whiteAlpha.100">
                                        <Table.Row>
                                            <Table.ColumnHeader color="gray.400">Name</Table.ColumnHeader>
                                            <Table.ColumnHeader color="gray.400">Email</Table.ColumnHeader>
                                            <Table.ColumnHeader color="gray.400">Source</Table.ColumnHeader>
                                            <Table.ColumnHeader color="gray.400">Joined At</Table.ColumnHeader>
                                            <Table.ColumnHeader color="gray.400">Actions</Table.ColumnHeader>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {waitlist.map((entry) => (
                                            <Table.Row key={entry.id} _hover={{bg: "whiteAlpha.50"}}>
                                                <Table.Cell color="white" fontWeight="medium">{entry.name || 'N/A'}</Table.Cell>
                                                <Table.Cell color="gray.300">{entry.email}</Table.Cell>
                                                <Table.Cell>
                                                    <Badge size="xs" colorPalette="brandGreen">{entry.source}</Badge>
                                                </Table.Cell>
                                                <Table.Cell color="gray.400">
                                                    {entry.createdAt?.toDate ? entry.createdAt.toDate().toLocaleString() :
                                                        entry.createdAt?.toDate ? entry.createdAt.toDate().toLocaleString() : 'Recent'}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button size="xs" variant="ghost" colorPalette="red" onClick={() => {
                                                        if(confirm("Delete this entry?")) deleteDoc(doc(db, "waitlist", entry.id));
                                                    }}>Delete</Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                                {waitlist.length === 0 && (
                                    <Box p={10} textAlign="center">
                                        <Text color="gray.500">No entries yet.</Text>
                                    </Box>
                                )}
                            </Box>
                        </VStack>
                    </Tabs.Content>

                    <Tabs.Content value="settings">
                        <VStack align="stretch" gap={8}>
                            <Box>
                                <Heading size="md" mb={4} color="white" fontFamily={'PoppinsSemi'}>Global Announcements</Heading>
                                <VStack gap={4} align="stretch">
                                    {announcements.map(ann => (
                                        <Box key={ann.id} bg="whiteAlpha.50" p={4} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                                            <HStack justify="space-between" mb={3}>
                                                <HStack>
                                                    <Badge colorPalette={ann.isActive ? 'green' : 'gray'}>
                                                        {ann.isActive ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                    <Text color="gray.500" fontSize="xs">ID: {ann.id}</Text>
                                                </HStack>
                                                <Switch.Root
                                                    colorPalette="brandGreen"
                                                    checked={ann.isActive}
                                                    onCheckedChange={({checked}) => handleSaveAnnouncement(ann.id, ann.content, checked)}
                                                >
                                                    <Switch.Control>
                                                        <Switch.Thumb />
                                                    </Switch.Control>
                                                </Switch.Root>
                                            </HStack>
                                            <Textarea
                                                defaultValue={ann.content}
                                                bg="black"
                                                color="white"
                                                fontSize="sm"
                                                borderRadius="lg"
                                                p={3}
                                                onBlur={(e) => {
                                                    if(e.target.value !== ann.content) {
                                                        handleSaveAnnouncement(ann.id, e.target.value, ann.isActive);
                                                    }
                                                }}
                                            />
                                        </Box>
                                    ))}
                                    {announcements.length === 0 && (
                                        <Button
                                            variant="outline"
                                            colorPalette="brandGreen"
                                            onClick={async () => {
                                                await addDoc(collection(db, "announcements"), {
                                                    content: "New Announcement!",
                                                    isActive: false,
                                                    createdAt: serverTimestamp()
                                                });
                                            }}
                                        >
                                            Create First Announcement
                                        </Button>
                                    )}
                                </VStack>
                            </Box>

                            <Box>
                                <Heading size="md" mb={4} color="white" fontFamily={'PoppinsSemi'}>News Ticker</Heading>
                                <Box bg="whiteAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                                    <VStack align="stretch" gap={4}>
                                        <HStack justify="space-between">
                                            <Text color="gray.400" fontSize="sm">Ticker Visibility</Text>
                                            <Switch.Root
                                                colorPalette="brandGreen"
                                                checked={newsTicker?.isActive || false}
                                                onCheckedChange={async ({checked}) => {
                                                    if(newsTicker) {
                                                        await setDoc(doc(db, "news_ticker", "global"), {isActive: checked}, {merge: true});
                                                        toaster.create({title: "News Ticker Status Updated", type: "success"});
                                                    } else {
                                                        await setDoc(doc(db, "news_ticker", "global"), {text: "", isActive: checked});
                                                    }
                                                }}
                                            >
                                                <Switch.Control>
                                                    <Switch.Thumb />
                                                </Switch.Control>
                                            </Switch.Root>
                                        </HStack>
                                        <Box>
                                            <Text color="gray.400" fontSize="sm" mb={2}>Ticker Text (Separate items with | )</Text>
                                            <Input
                                                placeholder="Enter news ticker text..."
                                                defaultValue={newsTicker?.items.join(" | ") || ""}
                                                bg="black"
                                                color="white"
                                                onBlur={async (e) => {
                                                    if(e.target.value !== (newsTicker?.items.join(" | ") || "")) {
                                                        await setDoc(doc(db, "news_ticker", "global"), {
                                                            items: e.target.value.split(" | "),
                                                        }, {merge: true});
                                                        toaster.create({title: "News Ticker Text Updated", type: "success"});
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </VStack>
                                </Box>
                            </Box>
                        </VStack>
                    </Tabs.Content>

                    <Tabs.Content value="contacts">
                        <VStack align="stretch" gap={4}>
                            <Box bg="whiteAlpha.50" borderRadius="full" overflow='hidden' border="1px solid" borderColor="whiteAlpha.100" maxW='600px'>
                                <Input
                                    placeholder="Search contacts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    bg="black"
                                    style={{padding: '10px', paddingInline: '15px'}}
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
                                                <Badge colorPalette={contact.status === 'read' ? 'gray' : 'green'} p={2} px={4}>
                                                    {contact.status}
                                                </Badge>
                                                <Text fontSize="xs" color="gray.500">
                                                    {contact.createdAt?.toString() ? (contact.createdAt?.toDate()).toLocaleDateString() : 'Just now'}
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

            {/* {(selectedContact?.name && selectedContact?.email) || isBlogModalOpen && ( */}
            <Container p={8} position='relative' minWidth='100%'>
                {/* Contact Details Modal Placeholder - For brevity using a simple overlay */}
                {selectedContact && selectedContact !== null && (
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
                            position='relative'
                        >
                            <HStack justify="space-between" mb={6} justifyContent='space-between'>
                                <VStack align="start" gap={1}>
                                    <Heading size="lg" color="white">{selectedContact.name}</Heading>
                                    <Text color="brandGreen.500" fontSize='sm'>{selectedContact.email}</Text>
                                </VStack>
                                <IconButton
                                    onClick={() => setSelectedContact(null)}
                                    aria-label="Close Contact"
                                    size="sm"
                                    variant="ghost"
                                    color="brandGreen.500"
                                >
                                    <FaTimes />
                                </IconButton>
                            </HStack>

                            <VStack align="stretch" gap={6}>
                                <Box>
                                    <Text color="gray.500" fontSize="xs" textTransform="uppercase" fontWeight="bold" mb={2}>Subject</Text>
                                    <Text color="white" fontSize="lg">{selectedContact.subject}</Text>
                                </Box>

                                <Box>
                                    <Text color="gray.500" fontSize="xs" textTransform="uppercase" fontWeight="bold" mb={2}>Message</Text>
                                    <Text color="gray.300" whiteSpace="pre-wrap">{selectedContact?.message}</Text>
                                </Box>

                                <HStack gap={4} pt={4} wrap='wrap'>
                                    <Button
                                        colorPalette="brandGreen"
                                        flex={1}
                                        onClick={async () => {
                                            await updateDoc(doc(db, "contacts", selectedContact?.id), {status: "read"});
                                            setSelectedContact(null);
                                        }}
                                        p={2} px={4}
                                    >
                                        Mark as Read
                                    </Button>
                                    <Button
                                        variant="outline"
                                        flex={1}
                                        onClick={() => window.location.href = `mailto:${selectedContact?.email}?subject=Re: ${selectedContact?.subject}`}
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
                                    value={selectedBlog ? selectedBlog.title : newBlog?.title}
                                    onChange={e => {
                                        if(selectedBlog) {
                                            setSelectedBlog({...selectedBlog, title: e.target.value});
                                        } else if(newBlog) {
                                            setNewBlog({...newBlog, title: e.target.value});
                                        }
                                    }}
                                    bg="black"
                                    style={{padding: 10, borderRadius: '12px'}}

                                />
                                <Input
                                    placeholder="Slug (e.g. future-of-web)"
                                    value={selectedBlog ? selectedBlog.slug : newBlog?.slug}
                                    onChange={e => {
                                        if(selectedBlog) {
                                            setSelectedBlog({...selectedBlog, slug: e.target.value});
                                        } else if(newBlog) {
                                            setNewBlog({...newBlog, slug: e.target.value});
                                        }
                                    }}
                                    bg="black"
                                    style={{padding: 10, borderRadius: '12px'}}
                                />
                                <Box w="full">
                                    <Text color="gray.400" mb={2} fontSize="sm">Category</Text>
                                    <HStack gap={2} flexWrap="wrap">
                                        {["Blog", "Lifestyle", "News", "Announcement"].map(cat => (
                                            <Button
                                                key={cat}
                                                size="xs"
                                                variant={((selectedBlog?.category || newBlog?.category) === cat) ? "solid" : "outline"}
                                                colorPalette="brandGreen"
                                                onClick={() => {
                                                    if(selectedBlog) setSelectedBlog({...selectedBlog, category: cat});
                                                    else if(newBlog) setNewBlog({...newBlog, category: cat});
                                                }}
                                                px={2}
                                                borderRadius="md"
                                            >
                                                {cat}
                                            </Button>
                                        ))}
                                    </HStack>
                                </Box>
                                <Box w="full">
                                    <Text color="gray.400" mb={2} fontSize="sm">Blog Cover Image</Text>
                                    <HStack>
                                        <Input
                                            placeholder="Image URL"
                                            value={selectedBlog ? selectedBlog.image : newBlog?.image}
                                            onChange={e => {
                                                if(selectedBlog) {
                                                    setSelectedBlog({...selectedBlog, image: e.target.value});
                                                } else if(newBlog) {
                                                    setNewBlog({...newBlog, image: e.target.value});
                                                }
                                            }}
                                            bg="black"
                                            flex={1}
                                            style={{padding: 10, borderRadius: '12px'}}

                                        />
                                        <Box position="relative">
                                            <Button
                                                size="md"
                                                colorPalette="brandNavy"
                                                loading={uploadingImage}
                                                onClick={() => document.getElementById('blog-image')?.click()}
                                            >
                                                <FaUpload />
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
                                    value={selectedBlog ? selectedBlog.excerpt : newBlog?.excerpt}
                                    onChange={e => {
                                        if(selectedBlog) {
                                            setSelectedBlog({...selectedBlog, excerpt: e.target.value});
                                        } else if(newBlog) {
                                            setNewBlog({...newBlog, excerpt: e.target.value});
                                        }
                                    }}
                                    bg="black"
                                    rows={10}
                                    style={{padding: 10, borderRadius: '12px'}}

                                />
                                <HStack w="full" gap={4} pt={4}>
                                    <Button flex={1} variant="outline" colorPalette='red'
                                        borderRadius='xl'
                                        _hover={{opacity: .8}}
                                        onClick={() => {
                                            // if(selectedBlog) {
                                            //     setSelectedBlog(null);
                                            // } else if(newBlog) {
                                            //     setNewBlog(null);
                                            // }
                                            setIsBlogModalOpen(false);
                                        }
                                        }>Cancel</Button>
                                    <Button
                                        flex={1}
                                        colorPalette="brandGreen.500"
                                        bgColor='brandGreen.500'
                                        borderRadius='xl'
                                        _hover={{opacity: .8}}
                                        onClick={async () => {
                                            try {
                                                if(selectedBlog) {
                                                    const blogId: string = selectedBlog?.id;
                                                    await setDoc(doc(db, "blogs", blogId),
                                                        {
                                                            ...selectedBlog,
                                                            date: serverTimestamp(),
                                                        }
                                                    );

                                                    toaster.create({
                                                        title: 'Blog Update',
                                                        type: 'success',
                                                        description: `Update successful!`
                                                    });
                                                } else {
                                                    const blogId: string = newBlog?.id || generateBlogId();
                                                    await setDoc(doc(db, "blogs", blogId), {
                                                        id: blogId,
                                                        ...newBlog,
                                                        date: serverTimestamp(),
                                                    });
                                                    toaster.create({
                                                        title: 'Blog Post',
                                                        type: 'success',
                                                        description: `You just created a blog post!`
                                                    });
                                                }
                                                setIsBlogModalOpen(false);
                                                setNewBlog(null);

                                            } catch(err) {
                                                toaster.create({
                                                    title: 'Blog Post Error',
                                                    type: 'error',
                                                    description: `You encountered an error while uploading - ${err ? `- ${err}` : ""}`
                                                });
                                            }
                                        }}
                                    >{selectedBlog ? 'Update Post' : 'Create Post'}</Button>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                )}

                {/* Course Modal */}
                {isCourseModalOpen && (
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
                        onClick={() => {
                            setIsCourseModalOpen(false);
                            setSelectedCourse(null);
                        }}
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
                            maxH="90vh"
                            overflowY="auto"
                        >
                            <Heading size="lg" color="white" mb={6}>{selectedCourse ? 'Edit Course' : 'Create New Course'}</Heading>
                            <VStack gap={4}>
                                <Input
                                    placeholder="Course Title"
                                    value={selectedCourse ? selectedCourse.title : newCourse.title}
                                    onChange={e => {
                                        if(selectedCourse) setSelectedCourse({...selectedCourse, title: e.target.value});
                                        else setNewCourse({...newCourse, title: e.target.value});
                                    }}
                                    bg="black"
                                    style={{padding: 10, borderRadius: '12px'}}
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={selectedCourse ? selectedCourse.description : newCourse.description}
                                    onChange={e => {
                                        if(selectedCourse) setSelectedCourse({...selectedCourse, description: e.target.value});
                                        else setNewCourse({...newCourse, description: e.target.value});
                                    }}
                                    bg="black"
                                    rows={3}
                                    style={{padding: 10, borderRadius: '12px'}}
                                />
                                <HStack w="full">
                                    <VStack align="start" flex={1}>
                                        <Text fontSize="xs" color="gray.500">Status</Text>
                                        <Input
                                            value={selectedCourse ? selectedCourse.status : newCourse.status}
                                            onChange={e => {
                                                if(selectedCourse) setSelectedCourse({...selectedCourse, status: e.target.value});
                                                else setNewCourse({...newCourse, status: e.target.value});
                                            }}
                                            bg="black"
                                            style={{padding: 10, borderRadius: '12px'}}
                                        />
                                    </VStack>
                                    <VStack align="start" flex={1}>
                                        <Text fontSize="xs" color="gray.500">Progress (%)</Text>
                                        <Input
                                            type="number"
                                            value={selectedCourse ? selectedCourse.progress : newCourse.progress}
                                            onChange={e => {
                                                if(selectedCourse) setSelectedCourse({...selectedCourse, progress: parseInt(e.target.value)});
                                                else setNewCourse({...newCourse, progress: parseInt(e.target.value)});
                                            }}
                                            bg="black"
                                            style={{padding: 10, borderRadius: '12px'}}
                                        />
                                    </VStack>
                                </HStack>
                                <HStack w="full">
                                    <VStack align="start" flex={1}>
                                        <Text fontSize="xs" color="gray.500">Duration</Text>
                                        <Input
                                            value={selectedCourse ? selectedCourse.duration : newCourse.duration}
                                            onChange={e => {
                                                if(selectedCourse) setSelectedCourse({...selectedCourse, duration: e.target.value});
                                                else setNewCourse({...newCourse, duration: e.target.value});
                                            }}
                                            bg="black"
                                            style={{padding: 10, borderRadius: '12px'}}
                                        />
                                    </VStack>
                                    <VStack align="start" flex={1}>
                                        <Text fontSize="xs" color="gray.500">Audience</Text>
                                        <Input
                                            value={selectedCourse ? selectedCourse.audience : newCourse.audience}
                                            onChange={e => {
                                                if(selectedCourse) setSelectedCourse({...selectedCourse, audience: e.target.value});
                                                else setNewCourse({...newCourse, audience: e.target.value});
                                            }}
                                            bg="black"
                                            style={{padding: 10, borderRadius: '12px'}}
                                        />
                                    </VStack>
                                </HStack>

                                <HStack w="full" gap={4} pt={4}>
                                    <Button flex={1} variant="outline" onClick={() => {
                                        setIsCourseModalOpen(false);
                                        setSelectedCourse(null);
                                    }}>Cancel</Button>
                                    <Button
                                        flex={1}
                                        colorPalette="brandGreen"
                                        onClick={handleSaveCourse}
                                    >{selectedCourse ? 'Update Course' : 'Create Course'}</Button>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                )}
            </Container>
            {/* )
            } */}
        </Box>
    );
}
