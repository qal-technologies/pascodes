"use client";

import { Dialog, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface UnfinishedBuildModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UnfinishedBuildModal({
  open,
  onClose,
}: UnfinishedBuildModalProps) {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/build");
    onClose();
  };

  const handleNewBuild = () => {
    localStorage.removeItem("unfinishedBuild");
    router.push("/build");
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner alignItems={"center"} placeSelf={"center"}>
        <Dialog.Content
          padding="15px"
          borderRadius="20px"
          gap="10px"
          background="brandGreen.900"
          border="1px solid "
          borderColor="brandGreen.700"
          maxWidth="95vw"
          flexWrap="wrap"
        >
          <Dialog.Header
            fontFamily="PoppinsMed"
            fontSize="20px"
            mt={2}
            color="brandGreen.200"
          >
            Build Prompt
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body textAlign="left" mb={2}>
            You have an unfinished build. Would you like to continue where you
            left off or start a new build?
          </Dialog.Body>
          <Dialog.Footer mt={2} flexWrap="wrap" gap='10px'>
            <Button
              colorPalette="blue"
              onClick={handleContinue}
              p={2}
              px={4}
              fontWeight="bold"
              borderRadius="20px"
              border="1px solid "
              borderColor="brandGreen.700"
            >
              Continue Building
            </Button>
            <Button
              variant="subtle"
              onClick={handleNewBuild}
              p={2}
              px={6}
              fontWeight="bold"
              background="brandGreen.500"
              color="black"
              borderRadius="20px"
              border="1px solid "
              borderColor="brandGreen.700"
            >
              New Build
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
