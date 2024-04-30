import { memo } from 'react'

const Content = ({onIncrease}) => {
  return (
   <>
      <p>Dinh Van Phong</p>
      <button onClick={onIncrease}>Click me!</button>
   </>
  )
}

export default memo(Content)