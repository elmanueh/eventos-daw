import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import '../../css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (usuario = username, contraseña = password) => {
    if (!usuario) return setErrorMessage('Nombre de usuario es obligatorio');
    if (!contraseña) return setErrorMessage('Contraseña es obligatoria');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ usuario, contraseña }),
        credentials: 'include',
      });

      if (!response.ok) {
        return setErrorMessage(response.status === 401
          ? 'Credenciales incorrectas.'
          : 'Error en el servidor.');
      }

      const data = await response.json();
      login(data);
      navigate('/home');
    } catch (error) {
      setErrorMessage('Error de conexión. Intenta más tarde.');
      console.error('Login error:', error);
    }
  };

  //TODO: Ver como hacerlo
  const handleGithubLogin = () => {
    console.log('Iniciar sesión con GitHub');

    window.location.href = 'http://localhost:8080/api/oauth2/authorization/github';

    // Poner información en el localStorage 
    // login(data);
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <Form className="d-grid gap-3">
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Button variant="primary" onClick={() => handleLogin()}>Iniciar sesión</Button>
        <Button variant="secondary" onClick={handleGithubLogin}>
          <FaGithub className="me-2" />
          Iniciar sesión con GitHub
        </Button>
        <Button variant="warning" onClick={() => handleLogin('admin', 'admin123')}>
          Acceder como Admin
        </Button>
      </Form>
    </div>
  );
}

export default Login;
