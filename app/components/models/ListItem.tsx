'use client'
import { booksAtom } from '@/app/atoms/booksAtom'
import { bookType } from '@/app/types/booksType'
import { Box, HStack } from '@/styled-system/jsx'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

export const ListItem = ({ id }: { id: string }) => {
  const [books, setBooks] = useAtom(booksAtom)
  const [bookInfo, setBookInfo] = useState<bookType | null>(null)

  // 依存配列を空にするといつもこのエラーが出ちゃうけどどうしたら良いんだろう？
  // 初回レンダー時だけ実行したいときは空で良かったはずだけど…
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

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      <HStack>
        <Box width={'60px'} flexShrink={0}>
          <img src={bookInfo.volumeInfo.imageLinks?.smallThumbnail} alt='' />
        </Box>
        <Box>
          <p>{bookInfo.volumeInfo.title}</p>
          <p>
            {bookInfo.volumeInfo.authors
              ? bookInfo.volumeInfo.authors.join('、')
              : 'N/A'}
          </p>
        </Box>
      </HStack>
      <Box flexShrink={0}>
        <Button
          onClick={() => setBooks(books.filter(book => book !== bookInfo.id))}
        >
          削除
        </Button>
      </Box>
    </HStack>
  )
}
