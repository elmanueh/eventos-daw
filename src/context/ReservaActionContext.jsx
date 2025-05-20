import { createContext, useContext } from 'react'

export const ReservaActionContext = createContext({
  onAdd: () => {}
})

export const useReservaActions = () => useContext(ReservaActionContext)
