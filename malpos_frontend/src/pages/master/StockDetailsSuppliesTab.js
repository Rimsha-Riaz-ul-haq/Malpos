import React from 'react'
import { Box } from '../../components/elements'
import { Table } from 'react-bootstrap'
export default function StockDetailsSuppliesTab() {
  return (
    <div>
         <Box className='table-wrapper'>
        
        <Table className='stock-details-sup-tab'>
            <thead >
                <tr className='f-12'>
                <th className='th-w25'>Product</th>
                <th className='th-w25'>Qty</th>
                <th className='th-w25'>Cost</th>
                <th className='th-w25'>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr className='f-13'>
                    <td className='th-w25'>Mar 31, 08:03:47</td>
                    <td className='th-w25'>مستودع الفرع الرئيسيA</td>
                    <td className='th-w25'>200 pcs </td>
                    <td className='th-w25'>200 pcs </td>
                </tr>
            </tbody>
        </Table>
        </Box>
    </div>
  )
}
