'use client'
import { bookType } from '@/app/types/booksType'
import { Box, VStack, styled } from '@/styled-system/jsx'
import { useEffect, useState } from 'react'

export const BookItem = ({ id }: { id: string }) => {
  const [bookInfo, setBookInfo] = useState<bookType | null>(null)

  // ここのロジックはListItemと同じ。hooksとして切り出せないか？
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async (id: string) => {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`,
      ).then(res => res.json())
      setBookInfo(data)
    }

    console.log('start useEffect')
    fetchData(id)
    console.log('end useEffect')
  }, [])

  if (!bookInfo) return

  console.log(bookInfo)

  return (
    <VStack flex={1}>
      <Box height={'180px'} flexShrink={0}>
        <styled.img
          src={bookInfo.volumeInfo.imageLinks?.thumbnail}
          alt=''
          width={'120px'}
          objectFit={'contain'}
        />
      </Box>
      <Box>
        <p>{bookInfo.volumeInfo.title}</p>
        <p>
          {bookInfo.volumeInfo.authors
            ? bookInfo.volumeInfo.authors.join('、')
            : 'N/A'}
        </p>
      </Box>
    </VStack>
  )
}
