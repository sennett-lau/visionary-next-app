import InputPanel from '@/component/panels/InputPanel'
import LearningPanel from '@/component/panels/LearningPanel'
import { RootState } from '@/store'
import { PanelState } from '@/types'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import { useSelector } from 'react-redux'

export const getServerSideProps: GetServerSideProps = async () => {
  // for api call in server side
  return {
    props: {},
  }
}

type Props = {
  // server side api call's props can be defined here
}

const Home: FC<Props> = (props) => {
  const panelState = useSelector(
    (state: RootState) => state.controlSlice.panelState,
  )

  return (
    <>
      <Head>
        <title>Next Chakra Starter | 0xBlanc</title>
        <meta name='description' content='Visionary' />

        <meta name='og:title' content='Visionary AI web application' />
        <meta
          name='og:description'
          content='Visionary, an AI personalization web learning application tool.'
        />
        <meta property='og:site_name' content='Visionary' />
        <meta property='og:type' content='website' />

        <meta name='twitter:title' content='Visionary' />
        <meta
          name='twitter:description'
          content='Visionary, an AI personalization web learning application tool.'
        />
      </Head>
      <Flex
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100%'}
        color={'visionary.900'}
      >
        {
          // Render different panel based on the state
          panelState === PanelState.inputs && <InputPanel />
        }
        {panelState === PanelState.learning && <LearningPanel />}
      </Flex>
    </>
  )
}

export default Home
