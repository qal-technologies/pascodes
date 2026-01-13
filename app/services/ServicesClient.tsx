'use client';

import PartnershipSection from "@/components/home/PartnershipSection";
import PlansSection from "@/components/home/PlansSection";
import SkillsSection from "@/components/home/SkillsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import {Reveal} from "@/components/utils/Reveal";
import {Separator} from "@chakra-ui/react";
import PageBanner from "@/components/layout/PageBanner";
import SpecializedServices from "@/components/sections/SpecializedServices";
import React from "react";

export default function Services () {
    return (
        <Scrollable>
            <Navbar />
            <Reveal width="100%" >
                <SpecializedServices />
            </Reveal>

            <Separator borderColor="whiteAlpha.100" />

            <Reveal width="100%" >
                <SkillsSection />
            </Reveal>

            <Reveal width="100%">
                <PlansSection />
            </Reveal>

            <Reveal width="100%">
                <PartnershipSection />
            </Reveal>

            <Reveal width="100%">
                <TestimonialSection page="service"/>
            </Reveal>

            <Separator borderColor="whiteAlpha.100" />
            <Footer />
        </Scrollable>
    );
}