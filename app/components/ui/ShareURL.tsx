'use client'
import { HStack, styled } from '@/styled-system/jsx'

export const ShareURL = () => {
  // ブラウザではちゃんと取得できているけど、コンソールにはdocumentが定義されていないとエラーが出る
  const url = document.location as unknown as string

  return (
    <HStack>
      <styled.input
        type='text'
        value={`${url}`}
        w={'240px'}
        p={'8px'}
        border={'solid 1px #ccc'}
      />
      <button
        type='button'
        onClick={() => {
          navigator.clipboard.writeText(url)
          console.log('コピーしました！')
        }}
      >
        COPY
      </button>
    </HStack>
  )
}
