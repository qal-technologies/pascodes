"use client";

import {Box, Button, Grid, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";

export default function Calculator () {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handleClick = (value: string) => {
    if(value === "C") {
      setDisplay("0");
      setExpression("");
    } else if(value === "=") {
      try {

        const workedExpression = () => {
          const usage = expression as string;
          if(usage.startsWith('0') && !usage.includes('.')) usage.slice(1);

          return usage as typeof expression;
        };

        const result = eval(workedExpression());
        const show = result.toString();
        setDisplay(workedExpression());
        setExpression(show);
      } catch {
        setDisplay("Error");
        setExpression("");
      }
    } else {
      const newExpr = expression + value;
      setExpression(newExpr);
      setDisplay(newExpr);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "C", "0", "=", "+"
  ];

  return (
    <VStack
      p={6}
      bg="gray.900"
      borderRadius="2xl"
      boxShadow="0 0 20px rgba(0, 255, 128, 0.2)"
      border="1px solid"
      borderColor="brandGreen.500"
      w="full"
      maxW="300px"
      mx="auto"
    >
      <Box
        w="full"
        bg="blackAlpha.600"
        p={4}
        borderRadius="md"
        mb={4}
        textAlign="right"
      >
        <Text fontSize="2xl" fontFamily="monospace" color="brandGreen.400">
          {display}
        </Text>
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={3} w="full">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => handleClick(btn)}
            colorPalette={btn === "=" ? "green" : btn === "C" ? "red" : "gray"}
            variant={["=", "C"].includes(btn) ? "solid" : "subtle"}
            bg={["=", "C"].includes(btn) ? undefined : "gray.800"}
            color={["=", "C"].includes(btn) ? "white" : "green.200"}
            _hover={{
              bg: btn === "=" ? "green.600" : btn === "C" ? "red.600" : "gray.700",
              transform: "scale(1.05)"
            }}
            borderRadius={'18px'}
          >
            {btn}
          </Button>
        ))}
      </Grid>
    </VStack>
  );
}
