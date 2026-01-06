"use client";

import {Box, Button, List, ListItem} from "@chakra-ui/react";
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
      <List.Root gap="3">
        {resources.map((resource) => (
          <List.Item key={resource.name}>
            <Button
              variant="outline"
              w="full"
              onClick={() => window.open(resource.url, '_blank')}
            >
              <FaDownload style={{marginRight: '8px'}} />
              {resource.name}
            </Button>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
