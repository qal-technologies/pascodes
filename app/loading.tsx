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
        <Text fontSize={12} letterSpacing={3}>
          Please wait, while we process
        </Text>

      </Box>
    </Flex>
  );
}
