'use client'
import { HStack, styled } from '@/styled-system/jsx'
import { useState } from 'react'
import { SearchResults } from './SearchResults'

type categoryType = 'inauthor:' | 'intitle:'

export const Search = () => {
  const [text, setText] = useState<string>('')
  const [category, setCategory] = useState<categoryType>('inauthor:')
  const [results, setResults] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('fetching...')
    // 取得数と検索時のオフセットを指定できる。あとで調整する。
    const searchResults = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${category}${text}&printType=books&maxResults=3&startIndex=0`,
    ).then(res => res.json())
    console.log('done.')
    console.log(searchResults)
    setResults(searchResults)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value as categoryType)
  }

  return (
    <>
      <styled.h1 fontSize={'20px'} fontWeight={700}>
        おすすめ書籍リスト作成
      </styled.h1>
      <styled.p mt={'16px'}>著者名またはタイトルで検索</styled.p>
      <form onSubmit={handleSubmit}>
        <styled.input
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
          border={'solid 1px #ccc'}
          width={'300px'}
          p={'4px'}
        />
        <HStack mt={'8px'} gap={'24px'}>
          <HStack gap={'4px'}>
            <input
              type='radio'
              name='category'
              id='author'
              value='inauthor:'
              onChange={e => handleChange(e)}
              checked={category === 'inauthor:' ? true : false}
            />
            <label htmlFor='author'>著者名</label>
          </HStack>
          <HStack gap={'4px'}>
            <input
              type='radio'
              name='category'
              id='title'
              value='intitle:'
              onChange={e => handleChange(e)}
              checked={category === 'intitle:' ? true : false}
            />
            <label htmlFor='title'>タイトル</label>
          </HStack>
        </HStack>
      </form>
      {results && <SearchResults results={results} />}
    </>
  )
}
