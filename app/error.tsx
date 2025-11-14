"use client";

import { Flex, Text, Heading, Image, Box } from "@chakra-ui/react";
import Link from "next/link";

import "@/styles/error.css";

export default function Error() {
  return (
    <Flex
      className="error-bg"
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

      <Box as={"div"} className="error-ball" />

      <Box marginTop={"90px"} className="dropdown">
        <Heading
          fontSize={40}
          marginBottom={2}
          fontWeight={"bolder"}
          fontFamily={"PoppinsBold"}
          letterSpacing={2}
          color={"red"}
        >
          An Error Occured
        </Heading>

        <Text fontSize={12} letterSpacing={3}>
          No need to worry, You can always{" "}
          <Link href={"/"} passHref>
            <span
              color="green"
              style={{
                color: "cyan",
                fontSize: "12px",
                borderBottom: "1px dotted rgba(100, 150, 200, 0.4)",
              }}
            >
              go back home
            </span>
          </Link>
        </Text>

        <Link passHref href={"/"} replace>
          <Box
            as={"button"}
            padding={2.5}
            paddingInline={10}
            background={"red.500"}
            marginTop={10}
            color={"black"}
            fontWeight={"bolder"}
            textAlign={"center"}
            borderRadius={20}
            cursor={"pointer"}
            _hover={{ paddingInline: 5, opacity: 0.8 }}
          >
            Go Back Home
          </Box>
        </Link>
      </Box>
    </Flex>
  );
}