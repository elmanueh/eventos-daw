import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Eventy. Todos los derechos reservados.</p>
        <p>
          Creado por:{' '}
          <a href="https://github.com/ElManueh" target="_blank" rel="noreferrer">
            <strong>ElManueh</strong>
          </a>{' '}
          y{' '}
          <a href="https://github.com/Julisco23" target="_blank" rel="noreferrer">
            <strong>Julisco23</strong>
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
