import express from 'express'
import hbs from 'hbs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))

// Configuración de Handlebars
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

// Register partials
hbs.registerPartials(path.join(__dirname, 'views/layout'))

// Ruta de inicio, donde se usa Handlebars
app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Eventy'
  })
})

// En tu servidor Express
app.get('/login', (req, res) => {
  res.redirect('http://localhost:5173/login')
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`)
})
