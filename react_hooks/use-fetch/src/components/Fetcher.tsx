import { useState } from 'react'
import useFetch from '../hooks/useFetch.ts'

function Fetcher() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1')
  const { responseJSON, isLoading, error } = useFetch(url)

  return (
    <>
      <input value={url} onChange={(e) => setUrl(e.target.value)}></input>
      {
        error ? <p>Error: {error.message}</p> :
          isLoading ? <p>Loading...</p> :
            <p>Response: {JSON.stringify(responseJSON)}</p>

      }
    </>
  )
}

export default Fetcher
