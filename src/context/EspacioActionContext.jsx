import { createContext, useContext } from 'react'

export const EspacioActionContext = createContext({
  onUpdate: () => {},
  onUpdateState: () => {}
})

export const useEspacioActions = () => useContext(EspacioActionContext)
