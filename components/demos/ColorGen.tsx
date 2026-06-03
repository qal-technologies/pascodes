"use client";

import {Box, Button, Grid, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {FaSync, FaCopy} from "react-icons/fa";

export default function ColorGen () {
  const [colors, setColors] = useState<string[]>(() =>
    Array(4).fill("").map(() =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    )
  );

  const generateColors = () => {
    const newColors = Array(4).fill("").map(() =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    setColors(newColors);
  };



  return (
    <VStack
      p={6}
      bg="gray.900"
      borderRadius="2xl"
      boxShadow="0 0 20px rgba(0, 255, 128, 0.2)"
      border="1px solid"
      borderColor="brandGreen.500"
      w="full"
      maxW="350px"
      mx="auto"
    >
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} w={'100%'} alignItems={'center'}>

        <Text fontSize="xl" fontWeight="bold" color="brandGreen.400" textAlign="center" mb={4}>
          Palette Gen
        </Text>

        <Button
          onClick={generateColors}
          size="sm"
          mb={4}
          variant="outline"
          colorPalette="green"
          borderColor="brandGreen.500"
          color="brandGreen.500"
        >
          <FaSync style={{marginRight: '8px'}} /> Refresh
        </Button>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
        {colors.map((color, i) => (
          <ColorBox key={i} color={color} />
        ))}
      </Grid>
    </VStack>
  );
}

function ColorBox ({color}: {color: string;}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if(copied) return;

    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Box
      h="100px"
      bg={color}
      borderRadius="xl"
      position="relative"
      role="group"
      cursor="pointer"
      onClick={handleCopy}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="transform 0.2s"
      _hover={{transform: "scale(1.05)"}}
    >
    
      <Text
        bg="blackAlpha.600"
        color="white"
        px={3}
        py={1}
        borderRadius="xl"
        fontSize="xs"
        fontFamily="monospace"
        position="absolute"
        bottom={2}
      >
        {copied ? "Copied!" : color}
      </Text>
    </Box>
  );
}
