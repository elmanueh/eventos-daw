import { API_URLS } from '@/configs/constant'
import { AuthContext } from '@context/AuthContext'
import { useEffect, useState } from 'react'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function login(userData) {
    const userInfo = {
      id: userData.idUsuario,
      username: userData.nombreUsuario,
      roles: userData.rolesUsuario
    }

    localStorage.setItem('user', JSON.stringify(userInfo))
    setUser(userInfo)
  }

  async function logout() {
    const response = await fetch(API_URLS.AUTH_LOGOUT, {
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
