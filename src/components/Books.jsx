import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [uniqueGenres, setUniqueGenres] = useState([])
  const allBooksResult = useQuery(ALL_BOOKS)

  const filteredBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  })

  useEffect(() => {
    if (allBooksResult.data) {
      const genres = allBooksResult.data.allBooks.flatMap(book => book.genres)
      setUniqueGenres([...new Set(genres)])
    }
  }, [allBooksResult.data])

  if (!props.show) {
    return null
  }

  if (filteredBooksResult.loading) {
    return <div>loading...</div>
  }
  const books = filteredBooksResult.data.allBooks

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
