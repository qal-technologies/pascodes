import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

interface ButtonProps {
  title: string;
  link?: string | null;
  titleCase?: "upper" | "lower";
  active: boolean;
}

const HeaderButton = ({ title, link, titleCase, active }: ButtonProps) => {
  let t = title.toString();
  t = titleCase == "lower" ? t.toLowerCase() : t.toUpperCase();

  const l = link ? link : `/${title.toLowerCase()}`;

  return (
    <Link passHref href={l} key={title}>
      <Box
        as="div"
        colorPalette={"brandGreen"}
        css={{ "--color": "brandGreen.500" }}
        width={"max-content"}
        padding={"6px"}
        paddingInline={active ? "30px" : "12px"}
        border={"1px solid transparent"}
        borderColor={active ? "colorPalette.500" : "transparent"}
        backdropFilter={active ? "blur(40px)" : "none"}
        borderRadius={20}
        letterSpacing={1}
        fontFamily={"PoppinsMed"}
        _hover={{
          borderColor: "colorPalette.500",
          paddingInline: "30px",
          marginInlineStart: "10px",
            backdropFilter: "blur(40px)",
        }}
        className={`${active ? "shadow-md shadow-cyan-800" : ""} hover:shadow-md hover:shadow-cyan-800`}
      >
        <Text fontWeight={"bold"} fontSize={"md"} color={"colorPalette.500"}>
          {t}
        </Text>
      </Box>
    </Link>
  );
};

export default HeaderButton;
