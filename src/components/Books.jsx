import { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

const Books = props => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [uniqueGenres, setUniqueGenres] = useState([])

  const {
    data: filteredBooksData,
    loading: filteredBooksLoading,
    refetch,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  })

  const { data: allBooksData, loading: allBooksLoading } = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (allBooksData) {
      const genres = allBooksData.allBooks.flatMap(book => book.genres)
      setUniqueGenres([...new Set(genres)])
    }
  }, [allBooksData])

  useEffect(() => {
    if (filteredBooksData) {
      refetch()
    }
  }, [genreFilter])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    },
  })

  if (!props.show) {
    return null
  }

  if (allBooksLoading || filteredBooksLoading) {
    return <div>loading...</div>
  }
  const books = filteredBooksData.allBooks

  return (
    <div>
      <h2>books</h2>
      {genreFilter ? (
        <>
          in genre <b>{genreFilter}</b>
        </>
      ) : (
        ''
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map(genre => (
        <button
          key={genre}
          onClick={() => {
            setGenreFilter(genre)
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          setGenreFilter(null)
        }}
      >
        all genres
      </button>
    </div>
  )
}

export default Books
