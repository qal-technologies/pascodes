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
import {useRouter, useSearchParams} from "next/navigation";
import {useState, useEffect, Suspense} from "react";
import { estimatePrice } from "@/lib/price-estimator";
import { convertCurrency } from "@/lib/currency-converter";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import IconBtn from "@/components/buttons/IconBtn";
import { BiEnvelope } from "react-icons/bi";
import { useScroll } from "@/hooks/useScroll";
import {SITE_CONFIG} from "@/lib/site-config";
import {FaTrash} from "react-icons/fa";

interface buildProps {
  title: string;
  name: string;
  email: string;
  projectType: string;
  pages: number;
  description: string;
}
const useUnfinishedBuild = () => {
  const [build, setBuild] = useState<buildProps>(() => {
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
      name: "",
      email: "",
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
  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <BuildPageContent />
    </Suspense>
  );
}

function BuildPageContent () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [build, setBuild] = useUnfinishedBuild();
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [priceBreakdown, setPriceBreakdown] = useState<{
    [key: string]: number;
  } | null>(null);
  const [verb, setVerb] = useState("building");
  const [fmtUSDestimate, setUSDestimate] = useState<string | null>(null);
  const [convertedEstimate, setConvertedEstimate] = useState<string | null>(
    null
  );

  useEffect(() => {
    document.title = "Build with AI | PasCodes";

    // Check search params for plan data
    const planType = searchParams.get("type");
    const planPages = searchParams.get("pages");

    if(planType || planPages) {
      setBuild(prev => ({
        ...prev,
        projectType: planType || prev.projectType,
        pages: planPages ? parseInt(planPages) : prev.pages
      }));
    }
  }, [searchParams, setBuild]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBuild((prev: buildProps) => ({ ...prev, [name]: value }));
    if (estimate !== null) setEstimate(null);
  };

  const handleSliderChange = (value: number) => {
    setBuild((prev: buildProps) => ({ ...prev, pages: value }));
  };

  const handleCheckEstimate = async () => {
    setIsLoading(true);
    const { price, priceBreakdown, verb } = estimatePrice(build);
    setPriceBreakdown(priceBreakdown);
    setVerb(verb);

    //format usdd
    const usdFormatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
    });
    setUSDestimate(usdFormatter.format(price));

    const { convertedPrice, currency } = await convertCurrency(price);
    setConvertedPrice(convertedPrice);
    setCurrency(currency);
    //for user:
    const convertedFormatter = new Intl.NumberFormat("en-US", {
      currency: currency,
      style: "currency",
    });
    setConvertedEstimate(convertedFormatter.format(convertedPrice));

    setIsLoading(false);
    if (price) setEstimate(price);

    window.document.querySelector("#estimate")?.scrollIntoView({ behavior: 'smooth' });
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
        status: "pending",
        createdAt: new Date().toISOString(), // Or serverTimestamp if imported
      });

      const message = `
        *New Build Request!*
        *ID:* ${buildId}
        *Client:* ${build.name}
        *Email:* ${build.email || "Not provided"}
        *Title:* ${build.title}
        *Type:* ${build.projectType}
        *Price:* ${fmtUSDestimate}
        *Pages:* ${build.pages}
      `;
      const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.location.href = whatsappUrl;
      localStorage.removeItem("unfinishedBuild");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving build. Please try again.");
    }
  };

  const clearBuild = () => {
    if(confirm("Are you sure you want to delete this unfinished build?")) {
      setBuild({
        title: "",
        name: "",
        email: "",
        projectType: "",
        pages: 4,
        description: "",
      });
      localStorage.removeItem("unfinishedBuild");
      setEstimate(null);
    }
  };

  const routes = [
    { title: "Home", link: "/" },
    { title: "Services", link: "/services" },
    { title: "courses", link: "/courses" },
    { title: "Blog", link: "/blog" },
    { title: "contact", link: "/contact" },
  ];

  const buttonCheck =
    build?.description?.trim()?.length > 1 &&
    build?.title?.trim()?.length > 0 &&
    build?.projectType &&
    build?.name?.length > 0 &&
    build?.pages >= 4;

  const isScrolled = useScroll();
  return (
    <Box minH="100vh">
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        position="sticky"
        top="0"
        backdropFilter={isScrolled ? "blur(20px) brightness(40%)" : ""}
        background="transparent"
        zIndex="99"
        p={4}
        paddingBottom={4}
        paddingTop={10}
      >
        <IconBtn
          icon={<FaArrowLeft />}
          onClick={() => router.back()}
          ariaLabel="Go Back"
          size="sm"
        />

        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily={"PoppinsSemi"}
          letterSpacing={"1px"}
        >
          Build with AI
        </Text>

        <Flex gap={2}>
          <IconBtn
            icon={<FaTrash color="black"/>}
            onClick={clearBuild}
            ariaLabel="Delete Build"
            size="sm"
          />

        <Menu.Root >
          <Menu.Trigger>
            <IconBtn icon={<FaEllipsisV />} ariaLabel="Open Menu" size="sm" />
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                padding={6}
                borderRadius={15}
                overflow={"hidden"}
                border="1px solid"
                color="brandGreen.500"
                  zIndex="modal"
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
                  <BiEnvelope /> Email Developer
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
      </Flex>

      <Flex direction={{base: "column", lg: "row"}} gap={8}
        p={4}
      >
        <Box
          flex={1}
          maxWidth={"700px"}
          lg={{
            paddingInlineStart: "20px",
          }}
        >
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
            <Flex align="center" wrap="wrap" gap="10px">
              <Input
                name="title"
                value={build.title}
                onChange={handleChange}
                padding={0}
                width="max-content"
                maxWidth="300px"
                maxLength={50}
                fontSize={25}
                borderRadius="0"
                placeholder="Enter project title "
                _placeholder={{
                  fontSize: "20px",
                }}
                _focus={{
                  borderBottom: "1px solid ",
                  borderColor: "brandGreen.500",
                  paddingBottom: "5px",
                }}
              />
              <Input
                name="name"
                value={build.name}
                onChange={handleChange}
                width="max-content"
                maxWidth="200px"
                variant="flushed"
                placeholder="Your Name (Required)*"
                required
                _placeholder={{fontSize: "16px", color: "gray.400"}}
                borderBottom="1px solid"
                borderColor="brandGreen.500"
              />
              <Input
                name="email"
                type="email"
                value={build.email}
                onChange={handleChange}
                width="max-content"
                maxWidth="250px"
                variant="flushed"
                placeholder="Email (Optional)"
                _placeholder={{fontSize: "16px", color: "gray.400"}}
                borderBottom="1px solid"
                borderColor="brandGreen.500"
              />
              {build.projectType && (
                <Tag.Root
                  ml={2}
                  padding={1.5}
                  paddingInline={3.5}
                  borderRadius={16}
                  color="brandGreen.500"
                  variant={"subtle"}
                  border="1px solid "
                  borderColor={"brandGreen.500"}
                >
                  <Tag.Label fontSize={12}>
                    {build.projectType[0].toUpperCase() +
                      build.projectType.slice(1)}
                  </Tag.Label>
                </Tag.Root>
              )}
            </Flex>
          </Field.Root>
          <Field.Root mb={4}>
            <Field.Label
              fontFamily={"PoppinsSemi"}
              color="brandGreen.500"
              fontWeight={"bold"}
              fontSize={20}
            >
              Project Type
            </Field.Label>
            <NativeSelect.Root opacity={build.projectType ? 0.6 : 1}>
              <NativeSelect.Field
                name="projectType"
                value={build.projectType}
                onChange={handleChange}
                placeholder="Select project type"
                colorPalette={"brandGreen"}
                cursor="pointer"
                title="Select Project Type"
                aria-label="Select Project Type"
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
              Number of Pages:{" "}
              {build.pages > 4 ? `4 - ${build.pages}pages` : "(4)"}
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
              borderColor="brandGreen.500/20"
              width="100%"
              minHeight={"80px"}
              maxWidth="500px"
              height="auto"
              scrollbar={"hidden"}
              maxHeight="300px"
              padding="10px"
              placeholder="Describe your project"
              _focus={{
                height: `${build.description.trim().length / 2}px`,
                borderColor: "brandGreen.500",
              }}
            />
          </Field.Root>
          <Flex wrap="wrap" gap="10px">
            <Button
              onClick={handleCheckEstimate}
              loading={isLoading}
              loadingText="Estimating..."
              borderRadius={18}
              colorPalette={"brandGreen"}
              padding={6}
              paddingInline={8}
              background={"brandGreen.500"}
              color="brandGreen.900"
              fontWeight={"bold"}
              fontFamily="PoppinsMed"
              disabled={!buttonCheck || estimate != null}
              _disabled={{
                background: "grey",
              }}
            >
              Check Estimate
            </Button>
          </Flex>
        </Box>
        <Box
          flex={1}
          borderLeft={{ base: "none", lg: "1px solid grey" }}
          borderColor={"brandGreen.500"}
          lg={{
            paddingInlineStart: "20px",
          }}
        >
          {estimate ?
            <Box
              base={{
                borderTop: "1px solid grey",
                borderTopColor: "brandGreen.500",
                paddingTop: "20px",
              }}
              id="estimate"
            >
              <Text fontSize="2xl" fontWeight="bold">
                Your Estimate: {fmtUSDestimate} (
                {convertedEstimate && convertedEstimate})
              </Text>
              <Text
                mt={2}
                maxLines={2}
                textOverflow={"ellipsis"}
                maxHeight={"50px"}
                whiteSpace={"collapse"}
                overflow={"hidden"}
              >
                {build.description}
              </Text>
              <Text mt={6}>
                You&apos;re {verb} a {build.projectType} with these features:
              </Text>
              <Box mt={2}>
                <Text
                  fontWeight="bold"
                  fontSize={21}
                  marginBottom={1}
                  fontFamily={"PoppinsMed"}
                  letterSpacing={"0.6px"}
                >
                  Price Breakdown:
                </Text>
                {priceBreakdown &&
                  Object.entries(priceBreakdown).map(([key, value]) => (
                    <Text key={key}>
                      <span
                        style={{ letterSpacing: "0.5px", fontWeight: "bold" }}
                      >
                        {key.toUpperCase()}
                      </span>
                      :{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value)}
                    </Text>
                  ))}
              </Box>

              <Button
                mt={6}
                borderRadius={20}
                colorPalette={"green"}
                fontFamily="PoppinsMed"
                disabled={!buttonCheck}
                placeSelf="center"
                _disabled={{
                  background: "grey",
                }}
                padding={6}
                paddingInline={12}
                onClick={handleFinishBuild}
              >
                Finish Build
              </Button>
            </Box>
          : <Image
              display={{ base: "none", lg: "block" }}
              src="/images/logo.png"
              alt="Passcode Image"
              maxWidth="500px"
              placeSelf="center"
              maxHeight="500px"
            />
          }
        </Box>
      </Flex>
    </Box>
  );
}
