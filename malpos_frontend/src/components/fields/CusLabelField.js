import React from 'react'
import { Box } from '../elements'
export default function CusLabelField({ type, placeholder,label }) {
  return (
    <div>
         <Box className={'cus-input-field'}>
            <label className='cus-input-label'>{label}</label>
         <input type={type} placeholder={placeholder} />
         </Box>
    </div>
  )
}
