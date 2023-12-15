export type booksType = {
  kind: string
  totalItems: number
  items: Array<bookType>
}

export type bookType = {
  id: string
  volumeInfo: {
    title: string
    authors: Array<string>
    imageLinks: {
      thumbnail: string
      smallThumbnail: string
    }
    industryIdentifiers: { identifier: string }[]
  }
}
