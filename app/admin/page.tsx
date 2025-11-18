"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "settings"));
        const settingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSettings(settingsData[0]);
      } catch (error) {
        console.error("Error fetching settings: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSettings();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdate = async (key: string, value: any) => {
    if (!settings) return;
    try {
      const settingsRef = doc(db, "settings", settings.id);
      await updateDoc(settingsRef, { [key]: value });
      setSettings({ ...settings, [key]: value });
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings: ", error);
      alert("Error updating settings. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <VStack minH="100vh" justify="center" align="center">
        <Box w="300px">
          <FormControl>
            <FormLabel>Admin Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </VStack>
    );
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold">
        Admin Panel
      </Text>
      {settings && (
        <VStack mt={8} spacing={4} align="flex-start">
          <FormControl>
            <FormLabel>Projects Completed</FormLabel>
            <Input
              type="number"
              defaultValue={settings.projectsCompleted}
              onBlur={(e) =>
                handleUpdate("projectsCompleted", parseInt(e.target.value))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>People Worked With</FormLabel>
            <Input
              type="number"
              defaultValue={settings.peopleWorkedWith}
              onBlur={(e) =>
                handleUpdate("peopleWorkedWith", parseInt(e.target.value))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Star Rating</FormLabel>
            <Input
              type="number"
              step="0.1"
              defaultValue={settings.starRating}
              onBlur={(e) =>
                handleUpdate("starRating", parseFloat(e.target.value))
              }
            />
          </FormControl>
        </VStack>
      )}
    </Box>
  );
}
