import { booksAtom } from '@/app/atoms/booksAtom'
import { generateRandomStrings } from '@/app/utils/generateRandomStrings'
import supabase from '@/app/utils/supabase'
import { Box, VStack, styled } from '@/styled-system/jsx'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { ListItem } from './ListItem'

export const List = () => {
  const [listTitle, setListTitle] = useState('')
  const books = useAtomValue(booksAtom)
  const router = useRouter()

  const handleClick = async () => {
    // URL用の文字列を生成
    const hash = generateRandomStrings(8)

    const { data, error } = await supabase
      .from('books')
      .insert({ list_title: listTitle, books_id: books, hash: hash })
      .select()
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data[0])
      router.push(`/${data[0].hash}`)
    }
  }

  return (
    <>
      <styled.h2 fontSize={'20px'} fontWeight={700}>
        リストに追加した書籍
      </styled.h2>
      <Box mt={'16px'}>
        <p>書籍を3冊追加してください</p>
        <styled.input
          type='text'
          value={listTitle}
          placeholder='リスト名を入力してください'
          onChange={e => setListTitle(e.target.value)}
          border={'solid 1px #ccc'}
          width={'300px'}
          p={'4px'}
          mt={'8px'}
        />
      </Box>
      <VStack gap={'8px'} mt={'16px'} alignItems={'stretch'}>
        {books.map(book => (
          <ListItem key={book} id={book} />
        ))}
        <Button
          onClick={() => handleClick()}
          disabled={books.length !== 3 ? true : false}
        >
          決定
        </Button>
      </VStack>
    </>
  )
}
