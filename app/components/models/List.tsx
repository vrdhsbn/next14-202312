import { booksAtom } from '@/app/atoms/booksAtom'
import { listTitleAtom } from '@/app/atoms/listTitleAtom'
import { insertRecord } from '@/app/utils/insertRecord'
import { Box, VStack, styled } from '@/styled-system/jsx'
import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { ListItem } from './ListItem'

export const List = () => {
  const [listTitle, setListTitle] = useAtom(listTitleAtom)
  const books = useAtomValue(booksAtom)
  const router = useRouter()

  const handleClick = async () => {
    const hash = await insertRecord(listTitle, books)
    router.push(`/${hash}`)
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
