import { routes, urls } from '@/configs/constant'
import { AuthContext } from '@context/AuthProvider'
import '@pages/auth/login.css'
import { useContext } from 'react'

function showMessageError(message) {
  const element = document.getElementById('errorMessage')
  element.innerHTML = message
  element.classList.remove('d-none')
}

export default function Login() {
  const { login } = useContext(AuthContext)

  const handleLogin = async () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (!username) {
      return showMessageError('El nombre de usuario es obligatorio.')
    }

    if (!password) {
      return showMessageError('La contraseña es obligatoria.')
    }

    try {
      const response = await fetch(urls.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ usuario: username, contraseña: password }),
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? 'Credenciales incorrectas.'
            : 'Error en el servidor.'
        return showMessageError(errorMessage)
      }

      const userData = await response.json()
      login(userData)
      window.location.replace(routes.HOME)
    } catch {
      showMessageError('Error de conexión. Intenta más tarde.')
    }
  }

  const handleGithubLogin = () => {
    console.log('Iniciar sesión con GitHub')
    window.location.href = urls.GITHUB

    // Poner información en el localStorage
    // login(data);
  }

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>

      <form className="d-grid gap-3">
        <div className="form-group" id="formUsername">
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" id="username" className="form-control" />
        </div>

        <div className="form-group" id="formPassword">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="form-control" />
        </div>

        <div id="errorMessage" className="alert alert-danger d-none" />

        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleGithubLogin}
        >
          Iniciar sesión con GitHub
        </button>
      </form>
    </div>
  )
}
