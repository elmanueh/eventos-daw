import { createContext, useContext } from 'react'

export const EventoActionContext = createContext({
  onUpdate: () => {},
  onUpdateState: () => {},
  onAdd: () => {},
  onEsEventoMio: () => {}
})

export const useEventoActions = () => useContext(EventoActionContext)
