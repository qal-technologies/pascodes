"use client";

import {Text, Container} from "@chakra-ui/react";
import {Reveal} from "../utils/Reveal";
import {TECH_QUOTES} from "@/lib/tech-quotes";
import {useRef, useState, useEffect} from "react";
import {useInView} from "framer-motion";
import Section from "../utils/Section";

export default function QuoteSection () {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef);

    useEffect(() => {
        if(!isInView) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TECH_QUOTES.length);
        }, 12000); // Rotate every 12 seconds

        return () => clearInterval(interval);
    }, [isInView]);

    const currentQuote = TECH_QUOTES[currentIndex];

    return (
        <Section padding={15} pt={'100px'} pb={'100px'} bgColor="brandGreen.900/20" key="quote" id='quote-section'>
            <Container ref={containerRef} alignSelf='center' maxW="container.md" placeItems='center' placeContent='center' justifySelf={'center'} textAlign='center'>
                <Reveal key={currentIndex}>
                    <Text
                        fontSize={{base: "2xl", md: "4xl"}}
                        fontWeight="bold"
                        fontFamily="PoppinsSemi"
                        color="foreground"
                        mb={5}
                        lineHeight="shorter"
                        className="neon-text"
                        px={10}
                        textAlign={'center'}
                    >
                        &quot;{currentQuote.text}&quot;
                    </Text>
                </Reveal>
                <Reveal delay={0.5} key={`author-${currentIndex}`}>
                    <Text color="brandGreen.500" fontSize="lg" fontStyle="italic">
                        - {currentQuote.author}
                    </Text>
                </Reveal>
            </Container>
        </Section>
    );
}
