import { API_URLS, NAV_ROUTES } from '@/configs/constant'
import { TOAST_MESSAGES } from '@/configs/notifications'
import { useToast } from '@/hooks/useToast'
import MyToast from '@components/toast/MyToast'
import { AuthContext } from '@context/AuthContext'
import '@pages/auth/login.css'
import { useContext, useEffect, useRef, useState } from 'react'

export default function Login() {
  const { login } = useContext(AuthContext)
  const { toasts, showToast, hideToast } = useToast()

  const [errorMessage, setErrorMessage] = useState('')
  const [invalidFields, setInvalidFields] = useState({
    username: false,
    password: false
  })

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    if (usernameRef.current) {
      if (invalidFields.username)
        usernameRef.current.classList.add('is-invalid')
      else usernameRef.current.classList.remove('is-invalid')
    }
    if (passwordRef.current) {
      if (invalidFields.password)
        passwordRef.current.classList.add('is-invalid')
      else passwordRef.current.classList.remove('is-invalid')
    }
  }, [invalidFields])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()

    let hasError = false
    const newInvalidFields = { username: false, password: false }

    if (!username) {
      newInvalidFields.username = true
      setErrorMessage('Este campo es obligatorio')
      hasError = true
    }

    if (!password) {
      newInvalidFields.password = true
      setErrorMessage('Este campo es obligatorio')
      hasError = true
    }

    setInvalidFields(newInvalidFields)

    if (hasError) return

    setErrorMessage('')

    try {
      await login(username, password)
      window.location.replace(NAV_ROUTES.HOME)
    } catch {
      showToast(TOAST_MESSAGES.AUTH.LOGIN_ERROR)
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
      <MyToast toasts={toasts} hideToast={hideToast} />

      <h2>Inicia sesión</h2>

      <button
        type="button"
        className="btn btn-secondary"
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
          <label htmlFor="username">
            Nombre de usuario
            {invalidFields.username && (
              <span className="text-danger ms-2">({errorMessage})</span>
            )}
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            ref={usernameRef}
          />
        </div>

        <div className="form-group" id="formPassword">
          <label htmlFor="password">
            Contraseña
            {invalidFields.password && (
              <span className="text-danger ms-2">({errorMessage})</span>
            )}
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            ref={passwordRef}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
