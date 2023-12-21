import { booksAtom } from '@/app/atoms/booksAtom'
import { booksType } from '@/app/types/booksType'
import { css } from '@/styled-system/css'
import { Box, VStack, styled } from '@/styled-system/jsx'
import { Toast, createToaster } from '@ark-ui/react'
import { useAtom } from 'jotai'
import { Button } from '../ui/Button'

export const SearchResults = ({ results }: { results: booksType }) => {
  const items = results.items
  const [books, setBooks] = useAtom(booksAtom)

  const [Toaster, toast] = createToaster({
    placement: 'bottom-end',
    render(toast) {
      return (
        <Toast.Root className={toastRoot}>
          <Toast.Title className={toastTitle}>{toast.title}</Toast.Title>
          <Toast.Description className={toastDescription}>
            {toast.description}
          </Toast.Description>
          <Toast.CloseTrigger className={toastCloseTrigger}>
            ×
          </Toast.CloseTrigger>
        </Toast.Root>
      )
    },
  })

  const handleClick = (id: string) => {
    if (books.length === 3) {
      toast.create({
        title: 'Error!',
        description: '登録できる書籍は3冊までです',
      })
    } else if (books.includes(id)) {
      toast.create({
        title: 'Error!',
        description: 'その書籍はすでに追加されています',
      })
    } else {
      setBooks([...books, id])
    }
  }

  return (
    <Box mt={'16px'}>
      <p>検索結果：{results.totalItems}件</p>
      <Box mt={'8px'}>
        {items ? (
          items.map(item => {
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
          })
        ) : (
          <p>検索結果がありません</p>
        )}
      </Box>
      <Toaster />
    </Box>
  )
}

const toastRoot = css({
  background: '#9a0c0c',
  color: '#fff',
  padding: '16px',
  borderRadius: '8px',
  pos: 'relative',
  boxShadow: '2px 2px 4px rgba(0,0,0,.5)',
  animation: 'toastFadeIn .1s ease-in',
})

const toastTitle = css({
  fontSize: '14px',
  fontWeight: '700',
})

const toastDescription = css({
  fontSize: '14px',
  mt: '4px',
})

const toastCloseTrigger = css({
  pos: 'absolute',
  top: '8px',
  right: '16px',
  fontSize: '20px',
  cursor: 'pointer',
})
