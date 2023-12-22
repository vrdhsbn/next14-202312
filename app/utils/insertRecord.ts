import { generateRandomStrings } from './generateRandomStrings'
import supabase from './supabase'

export const insertRecord = async (listTitle: string, books: Array<string>) => {
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
    return data[0].hash
  }
}
