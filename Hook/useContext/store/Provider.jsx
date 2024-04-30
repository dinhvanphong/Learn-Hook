
import Context from './Context'


function Provider({ children }) {

  const value = {
    name: 'phong'
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Provider