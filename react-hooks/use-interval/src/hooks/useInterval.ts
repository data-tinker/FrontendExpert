import { useEffect, useRef } from "react"

export default function useInterval(callback: () => void, delay: number) {
  const callbackRef = useRef<() => void>(callback)
  const intervalRef = useRef<number>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      intervalRef.current = setInterval(() => {
          callbackRef.current()
      }, delay)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [delay])
}
