"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function ContentProtector({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "p" || e.key === "s" || e.key === "u" || e.key === "c")
      ) {
        e.preventDefault();
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (element) {
        element.removeEventListener("contextmenu", handleContextMenu);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {children}
    </Box>
  );
}
