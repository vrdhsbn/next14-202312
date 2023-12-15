'use client'
import { Box, HStack } from '@/styled-system/jsx'
import { Provider } from 'jotai'
import { List } from './components/models/List'
import { Search } from './components/models/Search'

export default function Home() {
  return (
    <>
      <Provider>
        <HStack alignItems={'flex-start'} gap={0}>
          <Box width={'65%'} height={'100vh'} overflow={'scroll'} p={'40px'}>
            <Search />
          </Box>
          <Box
            width={'35%'}
            height={'100vh'}
            borderLeft={'solid 1px #ccc'}
            paddingInline={'24px'}
            p={'40px'}
          >
            <List />
          </Box>
        </HStack>
      </Provider>
    </>
  )
}
