import appRouter from '@/app/routes'
import { AuthProvider } from '@context/AuthProvider'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './theme.scss'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>
)
