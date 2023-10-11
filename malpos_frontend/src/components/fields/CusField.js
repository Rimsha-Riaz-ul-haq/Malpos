import React from 'react'
import { Box } from '../elements'

export default function CusField({ type, placeholder }) {
  return (
    <div>
        <Box className={'cus-input-field'}>
         <input type={type} placeholder={placeholder} />
         </Box>
         </div>
  )
}
