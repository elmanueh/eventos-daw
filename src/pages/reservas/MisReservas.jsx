import { TARJETA_TIPOS } from '@/configs/constant'
import { useReservas } from '@/hooks/useReservas'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { Container } from 'react-bootstrap'

export default function MisReservas() {
  const { reservas, loading } = useReservas()

  if (loading) return <Loading />

  const reservasActivas = reservas.filter((r) => {
    const fechaFin = new Date(r.fechaFin)
    return !r.cancelada && fechaFin >= new Date()
  })

  const reservasCanceladas = reservas.filter((r) => r.cancelada)

  const reservasFinalizadas = reservas.filter((r) => {
    const fechaFin = new Date(r.fechaFin)
    return !r.cancelada && fechaFin < new Date()
  })

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <h1 className="text-center">Mis Reservas</h1>

      <h3 id="reservas-activas">Activas</h3>
      <GroupCards
        objetos={reservasActivas}
        tipo={TARJETA_TIPOS.RESERVAS}
        id={'reservas-activas'}
      ></GroupCards>

      {reservasCanceladas.length != 0 && (
        <>
          <h3 id="reservas-canceladas">Canceladas</h3>
          <GroupCards
            objetos={reservasCanceladas}
            tipo={TARJETA_TIPOS.RESERVAS}
            id={'reservas-canceladas'}
          ></GroupCards>
        </>
      )}

      {reservasFinalizadas.length != 0 && (
        <>
          <h3 id="reservas-finalizadas">Finalizadas</h3>
          <GroupCards
            objetos={reservasFinalizadas}
            tipo={TARJETA_TIPOS.RESERVAS}
            id={'reservas-finalizadas'}
          ></GroupCards>
        </>
      )}
    </Container>
  )
}
