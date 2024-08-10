import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const SetBirth = ({ authors }) => {
  const options = authors.map(a => ({
    value: a.name,
    label: a.name,
  }))

  const [nameOption, setNameOption] = useState(null)
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = event => {
    event.preventDefault()
    const setBornTo = parseInt(year)
    const name = nameOption.value
    editAuthor({ variables: { name, setBornTo } })
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <Select
            defaultValue={nameOption}
            onChange={setNameOption}
            options={options}
          />
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
