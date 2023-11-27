import { useState } from "react"

export default function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key)
    if (savedValue == null) {
      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }
    return JSON.parse(savedValue)
  })

  const setValueInLocalstorage = (newValue: string | ((prevValue: string) => string)) => {
    let finalValue = newValue
    if (typeof newValue === "function") {
      finalValue = newValue(value)
    }
    localStorage.setItem(key, JSON.stringify(finalValue))
    setValue(finalValue)
  }

  return [value, setValueInLocalstorage]
}
