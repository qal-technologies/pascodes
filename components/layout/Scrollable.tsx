import { Flex, type FlexProps } from "@chakra-ui/react";
import "@/styles/layout-styles.css";
import React from "react";

interface ScrollableType {
  children: React.ReactNode;
  props?: FlexProps;
}

export default function Scrollable({ children, props }: ScrollableType) {
  return (
    <Flex
      as={'main'}
      direction="column"
      // gap={"10px"}
      className={"main-bg antialiased"}
      {...props}
    >
      {children}
    </Flex>
  );
}
