"use client";

import Navbar from "@/components/layout/Navbar";
import Scrollable from "@/components/layout/Scrollable";
import Banner from "./home/Banner";
import QuoteSection from "@/components/home/QuoteSection";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PlansSection from "@/components/home/PlansSection";
import CourseSection from "@/components/home/CourseSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import SocialSection from "@/components/home/SocialSection";
import {Reveal} from "@/components/utils/Reveal";
import {Separator} from "@chakra-ui/react";
import Footer from "@/components/layout/Footer";

export default function HomePage () {
  return (
    <Scrollable>
      <Navbar />
      <Banner />

      <Reveal width="100%">
        <QuoteSection />
      </Reveal>

      <Reveal width="100%">
        <SkillsSection />
      </Reveal>

      <Reveal width="100%">
        <ProjectsSection />
      </Reveal>

      <Reveal width="100%">
        <PlansSection />
      </Reveal>

      <Reveal width="100%">
        <CourseSection />
      </Reveal>

      <Reveal width="100%">
        <PartnershipSection />
      </Reveal>

      <Reveal width="100%">
        <TestimonialSection />
      </Reveal>

      <Reveal width="100%">
        <BlogSection />
      </Reveal>

      <Reveal width="100%">
        <ContactSection />
      </Reveal>

      <Reveal width="100%">
        <SocialSection />
      </Reveal>

      <Separator borderColor="whiteAlpha.100" />

      <Footer />

    </Scrollable>
  );
}
