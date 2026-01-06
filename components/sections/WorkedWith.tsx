"use client";

import { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Stat, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Stats {
  projectsCompleted: number;
  peopleWorkedWith: number;
  starRating: number;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20
    },
  }),
};

export default function WorkedWith() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "settings"));
        const statsData = querySnapshot.docs[0].data() as Stats;
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching stats: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <Text>Loading stats...</Text>;
  }

  const statsList = [
    {label: "Projects Completed", value: stats?.projectsCompleted},
    {label: "People Worked With", value: stats?.peopleWorkedWith},
    {label: "Star Rating", value: stats?.starRating}
  ]

  return (
    <Box py={20}>
      <Heading as="h2" size="2xl" textAlign="center" mb={10}>
        My Track Record
      </Heading>
      <SimpleGrid columns={{base: 1, md: 3}} gap={10}>
        {statsList.map((stat, i) => (
            <motion.div
            key={stat.label}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            >
                <Stat.Root p={6} bg="gray.800" borderRadius="lg" textAlign="center">
              <Stat.ValueText fontSize="5xl">{stat.value}{stat.label === "Star Rating" && "+"}</Stat.ValueText>
                    <Stat.Label fontSize="lg">{stat.label}</Stat.Label>
                </Stat.Root>
            </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
