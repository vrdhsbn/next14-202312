'use client'
import { css } from '@/styled-system/css'
import { HStack, styled } from '@/styled-system/jsx'
import { Popover } from '@ark-ui/react'
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
        readOnly
      />
      <Popover.Root positioning={{ placement: 'top' }}>
        <Popover.Trigger asChild>
          <styled.button
            type='button'
            color={'#3f3fdf'}
            fontWeight={700}
            cursor={'pointer'}
            onClick={() => {
              navigator.clipboard.writeText(url)
            }}
          >
            COPY
          </styled.button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content className={popoverContent}>
            <Popover.Description className={popoverDescription}>
              コピーしました！
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </HStack>
  )
}

const popoverContent = css({
  bg: '#444',
  p: '8px 16px',
  borderRadius: '8px',
  boxShadow: '2px 2px 4px rgba(0,0,0,.5)',
})

const popoverDescription = css({
  color: '#fff',
  fontSize: '14px',
})
