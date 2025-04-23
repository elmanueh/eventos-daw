import router from '@/app/routes'
import { AuthProvider } from '@context/AuthProvider'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './main.css'
import './theme.scss'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  //<StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </StrictMode>
)
