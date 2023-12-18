'use client'
import { HStack, styled } from '@/styled-system/jsx'
import { useEffect, useState } from 'react'

export const ShareURL = () => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(document.location as unknown as string)
  }, [])

  return (
    <HStack>
      <styled.input
        type='text'
        value={`${url}`}
        w={'300px'}
        p={'8px'}
        border={'solid 1px #ccc'}
      />
      <styled.button
        type='button'
        color={'#3f3fdf'}
        fontWeight={700}
        cursor={'pointer'}
        onClick={() => {
          navigator.clipboard.writeText(url)
          console.log('コピーしました！')
        }}
      >
        COPY
      </styled.button>
    </HStack>
  )
}
