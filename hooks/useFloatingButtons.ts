"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useFloatingButtons = () => {
  const pathname = usePathname();
  const pagesWithButtons = useMemo(
    () => ["/", "/services", "/courses", "/blog", "/contact"],
    []
  );

  return pagesWithButtons.includes(pathname);
};
