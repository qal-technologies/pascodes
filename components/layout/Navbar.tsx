"use client";
import Link from "next/link";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Image,
  For,
  Stack,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import { LuMoon, LuSun, LuMenu, LuCircleOff } from "react-icons/lu";
import { useState } from "react";
import { useScroll } from "@/hooks/useScroll";
import HeaderButton from "../buttons/HeaderButton";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const [open, isOpen] = useState(false);
  const isScrolled = useScroll();

  const toggleMenu = () => {
    isOpen(!open);
  };

  const routes = [
    { title: "Home", link: "/" },
    { title: "Services", link: "/services" },
    { title: "courses", link: "/courses" },
    { title: "Blog", link: "/blog" },
    { title: "contact", link: "/contact" },
  ];

  return (
    <Box
      bg={`${isScrolled ? "brandBlack.900/90" : "brandBlack.900/0"}`}
      color="white"
      p={4.5}
      w={"99%"}
      paddingInline={{ lgDown: 6, lgTo2xl: 8, "2xl": 8 }}
      position={"sticky"}
      borderRadius={{ lgDown: 20, lgTo2xl: 30, "2xl": 30 }}
      marginBottom={10}
      border={`${isScrolled ? "5px solid brandGreen.500" : "transparent"}`}
      top={"20px"}
      lgDown={{ top: "6px" }}
      overflow={"hidden"}
      placeSelf={"center"}
      zIndex={"999999"}
      backdropBlur={"lg"}
      backdropFilter={`blur(5px) ${isScrolled ? "brightness(80%)" : ""}`}
      className={`transition-transform duration-300 ${isScrolled ? "translate-y-2 border-2" : "translate-y-0"} ${open ? "max-h-full" : "h-20"} `}
    >
      <Flex align="center" justify="space-between" className="upper">
        <Link href="/" passHref>
          <Flex align="center" gap={"10px"}>
            <Box
              w={"40px"}
              h={"40px"}
              overflow={"hidden"}
              borderRadius={18}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Image
                alt="PasCodes Image"
                src={"/images/logo.png"}
                w={"50px"}
                h={"50px"}
              />
            </Box>
            <Text
              fontSize="xl"
              fontFamily={"PoppinsMed"}
              color={"brandGreen.500"}
            >
              pascodes_
            </Text>
          </Flex>
        </Link>

        <Stack hideFrom={"lg"}>
          <Flex gap={"8px"} align={"center"}>
            <IconButton
              aria-label="Toggle Theme"
              onClick={toggleColorMode}
              color={"brandGreen.500"}
              background={"none"}
              borderRadius={60}
              size={"lg"}
              _hover={{
                border: "2px solid brandGreen.500",
                borderColor: "brandGreen.500",
              }}
            >
              {colorMode === "light" ?
                <LuMoon />
              : <LuSun />}
            </IconButton>

            <IconButton
              aria-label="Toggle Menu"
              onClick={toggleMenu}
              background={"none"}
              borderRadius={14}
              color={open ? "red" : "brandGreen.500"}
              size={"lg"}
              _hover={{
                border: open ? "2px solid red" : "2px solid transparent",
                borderColor: open ? "red" : "brandGreen.500",
                boxShadow: open ? "0px 0px 12px red" : "0px 0px 12px",
                boxShadowColor: open ? "red" : "brandGreen.500",
              }}
            >
              {open ?
                <LuCircleOff color="red" />
              : <LuMenu fontSize={30} />}
            </IconButton>
          </Flex>
        </Stack>

        <Stack hideBelow={"lg"}>
          <Flex
            align={'center'}
            direction={"row"}
            justify="space-between"
            gap={4}
          >
            <For each={routes}>
              {(nav, index) => (
                <HeaderButton
                  title={nav.title}
                  key={index}
                  link={nav.link}
                  active={nav.link == pathname}
                />
              )}
            </For>
          </Flex>
        </Stack>
      </Flex>

      <Stack hideFrom={"lg"}>
        <Flex
          align={'flex-start'}
          direction={"column"}
          justify="space-between"
          gap={4}
          marginTop={"20px"}
        >
          <For each={routes}>
            {(nav, index) => (
              <HeaderButton
                title={nav.title}
                key={index}
                link={nav.link}
                active={nav.link == pathname}
              />
            )}
          </For>
        </Flex>
      </Stack>
    </Box>
  );
}
