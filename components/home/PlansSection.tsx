"use client";

import {Box, Button, Container, Flex, Heading, List, Text, VStack} from "@chakra-ui/react";
import {FaCheckCircle} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {Reveal} from "../utils/Reveal";

const plans = [
    {
        title: "Basic / Portfolio",
        basePrice: "500+",
        description: "Perfect for personal brands and portfolios.",
        features: ["4+ Pages", "Responsive Design", "Contact Form", "Basic SEO"],
        type: "portfolio",
        pages: 4
    },
    {
        title: "Business / Corporate",
        basePrice: "1000+",
        description: "Scalable solutions for growing businesses.",
        features: ["8+ Pages", "CMS Integration", "Analytics", "Priority Support", "Email Setup"],
        type: "business",
        pages: 8,
        color: 'rgba(200, 50, 255)',
    },
    {
        title: "E-Commerce / Web App",
        basePrice: "2000+",
        description: "Full-featured online stores and applications.",
        features: ["Unlimited Pages", "Payment Gateway", "User Auth", "Database Integration", "Admin Panel"],
        type: "e-commerce",
        pages: 10,
        color: 'rgba(255, 150, 50)',
    }
];

export default function PlansSection () {
    const router = useRouter();

    const handleSelectPlan = (plan: typeof plans[0]) => {
        router.push(`/build?type=${plan.type}&pages=${plan.pages}`);
    };

    type gettingColor = {
        type?: 'border' | 'shadow' | 'background',
        color: string,
        fallback: string | any;
        alpha?: number;
    };


    const getColor = (color?: string, type?: 'border' | 'shadow' | 'background', fallback?: string, alpha?: number): string | any => {
        if(!color) {
            if(fallback) return fallback;
            return;
        }

        if(color) {
            const colorType = () => {
                if(color.startsWith('rgb')) return 'rgb';
                else if(color.startsWith('#')) return 'hex';
                else return 'name';
            };

            const ALPHA = () => {
                switch(type) {
                    case 'border':
                        return alpha || 0.8;
                        break;
                    case 'shadow':
                        return alpha || 0.2;
                        break;
                    case 'background':
                        return alpha || 1;
                        break;
                    default:
                        return alpha || 1;
                        break;
                }
            };

            switch(colorType()) {
                case 'rgb':
                    const trimed = color.slice(0, color.length - 1);
                    const merged = `${trimed}, ${alpha ? alpha : ALPHA()})`;
                    return merged;
                    break;
                default:
                    return fallback || 'black';
                    break;
            }
        };
    };

    return (
        <Box py={20} bg="gray.900" id="plans">
            <Container maxW="container.xl">
                <Reveal width='100%'>
                    <Text
                        fontSize={{base: "3xl", md: "4xl"}}
                        fontWeight="bold"
                        color="brandGreen.500"
                        fontFamily="PoppinsSemi"
                        className="neon-text"
                        textAlign={'center'}
                    >
                        Choose Your Path
                    </Text>
                </Reveal>
                <Reveal delay={0.4} width='100%' >
                    <Text fontSize={{base: "md", md: "lg"}} color="gray.200" maxW="4xl" mb={16}
                        textAlign={'center'} alignSelf='center'
                    >
                        Transparent pricing packages tailored to your needs. All plans include my core commitment to quality and performance.
                    </Text>
                </Reveal>

                <Flex direction={'row'} gap={8} justify="space-evenly" align='center' p={10} wrap={'wrap'}>
                    {plans.map((plan, index) => (
                        <Reveal key={index} delay={0.2 * index} glow width="fit-content" glowRadius={30}>
                            <VStack
                                p={8}
                                borderRadius="4xl"
                                flex={1}
                                align="stretch"
                                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                    borderColor: getColor(plan.color, 'border', 'brandGreen.500'),
                                    transform: "translateY(-12px)",
                                    boxShadow: `0 15px 30px ${getColor(plan.color, 'shadow', 'rgba(58, 238, 187, 0.2)')}`
                                }}
                                maxW={350}
                                className="glass-panel hover-lift"
                            >
                                <Text color={getColor(plan.color, 'background', 'brandGreen.500')} fontWeight="bold" fontSize="sm" letterSpacing="widest" textTransform="uppercase">
                                    {plan.title}
                                </Text>
                                <Text color="white" fontSize="4xl" fontWeight="bold" my={4}>
                                    ${plan.basePrice}

                                </Text>
                                <Text color="gray.400" mb={6}>
                                    {plan.description}
                                </Text>

                                <List.Root gap={3} mb={8} color="gray.300">
                                    {plan.features.map((feature, i) => (
                                        <List.Item key={i} display="flex" alignItems="center">
                                            <List.Indicator asChild color={getColor(plan.color, 'background', 'brandGreen.500')} mr={3}>
                                                <FaCheckCircle />
                                            </List.Indicator>
                                            {feature}
                                        </List.Item>
                                    ))}
                                </List.Root>

                                <Button
                                    size="lg"
                                    colorPalette="brandGreen"
                                    bg={getColor(plan.color, 'background', 'brandGreen.500')}
                                    color="black"
                                    borderRadius="full"
                                    fontWeight="bold"
                                    mt="auto"
                                    onClick={() => handleSelectPlan(plan)}
                                    className="hover-lift neon-glow-accent"
                                >
                                    Start Building
                                </Button>
                            </VStack>
                        </Reveal>
                    ))}
                </Flex>
            </Container>
        </Box >
    );
}
