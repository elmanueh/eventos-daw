import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from '../components/layout/AppNavbar';
import Footer from '../components/layout/Footer';
import Login from './auth/Login';
import EspacioDetalle from './espacios/EspacioDetalle';
import Espacios from './espacios/Espacios';
import MisEspacios from './espacios/MisEspacios';
import EventoDetalle from './eventos/EventoDetalle';
import Eventos from './eventos/Eventos';
import MisEventos from './eventos/MisEventos';
import Home from './home/Home';
import MisReservas from './reservas/MisReservas';

function App() {
  return (
    <>
      <AppNavbar />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<PrivateRouteLogin element={<RedirectToMainApp />} />} />
          <Route path="/login" element={<PrivateRouteLogin element={<Login />} />} />

          <Route path="/home" element={<PrivateRouteProtected element={<Home />} />} />

          <Route path="/espacios" element={<PrivateRouteProtected element={<Espacios />}  />} />
          <Route path="/espacios/:id" element={<EspacioDetalle />} />

          <Route path="/eventos" element={<PrivateRouteProtected element={<Eventos />} />} />
          <Route path="/eventos/:id" element={<EventoDetalle />} />

          <Route path="/mis-espacios" element={<PrivateRouteProtected element={<MisEspacios />} />} />
          <Route path='/mis-eventos' element={<PrivateRouteProtected element={<MisEventos />} />} />

          <Route path="/mis-reservas" element={<PrivateRouteProtected element={<MisReservas />} />} />
          
          <Route path="*" element={<PrivateRouteProtected element={<Navigate to="/home" />} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function RedirectToMainApp() {
  useEffect(() => {
    window.location.href = 'http://localhost:3000/';
  }, []);

  return null;
}

function PrivateRouteLogin({ element, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? <Navigate to="/home" /> : element;
}


function PrivateRouteProtected({ element, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}


export default App;
