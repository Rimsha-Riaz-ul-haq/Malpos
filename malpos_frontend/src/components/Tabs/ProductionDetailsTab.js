import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Table } from 'react-bootstrap'
import { Box } from '../elements'

export default function ProductionDetailsTab() {
  return (
    <div>
        <Box className={'cus-ptb'}>
        <Table>
            <thead>
                <tr className='f-13 '>
                <th>Product</th>
                <th>Qty</th>
                <th>Cost</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr className='f-13'>
                <td>TERIYAKI SAUCE SUB</td>
                <td>2kg</td>
                <td><FontAwesomeIcon icon={faMinus}/> </td>
                <td><FontAwesomeIcon icon={faMinus}/> </td>
                </tr>
            </tbody>
            </Table>
        </Box>
    </div>
  )
}
