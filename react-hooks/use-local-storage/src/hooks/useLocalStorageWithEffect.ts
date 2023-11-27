import { useEffect, useState } from "react"

export default function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initialValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
