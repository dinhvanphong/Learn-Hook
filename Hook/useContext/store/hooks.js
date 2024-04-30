import { useContext } from 'react'
import Context from './Context'

export const useStore = () => {
  const value = useContext(Context)
  return value
}