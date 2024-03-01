import Header from '@/component/common/Header'
import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <Flex
      minH={'100vh'}
      direction={'column'}
      position={'relative'}
      overflow={'hidden'}
    >
      <Header />
      <Flex
        flex={1}
        direction={'column'}
        align={'center'}
        justify={'center'}
        bg={'visionary.900'}
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default AppLayout
