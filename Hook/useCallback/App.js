import { useState, useCallback } from 'react'
import Content from './Content'

// Tránh tạo ra 1 hàm mới không cần thiết ( useCallback + React.memo )

function App() {
  const [count, setCount] = useState(0)

  const handleIncrease = useCallback(() => {
    setCount(count + 1)
  }, [])

  return (
    <div>
      <Content onIncrease={handleIncrease}/>
      <p>{count}</p>
    </div>
  )

}