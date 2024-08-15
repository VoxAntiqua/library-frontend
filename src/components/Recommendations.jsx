import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { ME } from '../queries'

const Recommendations = props => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [books, setBooks] = useState([])

  const { data: userData, loading: userLoading } = useQuery(ME, {
    skip: !props.token,
  })

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
    skip: !genreFilter,
  })

  useEffect(() => {
    if (userData && userData.me) {
      setGenreFilter(userData.me.favoriteGenre)
    } else {
      setGenreFilter(null)
    }
  }, [userData])

  useEffect(() => {
    if (booksData) {
      setBooks(booksData.allBooks)
    }
  }, [booksData])

  if (userLoading || booksLoading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {genreFilter ? (
        <>
          books in your favorite genre <b>{genreFilter}</b>
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
    </div>
  )
}

export default Recommendations
