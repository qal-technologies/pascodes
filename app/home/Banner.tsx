"use client";

import * as React from "react";
import { Flex, Box, Text, Image, Link, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiDollarCircle, BiTrendingUp } from "react-icons/bi";
import {
  LuLayoutDashboard,
  LuMousePointerClick,
  LuSparkles,
} from "react-icons/lu";
import { FaTools } from "react-icons/fa";
import UnfinishedBuildModal from "@/components/layout/UnfinishedBuildModal";
import { useRouter } from "next/navigation";

const MotionText = motion.create(Text);

export default function Banner() {
  const services = React.useMemo(
    () => [
      { name: "Web Apps", font: "MomoTrust", color: "green" },
      { name: "Softwares", font: "Times New Roman", color: "cyan" },
      { name: "Mobile Apps", font: "SirinStencil", color: "red" },
      { name: "UI Designs", font: "SixtyFour", color: "tomato" },
      { name: "UX Designs", font: "Satisfy", color: "yellow" },
      { name: "Data Modeling", font: "PoppinsBold", color: "blue" },
      { name: "Coding Courses", font: "mono", color: "purple" },
    ],
    []
  );
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
      color: "brandNavy.400/20",
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
  }, [services]);

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
      className="transition-all"
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
        paddingBlock={{ base: "5rem", lg: "none" }}
        className="z-upper"
      >
        <Text
          fontSize={{ base: "2rem", lg: "3rem" }}
          fontFamily={"PoppinsSemi"}
        >
          Building{" "}
          <span style={{ fontSize: "1.5rem", fontFamily: "cursive" }}>the</span>
        </Text>

        <Text
          fontSize={{ base: "2.5rem", lg: "3.4rem" }}
          fontFamily={"PoppinsBold"}
          color={"brandGreen.500"}
          marginBlock={-3}
          marginBottom={-3}
        >
          World&apos;s best
        </Text>

        <MotionText
          key={mainService.name}
          fontSize={{ base: "3rem", lg: "4.2rem" }}
          fontFamily={mainService.font}
          fontWeight={"bolder"}
          lineHeight={1}
          marginTop={2.5}
          letterSpacing={"2px"}
          textShadow={`0px 0px 4px ${mainService.color}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          {mainService.name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
            >
              {char}
            </motion.span>
          ))}
        </MotionText>

        <Flex
          wrap={"wrap"}
          gap={4}
          marginTop={8}
          width={"100%"}
          paddingBlock={4}
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
                backdropFilter={"blur(20px)"}
                bgGradient={"to-br"}
                gradientFrom={tag.color}
                gradientTo={"black/50"}
              >
                {tag.icon}
                {tag.name}
              </Text>
            );
          })}
        </Flex>

        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          gap={"15px"}
          align="center"
          justify={{ base: "center", lg: "flex-start" }}
          marginTop={{base: 18, lg: 15}}
        >
          {["build", "price"].map((btn) => {
            return <ActionBtn key={btn} type={btn} />;
          })}
        </Flex>
      </Box>

      <Box className="z-upper" display={{ base: "none", lg: "block" }}>
        <Image
          id="pricing"
          _hover={{
            transform: "translateY(-20px) translateX(-20px)",
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

function ActionBtn({ type }: { type: "build" | "price" | string }) {
  const isBuild = type === "build";
  const linkHref = isBuild ? "/build" : "#pricing";
  const width = isBuild ? "50%" : "40%";
  const maxWidth = isBuild ? "300px" : "180px";
  const genColor = isBuild ? "brandGreen.500" : "blue.700";
  const btnTxt = isBuild ? "Start Building" : "Pricing";
  const { open, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleBuildClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const savedBuild = localStorage.getItem("unfinishedBuild");
    if (savedBuild) {
      const build = JSON.parse(savedBuild);
      if (build.title || build.description) {
        onOpen();
        return;
      }
    }
    router.push(linkHref);
  };

  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const pricingElement = document.getElementById("pricing");
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <Link
      href={linkHref}
      onClick={isBuild ? handleBuildClick : handlePricingClick}
      _hover={{ textDecoration: "none" }}
      outline="none"
      target={isBuild ? "_parent" : "_self"}
      width={width}
      minW="max-content"
      maxWidth={maxWidth}
      borderRadius="20px"
      background={genColor}
      display="flex"
      gap="45px"
      color={isBuild ? "brandGreen.900" : "white"}
      backdropBlur={"md"}
      backdropFilter={"blur(20px)"}
      border={"2px solid  transparent"}
      padding={3.5}
      paddingInline={5}
      position="relative"
      overflow="hidden"
      className="moveUp"
      as="a"
    >
      <Box
        _hover={{
          background: "transparent",
          borderColor: isBuild ? genColor : "blue.200",
          color: isBuild ? "brandGreen.500" : "blue.200",
          marginInlineStart: isBuild ? "30px" : "0px",
          marginInlineEnd: isBuild ? "0px" : "30px",
          scale: "105%",
          boxShadow: "0px 0px 12px ",
          boxShadowColor: genColor,
        }}
      >
        <Box
          position={"absolute"}
          background={isBuild ? "brandGreen.800" : "blue.800"}
          width={"70px"}
          height={"70px"}
          transform={"rotate(45deg)"}
          left={-5}
          zIndex={-9}
        />

        <Box
          position={"absolute"}
          background={isBuild ? "brandGreen.900/20" : "blue.100/20"}
          width={"70px"}
          height={"70px"}
          transform={"rotate(45deg)"}
          left={-2.5}
          zIndex={-99}
        />

        {isBuild ?
          <FaTools color="white" size="20px" />
        : <BiDollarCircle color="white" size="20px" />}
        <Text
          fontWeight="bolder"
          fontFamily="PoppinsSemi"
          letterSpacing="0.2px"
        >
          {btnTxt}
        </Text>
      </Box>
    </Link>
    <UnfinishedBuildModal open={open} onClose={onClose} />
    </>
  );
};
