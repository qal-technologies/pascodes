"use client";

import { useEffect, useRef } from "react";

interface ProtectedMediaProps {
  src: string;
  type?: "video" | "image" | "pdf";
  className?: string;
  alt?: string;
  controls?: boolean;
}

export default function ProtectedMedia({
  src,
  type = "video",
  className = "",
  alt = "Protected Media",
  controls = true,
}: ProtectedMediaProps) {
  const mediaRef = useRef<any>(null);

  useEffect(() => {
    if (mediaRef.current && src) {
      if (type === "video") {
        mediaRef.current.src = src;
      } else if (type === "image") {
        mediaRef.current.src = src;
      } else if (type === "pdf") {
        mediaRef.current.src = src;
      }
    }
  }, [src, type]);

  if (type === "video") {
    return (
      <video
        ref={mediaRef}
        controls={controls}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className={className}
        style={{ width: "100%", borderRadius: "12px", display: "block" }}
      />
    );
  }

  if (type === "pdf") {
    return (
      <iframe
        ref={mediaRef}
        title="Protected Document"
        className={className}
        style={{ width: "100%", height: "500px", border: "none", borderRadius: "12px" }}
      />
    );
  }

  return (
    <img
      ref={mediaRef}
      alt={alt}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
      className={className}
      style={{ maxWidth: "100%", borderRadius: "12px", userSelect: "none" }}
    />
  );
}
