import { booksAtom } from '@/app/atoms/booksAtom'
import supabase from '@/app/utils/supabase'
import { VStack } from '@/styled-system/jsx'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { ListItem } from './ListItem'

export const List = () => {
  const books = useAtomValue(booksAtom)
  const router = useRouter()

  // ここでDB登録とかの処理をする
  const handleClick = async () => {
    const { data, error } = await supabase
      .from('books')
      .insert({ list_title: 'test', books_id: books })
      .select()
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data[0])
      router.push(`/${data[0].id}`)
    }
  }

  return (
    <>
      <h2>リストに追加した書籍</h2>
      <VStack gap={'8px'} mt={'16px'} alignItems={'stretch'}>
        {books.map(book => (
          <ListItem key={book} id={book} />
        ))}
        <Button onClick={() => handleClick()}>決定</Button>
      </VStack>
    </>
  )
}
