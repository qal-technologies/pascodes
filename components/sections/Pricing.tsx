"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Slider,
  Button,
  List,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaCheckCircle } from "react-icons/fa";

interface PricingTier {
  id: string;
  title: string;
  price: number;
  description: string;
  bonus: string[];
  pages?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
    },
  }),
};

export default function Pricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "settings"));
        const tiersData = querySnapshot.docs.map(
          (doc) => doc.data() as PricingTier
        );
        setTiers(tiersData);
      } catch (error) {
        console.error("Error fetching pricing tiers: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTiers();
  }, []);

  const handleSliderChange = (value: number, tierId: string) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.id === tierId
          ? { ...tier, pages: value, price: tier.price * value }
          : tier
      )
    );
  };

  if (isLoading) {
    return <Text>Loading pricing...</Text>;
  }

  return (
    <Box py={20}>
      <Heading as="h2" size="2xl" textAlign="center" mb={10}>
        Pricing
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <Flex
              direction="column"
              p={8}
              bg="gray.800"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
            >
              <Text fontSize="2xl" fontWeight="bold">
                {tier.title}
              </Text>
              <Text fontSize="4xl" fontWeight="bold" my={4}>
                ${tier.price}
                {tier.pages && <>/ {tier.pages} pages</>}
              </Text>
              <Text color="gray.400">{tier.description}</Text>
              <List.Root spacing={2} my={6}>
                {tier.bonus.map((item) => (
                  <List.Item key={item}>
                    <List.Icon as={FaCheckCircle} color="green.500" />
                    {item}
                  </List.Item>
                ))}
              </List.Root>
              {tier.title.toLowerCase().includes("website") ||
              tier.title.toLowerCase().includes("app") ? (
                <Slider.Root
                  defaultValue={[4]}
                  min={4}
                  max={100}
                  onValueChange={(value) => handleSliderChange(value[0], tier.id)}
                >
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider.Control>
                </Slider.Root>
              ) : null}
              <Button mt="auto" colorScheme="green">
                Get my {tier.title}
              </Button>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
