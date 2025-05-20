import { createContext, useContext } from 'react'

export const EventoActionContext = createContext({
  onUpdate: () => {},
  onUpdateState: () => {}
})

export const useEventoActions = () => useContext(EventoActionContext)
