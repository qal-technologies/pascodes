"use client";

import * as React from "react";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiTrendingUp } from "react-icons/bi";
import {
  LuLayoutDashboard,
  LuMousePointerClick,
  LuSparkles,
} from "react-icons/lu";

const MotionText = motion(Text);

export default function Banner() {
  const services = [
    { name: "Web Apps", font: "MomoTrust", color: "green" },
    { name: "Softwares", font: "sanserif", color: "cyan" },
    { name: "Mobile Apps", font: "SirinStencil", color: "red" },
    { name: "UI Designs", font: "SixtyFour", color: "tomato" },
    { name: "UX Experience", font: "Satisfy", color: "yellow" },
    { name: "Data Modeling", font: "PoppinsBold", color: "blue" },
    { name: "Coding Courses", font: "OutfitMed", color: "purple" },
  ];
  const wwa = [
    { name: "Modern", color: "brandNavy.900/40", icon: <BiTrendingUp /> },
    {
      name: "Responsive",
      color: "brandGreen.900/40",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Interactive",
      color: "brandGreen.400/20",
      icon: <LuMousePointerClick />,
    },
    {
      name: "Efficient",
      color: "brandGreen.400/20",
      icon: <LuSparkles />,
    },
  ];
  const [mainService, setService] = React.useState(services[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * services.length);
      setService(services[random]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="center"
      justify="space-evenly"
      w="full"
      minH="100vh"
      paddingInline="20px"
      paddingBlock="20vh"
      overflow="visible"
      gap={"10%"}
      userSelect="none"
    >
      <Box
        width="60vw"
        height="60vw"
        maxW="300px"
        maxH="300px"
        backgroundColor="brandGreen.700/40"
        filter="blur(15vh)"
        position="absolute"
        top="10vh"
        left="-12vh"
        borderRadius="50%"
        zIndex="0"
        className="bg-box"
      />

      <Box
        width="60vw"
        height="60vw"
        maxW="300px"
        maxH="300px"
        backgroundColor="brandNavy.500/30"
        filter="blur(15vh)"
        position="absolute"
        top="50vh"
        right="-12vh"
        borderRadius="50%"
        zIndex="0"
        className="bg-box"
      />

      <Box
        width="100%"
        maxWidth={600}
        overflow={"hidden"}
        display="flex"
        flexDirection="column"
        textAlign={{ base: "center", lg: "left" }}
        paddingBottom={10}
        className="z-upper"
      >
        <Text fontSize={{ lgDown: 40, lg: 50 }} fontFamily={"PoppinsSemi"}>
          Building{" "}
          <span style={{ fontSize: 35, fontFamily: "cursive" }}>the</span>
        </Text>

        <Text
          fontSize={{ base: 50, lg: 60 }}
          fontFamily={"PoppinsBold"}
          color={"brandGreen.500"}
          marginBlock={-3}
          marginBottom={-3}
        >
          World&apos;s best
        </Text>

        <MotionText
          key={mainService.name}
          fontSize={{ base: 60, lg: 65 }}
          fontFamily={mainService.font}
          fontWeight={"bolder"}
          lineHeight={1}
          marginTop={2.5}
          letterSpacing={"2px"}
          textShadow={`0px 0px 4px ${mainService.color}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {mainService.name}
        </MotionText>

        <Flex
          wrap={"wrap"}
          gap={4}
          marginTop={8}
          width={"100%"}
          paddingBlock={2}
          justifyContent={{ base: "center", lg: "flex-start" }}
        >
          {wwa.map((tag) => {
            return (
              <Text
                as={"div"}
                display={"flex"}
                gap={1.5}
                alignItems={"center"}
                justifyContent={"flex-start"}
                backgroundColor={tag.color}
                padding="4px"
                paddingInline="15px"
                borderRadius={"20px"}
                className="moveUpNfadeIn"
                key={tag.name}
                letterSpacing="0.5px"
                backdropFilter={"blur(10px)"}
              >
                {tag.icon}
                {tag.name}
              </Text>
            );
          })}
        </Flex>
      </Box>

      <Box className="z-upper">
        <Image
          _hover={{
            transform: "translateY(-20px) translateX(-20px)",
            cursor: "pointer",
          }}
          src="/images/logo.png"
          alt="Pascode Image"
          maxW={400}
          maxH={400}
          className="zoom-in"
        />
      </Box>
    </Flex>
  );
}
