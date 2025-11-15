"use client";

import { Box, IconButton, Tag } from "@chakra-ui/react";
import { FaArrowUp, FaTools } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFloatingButtons } from "@/hooks/useFloatingButtons";

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
  const router = useRouter();
  const showButtons = useFloatingButtons();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButtons) {
    return null;
  }

  return (
    <Box position="fixed" bottom={4} right={4} zIndex="tooltip">
      {unfinishedBuilds > 0 && (
        <IconButton
          aria-label="Unfinished Builds"
          icon={<FaTools />}
          onClick={() => router.push("/build")}
          mb={2}
          colorScheme="blue"
        >
          <Tag.Root
            colorPalette="red"
            borderRadius="full"
            position="absolute"
            top="-1"
            right="-1"
          >
            <Tag.Label>{unfinishedBuilds}</Tag.Label>
          </Tag.Root>
        </IconButton>
      )}
      <IconButton
        aria-label="Scroll to top"
        icon={<FaArrowUp />}
        onClick={handleScrollToTop}
        colorScheme="green"
      />
    </Box>
  );
}
