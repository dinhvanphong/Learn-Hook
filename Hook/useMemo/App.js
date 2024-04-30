import {useMemo} from 'react'

// Tránh thực hiện lại 1 logic nào đó không cần thiết

const total = useMemo(() => {
  const result = product.reduce ((result, prod) => {
    return result + prod
  })
  return result
}, [product])