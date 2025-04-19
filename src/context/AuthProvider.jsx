import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const nombre = localStorage.getItem('nombre')
    const roles = localStorage.getItem('roles')
    const id = localStorage.getItem('idUsuario')

    if (nombre && roles && id) {
      setUsuario({ nombre, roles, id })
    }
  }, [])

  const login = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('nombre', data.nombreUsuario)
    localStorage.setItem('idUsuario', data.idUsuario)
    localStorage.setItem('roles', data.rolesUsuario)

    setUsuario({
      nombre: data.nombreUsuario,
      roles: data.rolesUsuario,
      idUsuario: data.idUsuario
    })
  }

  const logout = () => {
    localStorage.clear()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
