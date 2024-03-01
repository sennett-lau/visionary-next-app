import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

const InputPanel = () => {
  const [links, setLinks] = useState<string[]>([''])
  const [error, setError] = useState<boolean>(false)
  const toast = useToast()

  const isValidHttpUrl = (link: string) => {
    let url
    try {
      url = new URL(link)
    } catch (e) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  const handleAdd = () => {
    const lastLink = links[links.length - 1]
    if (isValidHttpUrl(lastLink)) {
      setError(false)
      setLinks([...links, '']) // Add new input field
    } else {
      setError(true)
      toast({
        title: 'Error',
        description: 'Please enter a valid YouTube link.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleChange = (value: string, index: number) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
  }

  const handleClear = () => {
    setLinks(['']) // Reset to initial state
    setError(false)
  }

  const handleDone = () => {
    // Implement what should happen when done
    console.log(links)
  }

  return (
    <VStack spacing={6} color={'visionary.100'}>
      <Text fontSize='3xl' fontWeight='bold'>
        Input YouTube link(s) below
      </Text>
      {links.map((link, index) => (
        <Box key={index} w={'400px'}>
          <Input
            value={link}
            isReadOnly={index < links.length - 1} // Lock input except for the last one
            onChange={(e) => handleChange(e.target.value, index)}
            placeholder='Enter YouTube link'
          />
        </Box>
      ))}
      <Flex color={'black'} w={'400px'}>
        <Button mr={2} onClick={handleClear} flex={1} bg={'#D9534F'}>
          Clear
        </Button>
        <Button mr={2} onClick={handleAdd} flex={1} bg={'#3a9c50'}>
          Add
        </Button>
        <Button onClick={handleDone} flex={1} bg={'#5BC0DE'}>
          Done
        </Button>
      </Flex>
    </VStack>
  )
}

export default InputPanel
