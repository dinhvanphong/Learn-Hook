

import { useStore } from './store/hooks'




function App() {

  const value = useStore()

  console.log(value)

  return (
    <div>
      'phong'
    </div>
  )
}

export default App
