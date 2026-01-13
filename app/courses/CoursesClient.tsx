'use client';

import CourseSection from "@/components/home/CourseSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import {Reveal} from "@/components/utils/Reveal";
import {Box, Separator} from "@chakra-ui/react";
import React from "react";

export default function Courses () {
    return (
        <Scrollable>
            <Navbar />

            <Box width={'100%'} padding={'11vh'} />

            <Reveal width='100%'>
                <CourseSection />
            </Reveal>

            <Reveal width="100%">
                <PartnershipSection />
            </Reveal>
            <Separator borderColor="whiteAlpha.100" />
            <Footer />
        </Scrollable>
    );
}