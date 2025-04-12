import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import Espacios from './Espacios';
import Eventos from './Eventos';
import Inicio from './Inicio';
import Login from './Login';
import MisEspacios from './MisEspacios';

function App() {
  return (
    <>
      <AppNavbar />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<PrivateRouteLogin element={<RedirectToMainApp />} />} />
          <Route path="/login" element={<PrivateRouteLogin element={<Login />} />} />

          <Route path="/home" element={<PrivateRouteProtected element={<Inicio />} />} />

          <Route path="/espacios" element={<PrivateRouteProtected element={<Espacios />}  />} />
          <Route path="/eventos" element={<PrivateRouteProtected element={<Eventos />} />} />

          <Route path="/mis-espacios" element={<PrivateRouteProtected element={<MisEspacios />} />} />
          
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
