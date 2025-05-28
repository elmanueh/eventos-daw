import { Link } from 'react-router'

export default function ErrorNotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center vh-100 bg-light p-4">
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <img
        src="https://media.giphy.com/media/fnDwbHk8HhY0s/giphy.gif"
        alt="Homer disappearing"
        className="img-fluid my-4"
        style={{ maxHeight: '300px', borderRadius: '20px' }}
      />

      <h2 className="mb-3 text-danger">¡Ups! ¿Y tú quién eres?</h2>

      <p className="lead mb-4 text-dark">
        Parece que has entrado en un rincón del universo que ni nosotros
        conocíamos. <br />
        No hay tesoros, ni secretos, ni sentido... solo vacío existencial.
      </p>

      <Link to="/home" className="btn btn-lg btn-danger shadow-sm">
        Llévame de vuelta al mundo real
      </Link>

      <p className="mt-4 text-dark" style={{ fontSize: '0.9rem' }}>
        O quédate aquí, reflexionando sobre tus decisiones. Tú sabrás.
      </p>
    </div>
  )
}
