import {
  Box,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

// Import or define your interfaces here
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const LearningPanel = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const summaries = useSelector(
    (state: RootState) => state.learningSlice.summaries,
  )
  const quizzes = useSelector((state: RootState) => state.learningSlice.quizzes)

  const toggleSummary = (section: number) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <HStack spacing={4} w='100%' h='100%' align={'start'}>
      {/* Summaries Panel */}
      <VStack w='50%' spacing={4} align='start'>
        {summaries.map((summary) => (
          <Box
            key={summary.section}
            shadow='md'
            bg={'visionary.800'}
            color={'visionary.100'}
            w={'100%'}
          >
            <Flex
              cursor={'pointer'}
              onClick={() => toggleSummary(summary.section)}
              w='100%'
              justifyContent='start'
              flexDir={'column'}
              py={6}
              px={4}
              _hover={{ bg: 'visionary.800' }}
            >
              <Text fontSize='lg' fontWeight='bold' textAlign='left'>
                {summary.title}
              </Text>
              {expandedSection === summary.section && (
                <Text mt={2}>{summary.content}</Text>
              )}
            </Flex>
          </Box>
        ))}
      </VStack>

      {/* Quizzes Panel */}
      <VStack w='50%' spacing={4} align='start'>
        {expandedSection !== null &&
          quizzes
            .filter((quiz) => quiz.section === expandedSection)
            .map((quiz) => (
              <Box
                key={quiz.number}
                p={4}
                w={'100%'}
                shadow='md'
                bg={'visionary.800'}
                color={'visionary.100'}
              >
                <Text fontWeight='bold'>{quiz.question}</Text>
                <RadioGroup defaultValue=''>
                  <Stack direction='column'>
                    {quiz.options.map((option) => (
                      <Radio key={option.label} value={option.label}>
                        {option.value}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            ))}
      </VStack>
    </HStack>
  )
}

export default LearningPanel
