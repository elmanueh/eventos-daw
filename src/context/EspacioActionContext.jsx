import { createContext, useContext } from 'react'

export const EspacioActionContext = createContext({
  onUpdate: () => {},
  onUpdateState: () => {},
  onPuntosInteres: () => {}
})

export const useEspacioActions = () => useContext(EspacioActionContext)
