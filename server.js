import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

// Configuración de Handlebars
app.set('views', path.join(__dirname, 'views')); // Carpeta con las vistas de HBS
app.set('view engine', 'hbs');


// Ruta de inicio, donde se usa Handlebars
app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Bienvenido a la Página de Inicio',
    mensaje: 'Inicia sesión para continuar en tu aventura'
  });
});


// En tu servidor Express
app.get('/login', (req, res) => {
  res.redirect('http://localhost:5173/login');
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
