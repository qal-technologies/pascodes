"use client";

import { Dialog, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface UnfinishedBuildModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UnfinishedBuildModal({ open, onClose }: UnfinishedBuildModalProps) {
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
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>Unfinished Build</Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            You have an unfinished build. Would you like to continue where you
            left off or start a new build?
          </Dialog.Body>
          <Dialog.Footer>
            <Button colorScheme="blue" mr={3} onClick={handleContinue}>
              Continue Building
            </Button>
            <Button variant="ghost" onClick={handleNewBuild}>
              New Build
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
