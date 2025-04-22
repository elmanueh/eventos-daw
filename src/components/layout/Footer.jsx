import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sobre Eventy</h3>
          <p>
            Eventy es tu plataforma de confianza para descubrir, gestionar y
            asistir a eventos en tu ciudad. Reserva, conecta y vive experiencias
            inolvidables.
          </p>
        </div>

        <div className="footer-section">
          <h3>Enlaces útiles</h3>
          <ul>
            <li>
              <a href="#">Acerca de nosotros</a>
            </li>
            <li>
              <a href="#">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
            <li>
              <a href="mailto:contacto@eventy.com">Contacto</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Desarrolladores</h3>
          <p>Proyecto desarrollado por:</p>
          <ul>
            <li>
              <a
                href="https://github.com/ElManueh"
                target="_blank"
                rel="noreferrer"
              >
                ElManueh <i className="bi bi-github" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Julisco23"
                target="_blank"
                rel="noreferrer"
              >
                Julisco23 <i className="bi bi-github" />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a
              href="https://twitter.com/eventy"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-twitter-x" />
            </a>
            <a
              href="https://instagram.com/eventy"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-instagram" />
            </a>
            <a href="mailto:contacto@eventy.com">
              <i className="bi bi-envelope-fill" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Eventy. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
