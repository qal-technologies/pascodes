"use client";

import { Box, AspectRatio } from "@chakra-ui/react";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src={src}
        title="Course Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
}
