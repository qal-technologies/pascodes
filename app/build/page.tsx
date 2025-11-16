/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Flex,
  Text,
  Menu,
  Input,
  Textarea,
  NativeSelect,
  Button,
  Field,
  Image,
  Portal,
  Slider,
  Tag,
} from "@chakra-ui/react";
import { FaArrowLeft, FaDotCircle, FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { estimatePrice } from "@/lib/price-estimator";
import { convertCurrency } from "@/lib/currency-converter";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import IconBtn from "@/components/buttons/IconBtn";

const useUnfinishedBuild = () => {
  const [build, setBuild] = useState(() => {
    if (typeof window !== "undefined") {
      const savedBuild = localStorage.getItem("unfinishedBuild");
      if (savedBuild) {
        try {
          return JSON.parse(savedBuild);
        } catch (error) {
          console.error("Failed to parse unfinished build:", error);
        }
      }
    }
    return {
      title: "",
      projectType: "",
      pages: 4,
      description: "",
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("unfinishedBuild", JSON.stringify(build));
    }
  }, [build]);

  return [build, setBuild] as const;
};

export default function BuildPage() {
  const router = useRouter();
  const [build, setBuild] = useUnfinishedBuild();
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [priceBreakdown, setPriceBreakdown] = useState<{
    [key: string]: number;
  } | null>(null);
  const [verb, setVerb] = useState("building");

  useEffect(() => {
    document.title = "Build with AI | PasCodes";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBuild((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number) => {
    setBuild((prev: any) => ({ ...prev, pages: value }));
  };

  const handleCheckEstimate = async () => {
    setIsLoading(true);
    const { price, priceBreakdown, verb } = estimatePrice(build);
    setEstimate(price);
    setPriceBreakdown(priceBreakdown);
    setVerb(verb);
    const { convertedPrice, currency } = await convertCurrency(price);
    setConvertedPrice(convertedPrice);
    setCurrency(currency);
    setIsLoading(false);
  };

  const handleFinishBuild = async () => {
    const buildId = Math.random().toString(36).substring(2, 15);
    try {
      await addDoc(collection(db, "builds"), {
        ...build,
        estimate,
        convertedPrice,
        currency,
        buildId,
        priceBreakdown,
      });

      const message = `
        New Build Request!
        Title: ${build.title}
        Type: ${build.projectType}
        Price: $${estimate}
        ID: ${buildId}
      `;
      const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;
      window.location.href = whatsappUrl;
      localStorage.removeItem("unfinishedBuild");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving build. Please try again.");
    }
  };

  const routes = [
    { title: "Home", link: "/" },
    { title: "Services", link: "/services" },
    { title: "courses", link: "/courses" },
    { title: "Blog", link: "/blog" },
    { title: "contact", link: "/contact" },
  ];

  return (
    <Box minH="100vh" p={4} pt={10}>
      <Flex justify="space-between" align="center" mb={10}>
        <IconBtn
          icon={<FaArrowLeft />}
          onClick={() => router.back()}
          ariaLabel="Go Back"
        />

        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily={"PoppinsSemi"}
          letterSpacing={"1px"}
        >
          Build with AI
        </Text>

        <Menu.Root>
          <Menu.Trigger>
            <IconBtn icon={<FaEllipsisV />} ariaLabel="Open Menu" />
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                padding={6}
                borderRadius={15}
                overflow={"hidden"}
                border="1px solid"
                color="brandGreen.500"
              >
                <Menu.ItemGroup marginBottom={2}>
                  <Menu.ItemGroupLabel mb={1} fontSize={18}>
                    Go to
                  </Menu.ItemGroupLabel>
                  {routes.map((route) => (
                    <Menu.Item
                      key={route.link}
                      value={route.link}
                      onClick={() => router.push(route.link)}
                      padding="4px"
                      cursor="pointer"
                      borderRadius={12}
                      _hover={{
                        background: "brandGreen.500/20",
                      }}
                    >
                      <FaDotCircle color="brandGreen.500" size={6} />{" "}
                      {route.title}
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
                <Menu.Item
                  value="email"
                  onClick={() =>
                    (window.location.href = "mailto:pasqal.dev@gmail.com")
                  }
                  padding="4px"
                  cursor="pointer"
                  borderRadius={12}
                  _hover={{
                    background: "brandGreen.500/20",
                  }}
                >
                  Email Developer
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>

      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        <Box flex={1}>
          <Field.Root mb={8}>
            <Field.Label
              fontFamily={"PoppinsSemi"}
              color="brandGreen.500"
              fontWeight={"bold"}
              fontSize={20}
            >
              Title{" "}
              <span
                style={{
                  fontSize: "14px",
                  color: "grey",
                  opacity: 0.8,
                  marginLeft: "5px",
                }}
              >
                (max 50)
              </span>
            </Field.Label>
            <Flex align="center">
              <Input
                name="title"
                value={build.title}
                onChange={handleChange}
                padding={0}
                width="max-content"
                maxWidth="300px"
                maxLength={50}
                fontSize={25}
                placeholder="Enter project title "
                _placeholder={{
                  fontSize: "20px",
                }}
              />
              {build.projectType && (
                <Tag.Root
                  ml={2}
                  padding={3}
                  paddingInline={5}
                  borderRadius={16}
                  colorScheme={"brandGreen"}
                  colorPalette={"brandGreen"}
                  variant={"subtle"}
                >
                  <Tag.Label>
                    {build.projectType[0].toUpperCase() +
                      build.projectType.slice(1)}
                  </Tag.Label>
                </Tag.Root>
              )}
            </Flex>
          </Field.Root>
          <Field.Root mb={4} opacity={build.projectType ? 0.5 : 1}>
            <Field.Label
              fontFamily={"PoppinsSemi"}
              color="brandGreen.500"
              fontWeight={"bold"}
              fontSize={20}
            >
              Project Type
            </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="projectType"
                value={build.projectType}
                onChange={handleChange}
                placeholder="Select project type"
                colorScheme={"brandGreen"}
                colorPalette={"brandGreen"}
                cursor="pointer"
              >
                <option value="e-commerce">E-commerce Website</option>
                <option value="portfolio">Portfolio Website</option>
                <option value="business">Business Website</option>
                <option value="webapp">Web App</option>
                <option value="data-modeling">Data Modeling</option>
                <option value="project-config">Project Configuration</option>
                <option value="website-management">Website Management</option>
                <option value="tools-integration">Tools Integration</option>
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label
              fontFamily={"PoppinsSemi"}
              color="brandGreen.500"
              fontWeight={"bold"}
              fontSize={20}
            >
              Number of Pages: {build.pages > 4 && `4 - ${build.pages}pages`}
            </Field.Label>

            <Slider.Root
              min={4}
              max={100}
              value={[build.pages]}
              onValueChange={(details) => handleSliderChange(details.value[0])}
            >
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0} />
              </Slider.Control>
            </Slider.Root>
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label
              fontFamily={"PoppinsSemi"}
              color="brandGreen.500"
              fontWeight={"bold"}
              fontSize={20}
            >
              Description
            </Field.Label>
            <Textarea
              name="description"
              value={build.description}
              onChange={handleChange}
              resize={"none"}
              border={"1px solid green"}
              borderRadius="15px"
              borderColor="brandGreen.500"
              minHeight={"80px"}
              height="auto"
              scrollbar={"hidden"}
              maxHeight="300px"
              placeholder="Describe your project"
            />
          </Field.Root>
          <Flex>
            <Button
              onClick={handleCheckEstimate}
              loading={isLoading}
              borderRadius={12}
              colorScheme={"brandGreen"}
              colorPalette={"brandGreen"}
              padding={5}
              paddingInline={10}
              loadingText="Estimating..."
            >
              Check Estimate
            </Button>
            {estimate && (
              <Button ml={4} colorScheme="green"  borderRadius={12}
              colorPalette={"green"}
              padding={5}
                paddingInline={10}
                onClick={handleFinishBuild}>
                Finish Build
              </Button>
            )}
          </Flex>
        </Box>
        <Box flex={1} display={{ base: "none", lg: "block" }}>
          {estimate ?
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                Your Estimate: ${estimate} ({convertedPrice} {currency})
              </Text>
              <Text mt={4}>
                You&apos;re {verb} a {build.projectType} with these features:
              </Text>
              <Text mt={2}>{build.description}</Text>
              <Box mt={4}>
                <Text fontWeight="bold">Price Breakdown:</Text>
                {Object.entries(priceBreakdown).map(([key, value]) => (
                  <Text key={key}>
                    {key}: ${value}
                  </Text>
                ))}
              </Box>
            </Box>
          : <Image src="/images/logo.png" alt="Passcode Image" />}
        </Box>
      </Flex>
    </Box>
  );
}
