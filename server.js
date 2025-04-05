import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

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


// Ruta para el login (aquí puedes servir tu archivo React o una página de login estática)
app.get('/index', (req, res) => {
    // Aquí puedes servir un archivo HTML estático o la aplicación React.
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Suponiendo que React se sirva desde la carpeta dist
  });

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos generados por React (después de las rutas específicas)
app.use(express.static(path.join(__dirname, 'dist')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
