import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    console.log(username, password)
    if (!username) {
      setErrorMessage('Nombre de usuario es obligatorio')
    } else if (!password) {
      setErrorMessage('Contraseña es obligatoria')
    } else {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            usuario: username,
            contraseña: password
          }).toString()
        })

        if (!response.ok) {
          setErrorMessage('Credenciales incorrectas o error en el servidor.')
          return
        }

        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('nombre', data.nombreUsuario)
        localStorage.setItem('usuario', data.idUsuario)
        localStorage.setItem('rol', data.rolesUsuario)
        navigate('/')
      } catch (error) {
        setErrorMessage(
          'Hubo un problema al intentar iniciar sesión. Inténtalo nuevamente.'
        )
        console.error('Error:', error)
      }
    }
  }

  const handleGithubLogin = () => {
    console.log('Iniciar sesión con GitHub')

    window.location.href =
      'http://localhost:8080/api/oauth2/authorization/github'
  }

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Button variant="primary" onClick={handleLogin} block>
          Iniciar sesión
        </Button>

        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="secondary"
            onClick={handleGithubLogin}
            className="w-100"
          >
            <FaGithub className="me-2" />
            Iniciar sesión con GitHub
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Login
