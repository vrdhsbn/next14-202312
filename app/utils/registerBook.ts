export const registerBook = (
  id: string,
  books: string[],
  setBooks: (arr: string[]) => string[],
) => {
  // すでに書籍が3冊登録されている場合
  if (books.length === 3) {
    throw new Error('登録できる書籍は3冊までです')
  }

  // すでに同じ書籍が登録されている場合
  if (books.includes(id)) {
    throw new Error('その書籍はすでに追加されています')
  }

  setBooks([...books, id])
}
