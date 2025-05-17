import { API_URLS, NAV_ROUTES } from '@/configs/constant'
import { showMessageError } from '@/utils/error'
import { AuthContext } from '@context/AuthContext'
import '@pages/auth/login.css'
import { useContext } from 'react'

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
      await login(username, password)
      window.location.replace(NAV_ROUTES.HOME)
    } catch (error) {
      showMessageError(error.message)
    }
  }

  const handleGithubLogin = () => {
    const width = 450
    const height = 550
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(
      API_URLS.AUTH_GITHUB_OAUTH,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval)
        window.location.href = NAV_ROUTES.HOME
      }
    }, 500)
  }

  return (
    <div className="login">
      <h2>Inicia sesión</h2>

      <button
        type="button"
        className="btn btn-secondary "
        onClick={handleGithubLogin}
      >
        <i className="bi bi-github" /> Continuar con GitHub
      </button>

      <div className="d-flex align-items-center my-3">
        <hr className="flex-grow-1" />
        <span className="mx-2">o</span>
        <hr className="flex-grow-1" />
      </div>

      <form className="d-grid gap-3" onSubmit={handleLogin}>
        <div className="form-group" id="formUsername">
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" id="username" className="form-control" />
        </div>

        <div className="form-group" id="formPassword">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="form-control" />
        </div>

        <div id="errorMessage" className="alert alert-danger d-none" />

        <button type="submit" className="btn btn-primary mt-1">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
