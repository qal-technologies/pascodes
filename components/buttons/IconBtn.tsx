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
  size?:'md'|'sm'|'lg'
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
  bRadius,
  mb,
  mt,
  size ='md'
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

  const sizes = {
    "sm": '10px',
    "md": '15px',
    "lg":'20px',
  }

  return (
    // @ts-ignore
    <MotionBox
      aria-label={ariaLabel}
      onClick={() => clickFunction()}
      cursor="pointer"
      background="brandGreen.500/90"
      backdropBlur={'md'}
      borderRadius={rounded ? "50%" : bRadius}
      padding={sizes[size || 'md']}
      color="black"
      display="grid"
      placeContent="center"
      outline='none'
      boxShadow="0px 0px 12px black"
      initial={animate ? {opacity: 0, scale: 0, y: 50} : undefined}
      animate={animate ? {opacity: 1, scale: 1, y: 0} : undefined}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        duration: 0.06,
        type: 'spring'
      } as any}
      mb={mb}
      mt={mt}
      {...props}
    >
      {icon}
      {children}
    </MotionBox>
  );
}
