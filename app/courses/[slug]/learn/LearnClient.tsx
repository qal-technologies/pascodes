"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Badge,
  Progress,
  Separator,
  RadioGroup,
  Flex,
} from "@chakra-ui/react";
import ProtectedMedia from "@/components/ui/ProtectedMedia";
import ContentProtector from "@/components/utils/ContentProtector";
import { FaPlayCircle, FaCheckCircle, FaFilePdf, FaQuestionCircle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface LearnClientProps {
  course: any;
}

export default function LearnClient({ course }: LearnClientProps) {
  const sections = course?.sections || [
    {
      id: "1",
      title: "Introduction & Setup",
      description: "Getting started with the course architecture.",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      videoType: "upload",
      resources: [{ title: "Course Slides PDF", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }],
      quizzes: [
        {
          question: "What language is used for Next.js App Router?",
          options: ["TypeScript/JavaScript", "Python", "Ruby", "C++"],
          answer: "TypeScript/JavaScript",
        },
      ],
    },
  ];

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const activeSection = sections[activeSectionIndex] || sections[0];
  const progressPercent = Math.round((completedSections.length / sections.length) * 100) || 0;

  const toggleComplete = (id: string) => {
    if (completedSections.includes(id)) {
      setCompletedSections(completedSections.filter((s) => s !== id));
    } else {
      setCompletedSections([...completedSections, id]);
    }
  };

  const handleQuizSubmit = () => {
    let score = 0;
    activeSection.quizzes?.forEach((q: any, i: number) => {
      if (selectedQuizAnswers[i] === q.answer) score++;
    });
    setQuizScore(score);
  };

  return (
    <ContentProtector>
      <Box bg="black" minH="100vh" color="white">
        {/* Header */}
        <Box borderBottom="1px solid" borderColor="whiteAlpha.200" px={6} py={4} bg="gray.900">
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <HStack gap={4}>
              <Link href={`/courses/${course?.slug || ""}`}>
                <Button size="sm" variant="outline" colorPalette="gray">
                  <FaArrowLeft style={{ marginRight: "6px" }} /> Exit Classroom
                </Button>
              </Link>
              <Heading size="md" color="white">
                {course?.title || "Course Portal"}
              </Heading>
            </HStack>

            <HStack gap={6}>
              <Box minW="150px">
                <Text fontSize="xs" color="gray.400" mb={1}>
                  Your Progress: {progressPercent}%
                </Text>
                <Progress.Root value={progressPercent} size="sm">
                  <Progress.Track bg="gray.800">
                    <Progress.Range colorPalette="brandGreen" bgColor="brandGreen.500" />
                  </Progress.Track>
                </Progress.Root>
              </Box>
            </HStack>
          </Flex>
        </Box>

        {/* Main Classroom Layout */}
        <SimpleGrid columns={{ base: 1, lg: 4 }} minH="calc(100vh - 75px)">
          {/* Main Video & Content Stage */}
          <Box gridColumn={{ lg: "span 3" }} p={{ base: 4, md: 8 }} borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100">
            <VStack align="stretch" gap={6}>
              {/* Media Player */}
              <Box bg="black" borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.200">
                {activeSection?.videoUrl ? (
                  <ProtectedMedia src={activeSection.videoUrl} type="video" />
                ) : (
                  <Box p={20} textAlign="center" color="gray.500">
                    No video available for this lesson.
                  </Box>
                )}
              </Box>

              {/* Lesson Controls & Description */}
              <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                <VStack align="start" gap={1}>
                  <Badge colorPalette="brandGreen">{`Lesson ${activeSectionIndex + 1} of ${sections.length}`}</Badge>
                  <Heading size="lg" color="white">
                    {activeSection?.title}
                  </Heading>
                </VStack>

                <Button
                  colorPalette={completedSections.includes(activeSection?.id) ? "green" : "gray"}
                  variant={completedSections.includes(activeSection?.id) ? "solid" : "outline"}
                  onClick={() => toggleComplete(activeSection?.id)}
                  borderRadius="full"
                  px={6}
                >
                  <FaCheckCircle style={{ marginRight: "8px" }} />
                  {completedSections.includes(activeSection?.id) ? "Completed" : "Mark Complete"}
                </Button>
              </Flex>

              <Separator borderColor="whiteAlpha.100" />

              <Text color="gray.300" fontSize="md" lineHeight="relaxed">
                {activeSection?.description || "No description provided for this lesson."}
              </Text>

              {/* Resources & PDF Section */}
              {activeSection?.resources && activeSection.resources.length > 0 && (
                <Box mt={4} p={6} bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                  <Heading size="sm" color="white" mb={4}>
                    Lesson Documents & PDFs
                  </Heading>
                  <VStack align="stretch" gap={3}>
                    {activeSection.resources.map((res: any, idx: number) => (
                      <HStack key={idx} justify="space-between" p={3} bg="blackAlpha.400" borderRadius="lg">
                        <HStack gap={3}>
                          <FaFilePdf color="#E53E3E" size={20} />
                          <Text color="white" fontSize="sm" fontWeight="medium">
                            {res.title}
                          </Text>
                        </HStack>
                        <ProtectedMedia src={res.url} type="pdf" />
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}

              {/* Quizzes Section */}
              {activeSection?.quizzes && activeSection.quizzes.length > 0 && (
                <Box mt={4} p={6} bg="brandGreen.900/10" borderRadius="xl" border="1px solid" borderColor="brandGreen.500/20">
                  <Heading size="sm" color="brandGreen.400" mb={4}>
                    Lesson Assessment & Quiz
                  </Heading>
                  {activeSection.quizzes.map((quiz: any, qIdx: number) => (
                    <VStack key={qIdx} align="start" gap={3} mb={6}>
                      <Text fontWeight="bold" color="white">
                        Q{qIdx + 1}: {quiz.question}
                      </Text>
                      <RadioGroup.Root
                        value={selectedQuizAnswers[qIdx] || ""}
                        onValueChange={(details) => {
                          const val = typeof details === "string" ? details : details.value;
                          if (val) setSelectedQuizAnswers({ ...selectedQuizAnswers, [qIdx]: val });
                        }}
                      >
                        <VStack align="start" gap={2}>
                          {quiz.options.map((opt: string, oIdx: number) => (
                            <RadioGroup.Item key={oIdx} value={opt}>
                              <RadioGroup.ItemText color="gray.300">{opt}</RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </VStack>
                      </RadioGroup.Root>
                    </VStack>
                  ))}
                  <Button colorPalette="brandGreen" onClick={handleQuizSubmit} borderRadius="xl">
                    Submit Quiz
                  </Button>
                  {quizScore !== null && (
                    <Text mt={4} color="brandGreen.400" fontWeight="bold">
                      Your Score: {quizScore} / {activeSection.quizzes.length}
                    </Text>
                  )}
                </Box>
              )}
            </VStack>
          </Box>

          {/* Collapsible Classroom Sidebar */}
          <Box p={4} bg="gray.900" overflowY="auto" maxH="calc(100vh - 75px)">
            <Heading size="sm" color="gray.400" mb={4} textTransform="uppercase" letterSpacing="wider">
              Course Content
            </Heading>
            <VStack align="stretch" gap={2}>
              {sections.map((sec: any, idx: number) => {
                const isActive = idx === activeSectionIndex;
                const isDone = completedSections.includes(sec.id);
                return (
                  <Box
                    key={sec.id}
                    p={4}
                    borderRadius="xl"
                    bg={isActive ? "brandGreen.900/40" : "whiteAlpha.50"}
                    border="1px solid"
                    borderColor={isActive ? "brandGreen.500" : "transparent"}
                    cursor="pointer"
                    onClick={() => setActiveSectionIndex(idx)}
                    _hover={{ bg: "whiteAlpha.100" }}
                  >
                    <HStack justify="space-between">
                      <HStack gap={3}>
                        <FaPlayCircle color={isActive ? "#32CD32" : "gray"} />
                        <VStack align="start" gap={0}>
                          <Text fontSize="sm" fontWeight={isActive ? "bold" : "normal"} color={isActive ? "white" : "gray.300"}>
                            {sec.title || `Section ${idx + 1}`}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            Lesson {idx + 1}
                          </Text>
                        </VStack>
                      </HStack>
                      {isDone && <FaCheckCircle color="#32CD32" size={14} />}
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </ContentProtector>
  );
}
