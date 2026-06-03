"use client";

import {Button, HStack, IconButton, Input, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {FaTrash, FaCheck, FaCheckCircle, FaPlus} from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp () {
  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, text: "Learn React", completed: true},
    {id: 2, text: "Build a project", completed: false},
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if(!input.trim()) return;
    setTodos([...todos, {id: Date.now(), text: input, completed: false}]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
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
      align="stretch"
    >
      <Text fontSize="xl" fontWeight="bold" color="brandGreen.400" textAlign="center" mb={4}>
        Focus Tasks
      </Text>

      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          borderColor="brandGreen.700"
          _focus={{borderColor: "brandGreen.500"}}
          color="white"
          variant={'flushed'}
        />
        <Button onClick={addTodo} colorPalette="green" variant="solid" py={'2px'} px={'15px'} borderRadius={'xl'} fontSize={'15px'}>
          <FaPlus/>
        </Button>
      </HStack>

      <VStack mt={4} align="stretch" maxH="200px" overflowY="auto">
        {todos.map(todo => (
          <HStack
            key={todo.id}
            p={3}
            bg="gray.800"
            borderRadius="2xl"
            justify="space-between"
            opacity={todo.completed ? 0.6 : 1}
          >
            <Text
              color="white"
              textDecoration={todo.completed ? "line-through" : "none"}
              flex={1}
            >
              {todo.text}
            </Text>
            <HStack>
              <IconButton
                aria-label="Toggle"
                size="xs"
                colorPalette={todo.completed ? "green" : "orange"}
                variant="ghost"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed? <FaCheckCircle/>:<FaCheck />}
              </IconButton>
              <IconButton
                aria-label="Delete"
                size="xs"
                colorPalette="red"
                variant="ghost"
                onClick={() => deleteTodo(todo.id)}
              >
                <FaTrash />
              </IconButton>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
