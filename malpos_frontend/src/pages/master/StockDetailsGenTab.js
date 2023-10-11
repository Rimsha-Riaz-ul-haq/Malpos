import React from 'react'
import { Row,Col, Table } from 'react-bootstrap'
import { Box } from '../../components/elements'

export default function StockDetailsGenTab() {
  return (
    <div>
        <Row>
            <Col md={12}>
                <Box className={'table-wrapper'}>
                <Table>
                <thead >
                    <tr className='f-12'>
                    <th>Storage</th>
                    <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='f-13'>
                    <td>مستودع الفرع الرئيسيA</td>
                    <td>200 pcs</td>
                    </tr>
                </tbody>
            </Table>
                </Box>
           
            </Col>
        </Row>
    </div>
  )
}
