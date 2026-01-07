"use client";

import * as React from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Link,
  useDisclosure,
  Span,
} from "@chakra-ui/react";
import {motion, useInView} from "framer-motion";
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
const MotionSpan = motion.create(Span);

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

  const ref = React.useRef(null);
  const isInView = useInView(ref);

  React.useEffect(() => {
    if(!isInView) return;
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * services.length);
      setService(services[random]);
    }, 5000);
    return () => clearInterval(interval);
  }, [services, isInView]);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="center"
      justify="space-evenly"
      w="full"
      minH="100vh"
      paddingInline="20px"
      paddingBlock="20vh"
      paddingBottom='10vh'
      overflow="visible"
      gap={"10%"}
      userSelect="none"
      className="transition-all"
      ref={ref}
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
        top="70vh"
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
          fontSize={{ base: "2.5rem", lg: "3rem" }}
          fontFamily={"PoppinsSemi"}
        >
          Building{" "}
          <span style={{ fontSize: "1.6rem", fontFamily: "cursive" }}>the</span>
        </Text>

        <Text
          fontSize={{ base: "3rem", lg: "3.4rem" }}
          fontFamily={"PoppinsBold"}
          color={"brandGreen.500"}
          marginBlock={-3}
          marginBottom={-3}
        >
          World&apos;s best
        </Text>

        <MotionText
          key={mainService.name}
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
            <MotionSpan
              key={index}
              fontSize={{ base: "3.5rem", lg: "4.5rem" }}
              fontFamily={mainService.font}
              fontWeight={"bolder"}
              lineHeight={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
            >
              {char}
            </MotionSpan>
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
          marginTop={{ base: 18, lg: 15 }}
        >
          {["build", "price"].map((btn) => {
            return <ActionBtn key={btn} type={btn} />;
          })}
        </Flex>
      </Box>

      <Box className="z-upper" display={{ base: "none", lg: "block" }}>
        <Image
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
  const maxWidth = isBuild ? "300px" : "200px";
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
        outline="none"
        target={isBuild ? "_parent" : "_self"}
        width={width}
        minW="max-content"
        maxWidth={maxWidth}
        borderRadius="20px"
        background={genColor}
        display="flex"
        alignItems="center"
        gap="45px"
        color={isBuild ? "brandGreen.900" : "white"}
        backdropBlur={"md"}
        backdropFilter={"blur(20px)"}
        border={"2px solid  transparent"}
        padding={4}
        paddingInline={5}
        position="relative"
        overflow="hidden"
        className="moveUp"
        as="a"
        _hover={{
          background: isBuild ? "brandGreen.100" : 'blue.100',
          color: isBuild ? "brandGreen.900" : "blue.900",
          borderColor: isBuild ? "brandGreen.900" : "blue.700",
          marginInlineStart: isBuild ? "30px" : "0px",
          marginInlineEnd: isBuild ? "0px" : "30px",
          scale: "105%",
          position: "relative",
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
      </Link>
      <UnfinishedBuildModal open={open} onClose={onClose} />
    </>
  );
}
