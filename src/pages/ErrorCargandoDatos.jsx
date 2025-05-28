import { useRouteError } from 'react-router'

export default function ErrorCargandoDatos() {
  const error = useRouteError()

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center vh-100 p-4 bg-light">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5971/5971617.png"
        alt="Error cargando datos"
        style={{ width: '120px', marginBottom: '2rem' }}
      />
      <h1 className="display-4 mb-3 text-danger fw-bold">
        ¡Ups! Algo salió mal
      </h1>
      <p className="lead mb-4 text-dark">
        No hemos podido recuperar los datos correctamente. <br />
        Vuelve a intentarlo más tarde o recarga la página.
      </p>
      <p className="mb-4 text-secondary" style={{ fontStyle: 'italic' }}>
        {error?.message ||
          'Parece que algo salió mal, por favor intenta de nuevo más tarde.'}
      </p>

      <a
        href="/home"
        className="btn btn-danger mt-3"
        style={{ fontWeight: '600', padding: '0.8rem 1.5rem' }}
      >
        Volver al inicio
      </a>
      <p className="mt-4 text-dark" style={{ fontSize: '0.9rem' }}>
        ¿Tienes preguntas? Contacta con nuestro soporte en cualquier momento.
      </p>
    </div>
  )
}
