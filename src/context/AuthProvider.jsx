/* eslint-disable react-refresh/only-export-components */
import { urls } from '@/configs/constant'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function login(userData) {
    const user = {
      id: userData.idUsuario,
      username: userData.nombreUsuario,
      roles: userData.rolesUsuario
    }

    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  async function logout() {
    const response = await fetch(urls.LOGOUT, {
      method: 'POST',
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Error al cerrar sesión')
    }

    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
