import { Box, type BoxProps, type SystemStyleObject } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

interface iconBtnProps {
  withLink?: string;
  icon: React.ReactNode;
  animate?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  ariaLabel: string;
  props?: BoxProps;
  scheme?: SystemStyleObject["color"];
  rounded?: boolean;
  bRadius?: number | string;
  mb?: number | string;
  mt?: number | string;
}

export default function IconBtn({
  withLink,
  icon,
  animate,
  onClick,
  children,
  ariaLabel,
  props,
  rounded = true,
  scheme,
  bRadius,
  mb,
  mt,
}: iconBtnProps) {
  const router = useRouter();
  const link = withLink ? withLink : null;

  const clickFunction = () => {
    if (link) {
      router.push(link);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <MotionBox
      aria-label={ariaLabel}
      onClick={() => clickFunction()}
      cursor="pointer"
      colorScheme={scheme || "brandGreen.500"}
      background="brandGreen.500/90"
      backdropBlur={'md'}
      borderRadius={rounded ? "50%" : bRadius}
      padding="15px"
      color="black"
      display="grid"
      placeContent="center"
      outline='none'
      filter="drop-shadow(0px 0px 12px black)"
      dropShadow={"0px 0px 120px brandGreen.500"}
      initial={animate ? { opacity: 0, scale: 0, y: 50 } : ""}
      animate={animate ? { opacity: 1, scale: 1, y: 0 } : ""}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        duration: 0.06,
        type: "spring",
      }}
      mb={mb}
      mt={mt}
    >
      {icon}
      {children}
    </MotionBox>
  );
}
