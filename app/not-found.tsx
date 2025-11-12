import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import Link from "next/link";

import "@/styles/not-found.css";

export default function NotFound() {
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
        className={"zoom-in error-image spin"}
      />

      <Box marginTop={20} className="fadeIn">
        <Heading
          fontSize={35}
          marginBottom={-0}
          fontWeight={"bolder"}
          fontFamily={"PoppinsBold"}
          color={"orange"}
        >
          404
        </Heading>
        <Text>Page Not Found!</Text>

        <Link passHref href={"/"} replace>
          <Box
            as={"button"}
            padding={2.5}
            paddingInline={10}
            background={"orange.400"}
            marginTop={10}
            color={"black"}
            fontWeight={"bolder"}
            textAlign={"center"}
            borderRadius={20}
            cursor={"pointer"}
            _hover={{ paddingInline: 5, opacity:.8}}
          >
            Go Back Home
          </Box>
        </Link>
      </Box>
    </Flex>
  );
}

