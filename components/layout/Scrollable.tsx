import { Flex } from "@chakra-ui/react";
import React from "react";

interface ScrollableType {
  children: React.ReactNode;
}

export default function Scrollable({ children }: ScrollableType) {
  return <Flex>{children}</Flex>;
}
