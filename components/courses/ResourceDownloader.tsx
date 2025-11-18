"use client";

import { Box, Button, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";

interface Resource {
  name: string;
  url: string;
}

interface ResourceDownloaderProps {
  resources: Resource[];
}

export default function ResourceDownloader({
  resources,
}: ResourceDownloaderProps) {
  return (
    <Box>
      <List spacing={3}>
        {resources.map((resource) => (
          <ListItem key={resource.name}>
            <Button
              as="a"
              href={resource.url}
              download
              leftIcon={<FaDownload />}
              variant="outline"
              w="full"
            >
              {resource.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
