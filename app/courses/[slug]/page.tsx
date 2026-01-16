import {db} from "@/lib/firebase";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {Metadata} from "next";
import {Box, Container, Heading, Text, VStack, SimpleGrid, Badge, Progress, HStack, Separator} from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import {Reveal} from "@/components/utils/Reveal";
import {notFound} from "next/navigation";
import {FaClock, FaUserGraduate, FaCalendarAlt, FaVideo} from "react-icons/fa";
import Footer from "@/components/layout/Footer";

interface CourseData {
  title: string;
  description: string;
  status: string;
  progress: number;
  launchDate: string;
  duration: string;
  audience: string;
  languages: string[];
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
      title: `${course.title} | PasCodez Courses`,
      description: course.description,
    }
  };
}

export default async function CoursePage ({params}: {params: Promise<{slug: string;}>;}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  if(!course) notFound();

  return (
    <Box bg="background" minH="100vh">
      <Navbar />

      <Box pt={32} pb={20}>
        <Container maxW="container.lg">
          <Reveal>
            <VStack align="start" gap={10}>
              <VStack align="start" gap={4} width="full">
                <HStack gap={4}>
                  <Badge colorPalette="green" variant="solid" size="lg" px={3} py={1} borderRadius="full">
                    Coming Soon
                  </Badge>
                  <Badge colorPalette="blue" variant="subtle" size="lg" px={3} py={1} borderRadius="full">
                    <HStack gap={2}>
                      <FaVideo /> {course.status}
                    </HStack>
                  </Badge>
                </HStack>
                <Heading size="4xl" color="foreground" fontFamily="PoppinsBold">{course.title}</Heading>
                <Text color="gray.400" fontSize="xl" lineHeight="tall" maxW="3xl">
                  {course.description}
                </Text>
              </VStack>

              <SimpleGrid columns={{base: 1, md: 2, lg: 4}} gap={8} width="full">
                <Box p={6} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
                  <HStack color="brandGreen.400" mb={2}><FaClock /> <Text fontWeight="bold">Duration</Text></HStack>
                  <Text color="gray.300" fontSize="lg">{course.duration}</Text>
                </Box>
                <Box p={6} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
                  <HStack color="brandGreen.400" mb={2}><FaUserGraduate /> <Text fontWeight="bold">Level</Text></HStack>
                  <Text color="gray.300" fontSize="lg">{course.audience}</Text>
                </Box>
                <Box p={6} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
                  <HStack color="brandGreen.400" mb={2}><FaCalendarAlt /> <Text fontWeight="bold">Launch</Text></HStack>
                  <Text color="gray.300" fontSize="lg">{course.launchDate}</Text>
                </Box>
                <Box p={6} bg="whiteAlpha.50" borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
                  <HStack color="brandGreen.400" mb={2}><FaVideo /> <Text fontWeight="bold">Progress</Text></HStack>
                  <Progress.Root value={course.progress} width="100%" size="sm" mt={2}>
                    <Progress.Track bg="gray.700" borderRadius="full">
                      <Progress.Range colorPalette="brandGreen" bgColor="brandGreen.500" borderRadius="full" />
                    </Progress.Track>
                  </Progress.Root>
                  <Text fontSize="xs" color="gray.500" mt={2}>{course.progress}% recorded</Text>
                </Box>
              </SimpleGrid>

              <Box width="full" p={8} bg="brandGreen.900/20" borderRadius="3xl" border="1px solid" borderColor="brandGreen.500/20">
                <Heading size="md" color="white" mb={6} textTransform="uppercase" letterSpacing="widest">What you&apos;ll learn</Heading>
                <SimpleGrid columns={{base: 1, md: 2}} gap={4}>
                  {course.languages.map((lang, i) => (
                    <HStack key={i} gap={3}>
                      <Box w={2} h={2} bg="brandGreen.500" borderRadius="full" />
                      <Text color="gray.300" fontSize="lg">{lang}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>

              <Separator borderColor="whiteAlpha.100" />

              <Box w="full" textAlign="center">
                <Text color="gray.400" mb={4}>This course is currently in development. Join the waitlist to be notified upon release.</Text>
                <Box as="button" px={8} py={4} bg="brandGreen.500" color="black" fontWeight="bold" borderRadius="xl" _hover={{bg: "brandGreen.400", transform: "translateY(-2px)"}} transition="all 0.2s">
                  Join Waitlist
                </Box>
              </Box>
            </VStack>
          </Reveal>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
