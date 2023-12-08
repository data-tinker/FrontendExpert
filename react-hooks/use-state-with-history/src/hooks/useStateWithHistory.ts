import { useRef, useState } from "react"

export default function useStateWithHistory<T>(initValue: T): [T, T | ((newValue: T) => void), () => void, () => void, T[]] {
  const [value, setValueInternal] = useState(initValue)
  const currentIdx = useRef(0)
  const history = useRef<T[]>([initValue])

  const setValue = (newValue: T | ((prevValue: T) => T)) => {
    let finalValue: T;
    if (typeof newValue === "function") {
      finalValue = (newValue as (prevValue: T) => T)(value);
    } else {
      finalValue = newValue
    }
    history.current.push(finalValue)
    currentIdx.current = history.current.length - 1
    setValueInternal(finalValue)
  }

  const goBack = () => {
    if (currentIdx.current == 0) {
      return
    }
    currentIdx.current -= 1
    setValueInternal(history.current[currentIdx.current])
  }

  const goForward = () => {
    if (currentIdx.current == history.current.length -1) {
      return
    }

    currentIdx.current += 1
    setValueInternal(history.current[currentIdx.current])
  }


  return [value, setValue, goBack, goForward, history.current]
}
