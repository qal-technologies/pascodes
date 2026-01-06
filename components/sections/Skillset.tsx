"use client";

import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "React Native", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "GitHub", icon: <FaGithub /> },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function Skillset() {
  return (
    <Box py={20}>
      <Heading as="h2" size="2xl" textAlign="center" mb={10}>
        My Skillset
      </Heading>
      <SimpleGrid columns={{base: 2, md: 5}} gap={10}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              p={6}
              bg="gray.800"
              borderRadius="lg"
              _hover={{ bg: "gray.700", transform: "scale(1.05)" }}
              transition="all 0.2s"
            >
              <Box fontSize="5xl" mb={4}>
                {skill.icon}
              </Box>
              <Text fontSize="lg">{skill.name}</Text>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
