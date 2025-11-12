import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import "@/styles/loading.css";
import Link from "next/link";

export default function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      minH={"100vh"}
      minW={"100vw"}
      placeContent="center"
    >
      <Image
        src={"/images/logo-trans.png"}
        alt="Pascode Logo"
        width={200}
        height={200}
        className={"company-image zoom-in"}
      />

      <Box as={"div"} className="spinner" />

      <Box marginTop={"90px"} className="dropdown">
        <Heading
          fontSize={20}
          marginBottom={-0}
          fontWeight={"bolder"}
          fontFamily={"PoppinsBold"}
          letterSpacing={2}
          color={"brandGreen.500"}
        >
          Loading...
        </Heading>
        <Text fontSize={12} letterSpacing={3}>
          Please wait, while we process
        </Text>

      </Box>
    </Flex>
  );
}
