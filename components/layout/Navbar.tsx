"use client";
import Link from "next/link";
import {
  Box,
  Flex,
  IconButton,
  Text,
  For,
  Stack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import {LuMenu, LuX} from "react-icons/lu";
import {useEffect, useState} from "react";
import {useScroll} from "@/hooks/useScroll";
import HeaderButton from "../buttons/HeaderButton";
import {usePathname} from "next/navigation";
import {useScreen} from "@/hooks/useScreenSize";
import SocialButton from "../buttons/SocialsButton";
import {SITE_CONFIG} from "@/lib/site-config";

export default function Navbar () {
  // const { colorMode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const [open, isOpen] = useState(false);

  const isScrolled = useScroll();
  const size = useScreen();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(size.width > 1024) isOpen(false);
    }, 50);

    return () => clearTimeout(timeout);
  }, [size.width]);

  const toggleMenu = () => {
    isOpen(!open);
  };

  const routes = [
    {title: "Home", link: "/"},
    {title: "Services", link: "/services"},
    {title: "Courses", link: "/courses"},
    {title: "Blog", link: "/blog"},
    {title: "About", link: "/about"},
  ];

  const socials = [
    {name: "github", link: SITE_CONFIG.socials.github},
    {name: "youtube", link: SITE_CONFIG.socials.youtube},
    {name: "linkedin", link: SITE_CONFIG.socials.linkedin},
    {name: "email", link: SITE_CONFIG.socials.email, type: "email"},
  ];

  return (
    <Box
      color="foreground"
      p={4}
      minW={"100%"}
      maxH={open ? '100vh' : '100px'}
      paddingInline={{lgDown: 6, lgTo2xl: 8, "2xl": 8}}
      position={"fixed"}
      marginBottom={10}
      paddingTop={isScrolled ? 8 : 10}
      borderBottom={`${isScrolled || open ? "0.5px solid green" : "none"}`}
      borderColor={"brandGreen.500/10"}
      boxShadow={isScrolled || open ? "0px 2px 12px rgba(6, 6, 6, 1)" : "none"}
      top={"0"}
      left={"0"}
      overflow={"hidden"}
      placeSelf={"center"}
      zIndex={"9999999999"}
      className={`transition-all duration-500 ${isScrolled || open ? "navbar-open" : "bg-transparent"} ${isScrolled ? "py-4" : "py-10"} `}
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
              <NextImage
                alt="PoshCodes Logo"
                src={"/images/logo.png"}
                width={40}
                height={40}
                priority
              />
            </Box>
            <Text
              fontSize="xl"
              fontFamily={"PoppinsLight"}
              color={"brandGreen.500"}
            >
              poshcodes_
            </Text>
          </Flex>
        </Link>

        <Stack hideFrom={"lg"}>
          <Flex gap={"8px"} align={"center"}>
            {/* <IconButton
              aria-label="Toggle Theme"
              onClick={toggleColorMode}
              color={"brandGreen.500"}
              background={"none"}
              borderRadius={60}
              size={"lg"}
              _hover={{
                border: "1px solid red",
                borderColor: "brandGreen.500",
                boxShadow: "0px 0px 12px",
                boxShadowColor: "brandGreen.500",
              }}
              _active={{
                transform: "rotate(360deg)",
              }}
            >
              {colorMode === "light" ?
                <LuMoon />
              : <LuSun />}
            </IconButton> */}

            <IconButton
              aria-label="Toggle Menu"
              onClick={toggleMenu}
              background={"none"}
              borderRadius={14}
              color={open ? "red" : "brandGreen.500"}
              size={"xl"}
              _hover={{
                border: open ? "2px solid red" : "2px solid transparent",
                borderColor: open ? "red" : "brandGreen.500",
                boxShadow: open ? "0px 0px 12px red" : "0px 0px 12px {colors.brandGreen.500}",
              }}
              _active={{
                transform: "rotate(45deg) scale(80%)",
                border: open ? "2px solid red" : "2px solid transparent",
                borderColor: open ? "red" : "brandGreen.500",
                boxShadow: open ? "0px 0px 12px red" : "0px 0px 12px {colors.brandGreen.500}",
              }}
            >
              {open ?
                <LuX color="red" className="animate-pulse duration-100" />
                : <LuMenu fontSize={30} />}
            </IconButton>
          </Flex>
        </Stack>

        <Stack hideBelow={"lg"}>
          <Flex
            align={"center"}
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
          align={{mdDown: "flex-start", mdTo2xl: "center"}}
          direction={{mdDown: "column", mdTo2xl: "row"}}
          justify={{mdDown: "space-between", mdToXl: "space-around"}}
          gap={2}
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

        <Flex
          gap={4}
          align="center"
          justify="space-evenly"
          marginTop={3}
          paddingTop={7}
          paddingBottom={2}
          borderTop={"1px solid "}
          borderColor='brandGreen.500/50'
        >
          {socials.map((link) => {
            return (
              <SocialButton
                href={link.link}
                themeColor={"brandGreen.500"}
                glowColor={"brandGreen.500"}
                socialsName={link.name}
                type={link.type || "default"}
                glow
                key={link.name}
                size="md"
              />
            );
          })}
        </Flex>
      </Stack>
    </Box>
  );
}
