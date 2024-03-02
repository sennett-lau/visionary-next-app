import { setPanelState } from '@/store/controlSlice'
import { setQuizzes, setSummaries } from '@/store/learningSlice'
import { PanelState } from '@/types'
import { ILearningQuiz, ILearningSummary } from '@/types/learning'
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
import { useDispatch } from 'react-redux'

const InputPanel = () => {
  const [links, setLinks] = useState<string[]>([''])
  const [error, setError] = useState<boolean>(false)
  const toast = useToast()
  const dispatch = useDispatch()

  const isValidHttpUrl = (link: string) => {
    let url
    try {
      url = new URL(link)
    } catch (e) {
      return false
    }

    // if the link is already in links, return false
    if (links.includes(link)) {
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
    console.log(links)

    // set api to get summary and quiz
    // show loading panel before api call
    dispatch(
      setPanelState({
        panelState: PanelState.loading,
      }),
    )

    // api call

    const summaries: ILearningSummary[] = [
      {
        section: 1,
        title: 'Section 1',
        content:
          'This is the first section of the summary.\n\nIt has multiple lines.',
      },
      {
        section: 2,
        title: 'Section 2',
        content:
          'This is the second section of the summary.\n\nIt also has multiple lines.',
      },
      {
        section: 3,
        title: 'Section 3',
        content:
          'This is the third section of the summary.\n\nIt also has multiple lines.',
      },
    ]

    const quizzes: ILearningQuiz[] = [
      {
        section: 1,
        number: 1,
        question: 'Question 1',
        options: [
          { label: 'A', value: 'Option A' },
          { label: 'B', value: 'Option B' },
          { label: 'C', value: 'Option C' },
          { label: 'D', value: 'Option D' },
        ],
        answer: 'A',
      },
      {
        section: 1,
        number: 2,
        question: 'Question 1',
        options: [
          { label: 'A', value: 'Option A' },
          { label: 'B', value: 'Option B' },
          { label: 'C', value: 'Option C' },
          { label: 'D', value: 'Option D' },
        ],
        answer: 'A',
      },
      {
        section: 2,
        number: 1,
        question: 'Question 1',
        options: [
          { label: 'A', value: 'Option A' },
          { label: 'B', value: 'Option B' },
          { label: 'C', value: 'Option C' },
          { label: 'D', value: 'Option D' },
        ],
        answer: 'A',
      },
      {
        section: 3,
        number: 1,
        question: 'Question 1',
        options: [
          { label: 'A', value: 'Option A' },
          { label: 'B', value: 'Option B' },
          { label: 'C', value: 'Option C' },
          { label: 'D', value: 'Option D' },
        ],
        answer: 'A',
      },
    ]

    // set summaries and quiz to redux

    dispatch(
      setSummaries({
        summaries,
      }),
    )

    dispatch(
      setQuizzes({
        quizzes,
      }),
    )

    dispatch(
      setPanelState({
        panelState: PanelState.learning,
      }),
    )
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
