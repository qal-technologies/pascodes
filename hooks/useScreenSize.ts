"use client";

import { useState, useEffect } from "react";

export function useScreen() {
  const [screenSize, setscreenSize] = useState({
    screen: "md",
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let size = "md";

      if (width < 640) size = "xs";
      else if (width >= 640 && width < 768) size = "sm";
      else if (width >= 768 && width < 1024) size = "md";
      else if (width >= 1024 && width < 1280) size = "lg";
      else size = "xl";

      setscreenSize({ height, width, screen: size });
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
