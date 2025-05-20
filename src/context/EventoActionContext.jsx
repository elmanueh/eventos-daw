import { createContext, useContext } from 'react'

export const EventoActionContext = createContext({
  onUpdate: () => {},
  onUpdateState: () => {},
  onAdd: () => {}
})

export const useEventoActions = () => useContext(EventoActionContext)
