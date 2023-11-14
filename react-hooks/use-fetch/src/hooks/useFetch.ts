import { useEffect, useState } from 'react'

export default function useFetch(url: string) {
  const [responseJSON, setResponseJSON] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const controller = new AbortController()
    const { signal } = controller

    fetch(url, { signal }).then(response => {
      return response.json()
    })
      .then(setResponseJSON)
      .catch(error => {
        if (error.name !== 'AbortError') {
          setError(error);
        }
      })
      .finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [url])

  return {
    responseJSON,
    isLoading,
    error,
  }
}
