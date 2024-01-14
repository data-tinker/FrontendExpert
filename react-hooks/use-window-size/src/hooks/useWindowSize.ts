import { useEffect, useState } from "react"

export default function useWindowSize(): number[] {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const updateWindowSize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", updateWindowSize)

    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  return [
    width,
    height,
  ]
}
