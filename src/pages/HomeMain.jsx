import { useEffect } from 'react'

export default function HomeMain() {
  useEffect(() => {
    window.location.href = 'http://localhost:3000'
  }, [])

  return <></>
}
