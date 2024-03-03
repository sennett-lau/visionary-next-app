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
import {
  addRevealedQuestion,
  addUserAnswer,
  setCurrentSection,
} from '@/store/learningSlice'
import { useDispatch, useSelector } from 'react-redux'

const LearningPanel = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const currentSection = useSelector(
    (state: RootState) => state.learningSlice.currentSection,
  )
  const userAnswers = useSelector(
    (state: RootState) => state.learningSlice.userAnswers,
  )
  const revealedQuestions = useSelector(
    (state: RootState) => state.learningSlice.revealedQuestions,
  )

  const dispatch = useDispatch()

  const summaries = useSelector(
    (state: RootState) => state.learningSlice.summaries,
  )
  const quizzes = useSelector((state: RootState) => state.learningSlice.quizzes)

  const toggleSummary = (section: number) => {
    dispatch(setCurrentSection({ currentSection: section }))
  }

  const userAnswerOnChange = (
    section: number,
    question: number,
    answer: string,
  ) => {
    console.log(section, question, answer)
    dispatch(addUserAnswer({ section: section, question, answer }))
  }

  const revealAnswer = (section: number, question: number) => {
    const userAnswer = userAnswers.find(
      (ua) => ua.section === section && ua.question === question,
    )!.answer

    const quizAnswer = quizzes.find(
      (quiz) => quiz.section === section && quiz.number === question,
    )!.answer

    const isCorrect = userAnswer === quizAnswer

    dispatch(
      addRevealedQuestion({
        section,
        questionNumber: question,
        userAnswer,
        quizAnswer,
      }),
    )
  }

  const getBorderColor = (question: number, option: string) => {
    const revealed = revealedQuestions.find(
      (rq) => rq.section === currentSection && rq.questionNumber === question,
    )

    if (!revealed) {
      return 'none'
    }

    if (
      revealed.userAnswer !== option &&
      revealed.quizAnswer !== revealed.userAnswer &&
      option === revealed.quizAnswer
    ) {
      return '1px solid green'
    }

    if (revealed.userAnswer !== option) {
      return 'none'
    }

    return revealed.userAnswer === revealed.quizAnswer
      ? '1px solid green'
      : '1px solid red'
  }

  return (
    <HStack spacing={4} w='100%' h='100%' align={'start'} px={8}>
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
              {currentSection === summary.section && (
                <Text mt={2}>{summary.content}</Text>
              )}
            </Flex>
          </Box>
        ))}
      </VStack>

      {/* Quizzes Panel */}
      <VStack w='50%' spacing={4} align='start'>
        {currentSection !== null &&
          currentSection !== 0 &&
          quizzes
            .filter((quiz) => quiz.section === currentSection)
            .map((quiz) => (
              <Flex
                shadow='md'
                bg={'visionary.800'}
                color={'visionary.100'}
                w={'100%'}
              >
                <Box key={quiz.number} p={4} w={'100%'}>
                  <Text fontWeight='bold' fontSize={'lg'} ml={2} mb={2}>{quiz.question}</Text>
                  <RadioGroup
                    onChange={(value) =>
                      userAnswerOnChange(quiz.section, quiz.number, value)
                    }
                    value={
                      userAnswers.find(
                        (ua) =>
                          ua.section === quiz.section &&
                          ua.question === quiz.number,
                      )?.answer || ''
                    }
                  >
                    <Stack direction='column'>
                      {quiz.options.map((option) => (
                        <Flex
                          border={getBorderColor(quiz.number, option.label)}
                          pl={2}
                          py={2}
                        >
                          <Radio key={option.label} value={option.label}>
                            {option.value}
                          </Radio>
                        </Flex>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
                <Flex flexDir={'column'} justifyContent={'end'}>
                  <Text
                    bg={'visionary.800'}
                    color={'visionary.100'}
                    p={4}
                    shadow='md'
                    fontWeight='bold'
                    cursor={'pointer'}
                    _hover={{ bg: 'visionary.700' }}
                    onClick={() => revealAnswer(quiz.section, quiz.number)}
                  >
                    Reveal
                  </Text>
                </Flex>
              </Flex>
            ))}
      </VStack>
    </HStack>
  )
}

export default LearningPanel
