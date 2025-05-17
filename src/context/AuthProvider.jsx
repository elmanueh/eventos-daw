import { AuthService } from '@/services/authService'
import { AuthContext } from '@context/AuthContext'
import { useEffect, useState } from 'react'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getUser()
        setUser(user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (username, password) => {
    const user = await AuthService.login(username, password)
    setUser(user)
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
