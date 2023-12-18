import { Center, Container, HStack, VStack } from '@/styled-system/jsx'
import { BookItem } from '../components/models/BookItem'
import { ShareURL } from '../components/ui/ShareURL'
import supabase from '../utils/supabase'

const MyList = async ({ params }: { params: { hash: string } }) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .match({ hash: params.hash })
  if (error) {
    console.log(error)
  }

  if (data) {
    const books = data[0].books_id

    return (
      <Container maxWidth={'960px'}>
        <p>おすすめリスト ID: {params.hash}</p>
        <HStack
          gap={'8px'}
          mt={'16px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {books.map((
            book: string,
          ) => (
            <BookItem key={book} id={book} />
          ))}
        </HStack>
        <VStack mt={'32px'}>
          <p>このリストをシェアしよう</p>
          <ShareURL />
        </VStack>
        <Center mt={'24px'}><a href="/">トップに戻る</a></Center>
      </Container>
    )
  }
}

export default MyList
