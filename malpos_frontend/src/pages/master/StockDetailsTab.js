import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Box } from '../../components/elements'
export default function StockDetailsTab() {
  return (
    <div>
        <Row>
            <Col md={12}>
                <Box className='table-wrapper'>
        
                <Table className='stock-details-d-tab'>
                    <thead >
                        <tr className='f-12'>
                        <th className='th-w15'>Created at</th>
                        <th className='th-w15'>Reference</th>
                        <th className='th-w30'>Storage</th>
                        <th className='th-w20'>Cost</th>
                        <th className='th-w20'>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='f-13'>
                            <td className='th-w15'>Mar 31, 08:03:47</td>
                            <td className='th-w15'> <Link to={'/stocks-supplies'} className='link'>Supplies#234</Link> </td>
                            <td className='th-w30'>مستودع الفرع الرئيسيA
                            <span className='active'>Active</span> </td>
                            <td className='th-w20'>200 pcs </td>
                            <td className='th-w20'>200 pcs </td>
                        </tr>
                    </tbody>
                </Table>
                </Box>
            </Col>
        </Row>
    </div>
  )
}
