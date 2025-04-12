import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import EspacioCard from "../components/EspacioCard";
import EventoCard from "../components/EventoCard";
import { espaciosEstaticos, eventosEstaticos } from "../data/estaticos";

const Inicio = () => {
  const [eventos, setEventos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los datos dinámicamente usando fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          mes: 6,
          año: 2025,
        });
        
        const response = await fetch(`http://localhost:8080/api/eventos?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        

        if (!eventosResponse.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        console.log(data);

        setEventos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="py-4 d-flex flex-column gap-4">
      <h1 className="text-center">Bienvenido</h1>

      <section className="d-flex flex-column gap-4">
        <h2>Espacios físicos (Estáticos)</h2>

        <div className="row g-4">
          {espaciosEstaticos.slice(0, 4).map((espacio) => (
            <div key={espacio.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <EspacioCard espacio={espacio} />
            </div>
          ))}
        </div>

        <div className="text-end">
          <a href="/espacios" className="btn btn-outline-primary">
            Ver más
          </a>
        </div>
      </section>


      
      <section className="d-flex flex-column gap-4">
        <h2>Eventos próximos (Estáticos)</h2>

        <div className="row g-4">
          {eventosEstaticos.slice(0, 4).map((evento) => (
            <div key={evento.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <EventoCard evento={evento} />
            </div>
          ))}
        </div>

        <div className="text-end">
          <a href="/eventos" className="btn btn-outline-primary">
            Ver más
          </a>
        </div>
      </section>

      <section className="d-flex flex-column gap-4">
        <h2>Eventos próximos</h2>

        <div className="row g-4">
          {loading ? (
            <p>Cargando eventos...</p>
          ) : error ? (
            <p className="text-danger">Error al cargar los eventos.</p>
          ) : eventos.length === 0 ? (
            <p>No hay eventos disponibles.</p>
          ) : (
            <>
              {eventos.map((evento) => (
                <div key={evento.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <EventoCard evento={evento} />
                </div>
              ))}
              {/* Botón Ver más solo se muestra cuando hay eventos */}
              <div className="text-end">
                <a href="/eventos" className="btn btn-outline-primary">
                  Ver más
                </a>
              </div>
            </>
          )}
        </div>
      </section>

    </Container>
  );
};

export default Inicio;
