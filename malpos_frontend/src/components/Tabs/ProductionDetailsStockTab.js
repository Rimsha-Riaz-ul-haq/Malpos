import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Table } from 'react-bootstrap'
import { Box } from '../elements'
export default function ProductionDetailsStockTab() {
  return (
    <div>
        <Box className={'cus-ptb'}>
        <Table>
            <thead>
                <tr className='f-13 thead-dark'>
                <th>Product & Ingredients</th>
                <th>Storage</th>
                <th>Quantity</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr className='f-13'>
                <td>TERIYAKI SAUCE SUB</td>
                <td><FontAwesomeIcon icon={faMinus}/></td>
                <td>2kg</td>
                <td>0.00 SAR </td>
                </tr>
            </tbody>
            </Table>
        </Box>
    </div>
  )
}
