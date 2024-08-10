import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const SetBirth = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = event => {
    event.preventDefault()
    const setBornTo = parseInt(year)
    editAuthor({ variables: { name, setBornTo } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>
        <div>
          born{' '}
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirth
