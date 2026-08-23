'use client';

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import Calculator from '../demos/Calculator';
import TodoApp from '../demos/TodoApp';
import ColorGen from '../demos/ColorGen';
import { Reveal } from '../utils/Reveal';

export default function ProjectsSection() {
  return (
    <Box
      py={{ base: 20, md: 32 }}
      bg='black'
      position='relative'
      overflow='hidden'
      minW={'100vw'}
      id={'projects-section'}
      placeSelf={'center'}>
      {/* Background Accents */}

      <Container
        position='relative'
        zIndex={1}
        alignSelf='center'
        maxW='container.xl'
        placeItems='center'
        justifySelf={'center'}>
        <Box
          width={'80vw'}
          height={'500px'}
          bgGradient='to-br'
          gradientFrom={'red'}
          gradientTo={'gold'}
          position='absolute'
          top={20}
          left={0}
          right={0}
          opacity={0.25}
          filter={'blur(120px)'}
          zIndex={0}
        />
        <VStack
          mb={16}
          gap={4}>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            textAlign='center'
            color='white'
            fontFamily='PoppinsSemi'>
            Interactive{' '}
            <Text
              as='span'
              color='brandGreen.500'
              className='neon-text'
              fontSize={{ base: '3xl', md: '5xl' }}
              fontFamily='PoppinsSemi'>
              Demos
            </Text>
          </Heading>
          <Text
            color='gray.400'
            maxW='2xl'
            textAlign='center'
            fontSize='lg'
            px={2}>
            Explore these fully functional mini-applications built with React
            and Chakra UI. Test them out right here!
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={10}
          mb={16}
          justifyContent={'space-evenly'}
          px={{ base: 4, lg: 8 }}>
          <Reveal delay={0.1}>
            <Box>
              <Text
                color='white'
                mb={4}
                textAlign='center'
                fontWeight='bold'>
                Calculator
              </Text>
              <Calculator />
            </Box>
          </Reveal>

          <Reveal delay={0.2}>
            <Box mt={{ base: 8, md: 0 }}>
              <Text
                color='white'
                mb={4}
                textAlign='center'
                fontWeight='bold'>
                Focus To-Do
              </Text>
              <TodoApp />
            </Box>
          </Reveal>

          <Reveal delay={0.3}>
            <Box mt={{ base: 8, md: 0 }}>
              <Text
                color='white'
                mb={4}
                textAlign='center'
                fontWeight='bold'>
                Palette Generator
              </Text>
              <ColorGen />
            </Box>
          </Reveal>
        </SimpleGrid>

        <Box textAlign='center'>
          <Button
            size='xl'
            fontSize={'lg'}
            borderRadius='full'
            colorPalette='gray'
            borderColor='whiteAlpha.300'
            color='white'
            _hover={{
              borderColor: 'brandGreen.500',
              bg: 'whiteAlpha.100',
              transform: 'translateY(-4px)',
            }}
            transition='all 0.3s'
            className='hover-lift'
            px={10}
            py={6}
            variant={'outline'}
            onClick={() => window.open('https://github.com/poshcodes', '_blank')}
            aria-label='View more projects on GitHub'
            title='View PoshCodes GitHub Profile'>
            <FaGithub
              style={{ marginRight: '10px', fontSize: '1em' }}
              color='white'
            />{' '}
            View More on GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
