import { useState } from 'react'
import Content from './Content'

// Tránh render lại component không cần thiết
// Kiểm tra xem props của component Content có thay đổi hay không, nếu không thay đổi thì không render lại và ngược lại.

function App() {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <Content/>
      <p>{count}</p>
      <button onClick={increase}>Click me!</button>
    </div>
  )

}