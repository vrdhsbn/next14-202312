import { booksAtom } from '@/app/atoms/booksAtom'
import { booksType } from '@/app/types/booksType'
import { css } from '@/styled-system/css'
import { Box, VStack, styled } from '@/styled-system/jsx'
import { useAtom } from 'jotai'
import { Button } from '../ui/Button'

export const SearchResults = ({ results }: { results: booksType }) => {
  const items = results.items
  const [books, setBooks] = useAtom(booksAtom)

  const handleClick = (id: string) => {
    if (books.length === 3) {
      console.log('登録できる書籍は3冊までです')
    } else {
      setBooks([...books, id])
    }
  }

  return (
    <>
      <p>検索結果：{results.totalItems}件</p>
      <div>
        {items.map(item => {
          return (
            <styled.div
              key={item.id}
              display={'flex'}
              gap={'8px'}
              p={'16px'}
              borderTop={'solid 1px #ccc'}
              className={css({
                '&:last-of-type': {
                  borderBottom: 'solid 1px #ccc',
                },
              })}
            >
              <Box width={'120px'}>
                <img src={item.volumeInfo.imageLinks?.thumbnail} alt='' />
              </Box>
              <VStack alignItems={'flex-start'}>
                <p>{item.volumeInfo.title}</p>
                <p>
                  {item.volumeInfo.authors
                    ? item.volumeInfo.authors.join('、')
                    : 'N/A'}
                </p>
                <Button onClick={() => handleClick(item.id)}>
                  この本を追加する
                </Button>
              </VStack>
            </styled.div>
          )
        })}
      </div>
    </>
  )
}
