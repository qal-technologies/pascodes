import {db} from "@/lib/firebase";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {Metadata} from "next";
import {Box, Container, Heading, Text, VStack, SimpleGrid, Badge, Progress, HStack, Separator, Accordion, List, Icon} from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {notFound} from "next/navigation";
import {FaClock, FaUserGraduate, FaCalendarAlt, FaVideo, FaBook, FaQuestionCircle, FaTasks, FaYoutube} from "react-icons/fa";
import Footer from "@/components/layout/Footer";

interface CourseSection {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoType: 'upload' | 'youtube';
  resources?: {title: string; url: string;}[];
  quizzes?: {question: string; options: string[]; answer: string;}[];
  assignments?: {title: string; description: string;}[];
}

interface CourseData {
  title: string;
  slug: string;
  description: string;
  status: string;
  progress: number;
  launchDate: string;
  duration: string;
  audience: string;
  languages: string[];
  sections?: CourseSection[];
}

async function getCourse (slug: string): Promise<CourseData | null> {
  const q = query(collection(db, "courses"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);

  if(snapshot.empty) return null;

  return snapshot.docs[0].data() as CourseData;
}

export async function generateMetadata ({params}: {params: Promise<{slug: string;}>;}): Promise<Metadata> {
  const {slug} = await params;
  const course = await getCourse(slug);

  if(!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | PoshCodes Courses`,
      description: course.description,
    }
  };
}

const YouTubeEmbed = ({url}: {url: string;}) => {
  let videoId = "";
  if(url.includes("youtube.com/watch?v=")) videoId = url.split("v=")[1].split("&")[0];
  else if(url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];

  if(!videoId) return <Text color="red.400">Invalid YouTube URL</Text>;

  return (
    <Box position="relative" pb="56.25%" h={0} overflow="hidden" borderRadius="2xl" className="neon-glow-primary">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
        title="YouTube video player"
      />
    </Box>
  );
};

export default async function CoursePage ({params}: {params: Promise<{slug: string;}>;}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  if(!course) notFound();

  return (
    <Box bg="background" minH="100vh">
      <Navbar />

      <Box pt={32} pb={20}>
        <Container maxW="container.xl">
          <Reveal>
            <SimpleGrid columns={{base: 1, lg: 3}} gap={10}>
              {/* Main Content Area */}
              <Box gridColumn={{lg: "span 2"}}>
                <VStack align="start" gap={8}>
                  <VStack align="start" gap={4} width="full">
                    <HStack gap={4}>
                      <Badge colorPalette="green" variant="solid" px={3} py={1} borderRadius="full">
                        Featured
                      </Badge>
                      <Badge colorPalette="blue" variant="subtle" px={3} py={1} borderRadius="full">
                        <HStack gap={2}>
                          <FaVideo /> {course.status}
                        </HStack>
                      </Badge>
                    </HStack>
                    <Heading size="4xl" color="foreground" fontFamily="PoppinsBold">{course.title}</Heading>
                    <Text color="gray.400" fontSize="lg" maxW="3xl">
                      {course.description}
                    </Text>
                  </VStack>

                  {/* Video Player or Preview */}
                  {course.sections && course.sections.length > 0 && course.sections[0].videoUrl ? (
                    <Box w="full">
                      {course.sections[0].videoType === 'youtube' ? (
                        <YouTubeEmbed url={course.sections[0].videoUrl} />
                      ) : (
                          <Box border="1px solid" borderColor="whiteAlpha.100" borderRadius="2xl" overflow="hidden" className="neon-glow-primary">
                            <video
                              src={course.sections[0].videoUrl}
                              controls
                              style={{width: '100%', display: 'block'}}
                            />
                          </Box>
                      )}
                    </Box>
                  ) : (
                    <Box w="full" h="400px" bg="whiteAlpha.50" borderRadius="2xl" display="flex" alignItems="center" justifyContent="center" border="1px dashed" borderColor="whiteAlpha.200">
                      <VStack color="gray.500">
                        <FaVideo size={40} />
                        <Text>Preview coming soon</Text>
                      </VStack>
                    </Box>
                  )}

                  <Box w="full">
                    <Heading size="lg" color="white" mb={6}>Current Curriculum</Heading>
                    <Accordion.Root variant="subtle" multiple defaultValue={["0"]}>
                      {(course.sections || []).map((section, idx) => (
                        <Accordion.Item key={section.id} value={idx.toString()} border="1px solid" borderColor="whiteAlpha.100" borderRadius="xl" mb={4} p={2} bg="whiteAlpha.50" _hover={{bg: "whiteAlpha.100"}}>
                          <Accordion.ItemTrigger>
                            <HStack justify="space-between" w="full">
                              <HStack gap={4}>
                                <Box w={8} h={8} display="flex" alignItems="center" justifyContent="center" bg="brandGreen.500" color="black" borderRadius="full" fontWeight="bold" fontSize="sm">
                                  {idx + 1}
                                </Box>
                                <VStack align="start" gap={0}>
                                  <Text fontWeight="bold" fontSize="md" color="white">{section.title || "Untitled Section"}</Text>
                                  <Text fontSize="xs" color="gray.500">Lesson {idx + 1}</Text>
                                </VStack>
                              </HStack>
                              <HStack gap={4} mr={4}>
                                {section.videoUrl && (section.videoType === 'youtube' ? <FaYoutube color="#FF0000" /> : <FaVideo />)}
                              </HStack>
                            </HStack>
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <VStack align="start" p={4} gap={4}>
                              <Text color="gray.400" fontSize="sm">{section.description}</Text>

                              <SimpleGrid columns={{base: 1, sm: 3}} gap={4} w="full">
                                <HStack p={2} bg="blackAlpha.300" borderRadius="md" gap={2}>
                                  <FaBook size={12} color="var(--chakra-colors-blue-400)" />
                                  <Text fontSize="xs" color="gray.300">Resources: {section.resources?.length || 0}</Text>
                                </HStack>
                                <HStack p={2} bg="blackAlpha.300" borderRadius="md" gap={2}>
                                  <FaQuestionCircle size={12} color="var(--chakra-colors-brandGreen-400)" />
                                  <Text fontSize="xs" color="gray.300">Quizzes: {section.quizzes?.length || 0}</Text>
                                </HStack>
                                <HStack p={2} bg="blackAlpha.300" borderRadius="md" gap={2}>
                                  <FaTasks size={12} color="var(--chakra-colors-orange-400)" />
                                  <Text fontSize="xs" color="gray.300">Assignments: {section.assignments?.length || 0}</Text>
                                </HStack>
                              </SimpleGrid>
                            </VStack>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </Box>
                </VStack>
                </Box>

              {/* Sidebar Info */}
              <Box>
                <VStack gap={8} position="sticky" top="120px">
                  <Box p={8} bg="whiteAlpha.50" borderRadius="3xl" border="1px solid" borderColor="whiteAlpha.100" w="full">
                    <VStack align="stretch" gap={6}>
                      <Box>
                        <HStack color="brandGreen.400" mb={1}><FaClock /> <Text fontWeight="bold" fontSize="sm">Duration</Text></HStack>
                        <Text color="white" fontSize="lg">{course.duration}</Text>
                      </Box>
                      <Box>
                        <HStack color="brandGreen.400" mb={1}><FaUserGraduate /> <Text fontWeight="bold" fontSize="sm">Level</Text></HStack>
                        <Text color="white" fontSize="lg">{course.audience}</Text>
                      </Box>
                      <Box>
                        <HStack color="brandGreen.400" mb={1}><FaCalendarAlt /> <Text fontWeight="bold" fontSize="sm">Launch Date</Text></HStack>
                        <Text color="white" fontSize="lg">{course.launchDate}</Text>
                      </Box>

                      <Separator borderColor="whiteAlpha.100" />

                      <Box>
                        <Text color="gray.500" fontSize="xs" mb={2}>Course Completion</Text>
                        <Progress.Root value={course.progress} width="100%" size="sm" mt={2}>
                          <Progress.Track bg="gray.700" borderRadius="full">
                            <Progress.Range colorPalette="brandGreen" bgColor="brandGreen.500" borderRadius="full" />
                          </Progress.Track>
                        </Progress.Root>
                        <Text fontSize="xs" color="brandGreen.500" mt={2} textAlign="right" fontWeight="bold">{course.progress}% Recorded</Text>
                      </Box>

                      <Box as="button" w="full" py={4} bg="brandGreen.500" color="black" fontWeight="bold" borderRadius="xl" className="hover-lift neon-glow-accent"
                        aria-label="Join Course Waitlist"
                        title="Sign up for course updates"
                      >
                        Join Waitlist
                      </Box>
                    </VStack>
                  </Box>

                  <Box p={8} bg="brandGreen.900/20" borderRadius="3xl" border="1px solid" borderColor="brandGreen.500/20" w="full">
                    <Heading size="sm" color="white" mb={4} textTransform="uppercase" letterSpacing="widest">Technologies</Heading>
                    <SimpleGrid columns={2} gap={2}>
                      {course.languages.map((lang, i) => (
                          <HStack key={i} gap={2}>
                            <Box w={1.5} h={1.5} bg="brandGreen.500" borderRadius="full" />
                            <Text color="gray.400" fontSize="xs">{lang}</Text>
                          </HStack>
                        ))}
                    </SimpleGrid>
                  </Box>
                </VStack>
              </Box>
            </SimpleGrid>
          </Reveal>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
