export default function Loading() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: '4rem', height: '4rem' }}
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3 fs-5 text-secondary">Cargando...</p>
    </div>
  )
}
