"use client";

/*import CourseLayout from "@/components/courses/CourseLayout";
import VideoPlayer from "@/components/courses/VideoPlayer";
import ResourceDownloader from "@/components/courses/ResourceDownloader";
import { Box, Heading, VStack, Tab, TabList, TabPanel, Tabs } from "@chakra-ui/react";*/

import {View, Text} from 'react-native';

export default function CoursePage() {
  
  const course = {
    title: "",
    videoSrc: "",
    resources: [],
    assignments: [],
    tests: [],
  };
  return (
    {/*<CourseLayout>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl">
          {course.title}
        </Heading>
        <VideoPlayer src={course.videoSrc} />
        <Tabs>
            <TabList>
                <Tab>Resources</Tab>
                <Tab>Assignments</Tab>
                <Tab>Tests</Tab>
            </TabList>
            
<TabPanels>
                <TabPanel>
                    <ResourceDownloader resources={course.resources} />
                </TabPanel>
                <TabPanel>
                    {course.assignments.map(assignment => (
                        <Box key={assignment.title}>
                            <Heading size="md">{assignment.title}</Heading>
                            <p>{assignment.content}</p>
                        </Box>
                    ))}
                </TabPanel>
                <TabPanel>
                {course.tests.map(test => (
                        <Box key={test.title}>
                            <Heading size="md">{test.title}</Heading>
                            <p>{test.content}</p>
                        </Box>
                    ))}
                </TabPanel>
            </TabPanels>

        </Tabs>
      </VStack>
    </CourseLayout>
*/}

<View><Text>Course slug</Text><View>
  );
}
