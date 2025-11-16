"use client";

import { Box, Tag } from "@chakra-ui/react";
import { FaArrowUp, FaTools } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFloatingButtons } from "@/hooks/useFloatingButtons";
import { useScroll } from "@/hooks/useScroll";
import { motion } from "framer-motion";
import IconBtn from "../buttons/IconBtn";

const MotionBox = motion.create(Box);

export default function FloatingButtons() {
  const [unfinishedBuilds] = useState(() => {
    if (typeof window !== "undefined") {
      const savedBuild = localStorage.getItem("unfinishedBuild");
      if (savedBuild) {
        try {
          const build = JSON.parse(savedBuild);
          if (build.title || build.description) {
            return 1;
          }
        } catch (error) {
          console.error("Failed to parse unfinished build:", error);
        }
      }
    }
    return 0;
  });

  const isScrolled = useScroll();
  const router = useRouter();
  const showButtons = useFloatingButtons();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButtons) {
    return null;
  }

  return (
    <Box position="fixed" bottom={6} right={4} zIndex="tooltip">
      {unfinishedBuilds > 0 && (
        <IconBtn
          icon={<FaTools />}
          animate
          rounded
          onClick={handleScrollToTop}
          ariaLabel="Scroll to Top"
          scheme={"brandGreen"}
          mb="10px"
        >
          <Tag.Root
            colorPalette="red"
            borderRadius="full"
            position="absolute"
            top="-3"
            right="-1"
            padding="6px"
            width="25px"
            height="25px"
            textAlign="center"
            placeContent="center"
            background="black"
            color="brandGreen.500"
            fontWeight="bolder"
            border="1px solid "
            backdropFilter="blur(20px)"
          >
            <Tag.Label>{unfinishedBuilds}</Tag.Label>
          </Tag.Root>
        </IconBtn>
      )}

      {isScrolled && (
        <IconBtn
          icon={<FaArrowUp />}
          animate
          rounded
          onClick={handleScrollToTop}
          ariaLabel="Scroll to Top"
          scheme={"brandGreen"}
        />
      )}
    </Box>
  );
}
