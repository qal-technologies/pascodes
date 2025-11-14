"use client";
import {
  Flex,
  Text,
  Icon,
  Link,
  type SystemStyleObject,
} from "@chakra-ui/react";
import { LuFacebook, LuGlobe } from "react-icons/lu";

import {
  FaWhatsapp,
  FaPinterest,
  FaGithub,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import type { ElementType } from "react";
import { AiOutlineX } from "react-icons/ai";

type ChakraColor = SystemStyleObject["color"];
type ChakraFontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface SocialsProps {
  socialsName:
    | string
    | "facebook"
    | "github"
    | "whatsapp"
    | "phone"
    | "email"
    | "website"
    | "instagram"
    | "youtube"
    | "linkedin"
    | "twitter"
    | "pintrest";
  title?: {
    status: boolean;
    titleName?: string;
  };
  type?: "email" | "default" | "mobile" | "whatsApp" | string;
  themeColor: ChakraColor;
  glow?: boolean;
  bgColor?: ChakraColor;
  allCaps?: boolean;
  href: string;
  appearance?: "border" | "solid";
  glowColor?: ChakraColor;
  textColor?: ChakraColor;
  borderRadius?: number;
  size?: "sm" | "md" | "lg";
}

export default function SocialButton({
  socialsName,
  title,
  themeColor,
  allCaps = false,
  bgColor,
  glow = false,
  href,
  appearance = "border",
  textColor,
  borderRadius = 16,
  size = "sm",
  type,
  glowColor,
}: SocialsProps) {
  //
  // ICON MAP
  //
  const iconMap: Record<string, ElementType> = {
    facebook: LuFacebook,
    github: FaGithub,
    instagram: FaInstagram,
    twitter: AiOutlineX,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
    email: FaEnvelope,
    website: LuGlobe,
    pintrest: FaPinterest,
  };

  const IconComponent = iconMap[socialsName];

  //
  // TITLE
  //
  let buttonTitle =
    title?.status && title.titleName ?
      title.titleName.charAt(0).toUpperCase() + title.titleName.slice(1)
    : socialsName.charAt(0).toUpperCase() + socialsName.slice(1);

  if (allCaps) buttonTitle = buttonTitle.toUpperCase();

  //
  // APPEARANCE LOGIC
  //
  const isBorderBtn = appearance === "border";

  const finalTextColor =
    isBorderBtn && !textColor ? themeColor : textColor || "black";

  const finalBackground = isBorderBtn ? "transparent" : bgColor || themeColor;

  const finalBorderColor = themeColor;

const shadowColor =
  glow ?
    glowColor ||
    (isBorderBtn ? finalBorderColor : finalBackground || finalTextColor)
  : "transparent";

const glowShadow = `0px 0px 12px ${shadowColor}`;

  //
  // SIZE LOGIC
  //
  const sizeMap: Record<
    "sm" | "md" | "lg",
    { px: number; py: number; font: ChakraFontSize; icon: number }
  > = {
    sm: { px: 4, py: 2, font: "sm", icon: 14 },
    md: { px: 5, py: 3, font: "md", icon: 16 },
    lg: { px: 6, py: 3.5, font: "lg", icon: 20 },
  };

  const currentSize = sizeMap[size];

  const attach =
    (type && type == "email") ||
    type == "mobile" ||
    (type == "whatsApp" && !href.includes("wa.me"));
  const attachPrefix = {
    email: "mailto:",
    mobile: "tel:",
    whatsApp: "https://wa.me",
  };

  const mainLink = attach ? `${attachPrefix[type]}${href}` : href;

  return (
    <Link
      href={mainLink}
      _hover={{ textDecoration: "none" }}
      border="none"
      outline="none"
      target="_blank"
    >
      <Flex
        direction="row"
        align="center"
        gap={2}
        border="1px solid"
        borderColor={finalBorderColor}
        backgroundColor={finalBackground}
        borderRadius={borderRadius}
        px={currentSize.px}
        py={currentSize.py}
        color={finalTextColor}
        width="max-content"
        transition="0.25s ease"
        filter={glow ? `drop-shadow(${glowShadow})` : "none"}
        _hover={{
          cursor: "pointer",
          filter: glow ? `drop-shadow(${glowShadow})` : "none",
          boxShadow: glow ? glowShadow : "none",
          transform: "scale(1.05)",
          ...(isBorderBtn ?
            {
              backgroundColor: themeColor,
              color: textColor || "black",
            }
          : {
              backgroundColor: "transparent",
              borderColor: finalBorderColor,
              color: finalBorderColor,
            }),
        }}
        className="moveUpNfadeIn"
      >
        {IconComponent && <Icon as={IconComponent} size={currentSize.font} />}

        {title?.status && (
          <Text
            fontWeight="bolder"
            letterSpacing="0.5px"
            fontSize={currentSize.font}
          >
            {buttonTitle}
          </Text>
        )}
      </Flex>
    </Link>
  );
}
