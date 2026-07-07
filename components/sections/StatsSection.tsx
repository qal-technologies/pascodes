"use client";

import {Box, Container, SimpleGrid, Text, Heading, VStack, HStack, Icon} from "@chakra-ui/react";
import {motion, useInView} from "framer-motion";
import {useRef, useState, useEffect} from "react";
import {FaCode, FaUsers, FaStar} from "react-icons/fa";

const MotionHeading = motion.create(Heading);

const Counter = ({value, duration = 2}: {value: number, duration?: number}) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            if (start === end) return;

            let totalMiliseconds = duration * 1000;
            let incrementTime = (totalMiliseconds / end);

            let timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);
        }
    }, [isInView, value, duration]);

    return <span ref={ref} style={{fontSize: '1.8rem'}}>{count}</span>;
};

const StatItem = ({icon, label, value, suffix = " +"}: {icon: any, label: string, value: number, suffix?: string}) => (
    <VStack 
        p={8} 
        bg="whiteAlpha.50" 
        borderRadius="3xl" 
        border="1px solid" 
        borderColor="whiteAlpha.100"
        transition="all 0.3s"
        _hover={{transform: "translateY(-10px)", borderColor: "brandGreen.500/50", bg: "whiteAlpha.100"}}
        className="hover-lift"
        align="center"
        gap={4}
        gradientFrom ='whiteAlpha.50/10'
        gradientTo='blue.200/5'
        bgGradient='to-br'
        backdropFilter="blur(10px)"
    >
        <Box p={4} bg="brandGreen.500/10" borderRadius="2xl" color="brandGreen.500">
            <Icon as={icon} size={{base: "xl", md: "2xl"}} className="neon-text" />
        </Box>
        <VStack gap={0}>
            <Heading size={{base: "2xl", md: "3xl"}} color="white" fontFamily="PoppinsBold">
                <Counter value={value} />{suffix}
            </Heading>
            <Text color="gray.500" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" fontSize="xs">
                {label}
            </Text>
        </VStack>
    </VStack>
);

export default function StatsSection () {
    return (
        <Box py={24} bg="background" position="relative" overflow="hidden" minW={'100vw'} placeSelf={'center'} id='stats-section'>
            {/* Background Glow */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="600px"
                h="600px"
                bg="brandGreen.500/5"
                filter="blur(120px)"
                borderRadius="full"
                pointerEvents="none"
            />

            <Container maxW="container.xl" position="relative" zIndex={1} alignSelf='center' placeItems='center' justifySelf={'center'}>
                <VStack gap={16}>
                    <VStack gap={4} textAlign="center" px={10}>
                        <Text color="brandGreen.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                            Our Track Record
                        </Text>
                        <Heading size="3xl" color="white" fontFamily="PoppinsSemi" maxW="2xl" fontSize={{base: "2xl", md: "3xl"}}>
                            Delivering Excellence Through <Text as="span" color="brandGreen.500" fontSize={{base: "2xl", md: "3xl"}} className='neon-text' fontFamily="PoppinsBold">Innovation</Text>
                        </Heading>
                        <Text color="gray.400" maxW="xl" fontSize="lg">
                            We pride ourselves on building robust digital solutions that drive real business results and empower the tech community.
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{base: 1, md: 3}} gap={10} w="full" px={10}>
                        <StatItem icon={FaCode} label="Projects Completed" value={150} />
                        <StatItem icon={FaUsers} label="Happy Clients" value={85} />
                        <StatItem icon={FaStar} label="Average Rating" value={5} suffix="/5" />
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}
