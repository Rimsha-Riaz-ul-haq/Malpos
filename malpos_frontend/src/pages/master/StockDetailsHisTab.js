import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Box } from '../../components/elements'
export default function StockDetailsHisTab() {
  return (
    <div>
        <Row>
            <Col md={12}>
                <Box className='table-wrapper'>
        
                <Table className='stock-details-his-tab'>
                    <thead >
                        <tr className='f-12'>
                        <th className='th-w40'>Date</th>
                        <th className='th-w30'>Stoarge</th>
                        <th className='th-w30'>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='f-13'>
                            <td className='th-w40'>Mar 31, 08:03:47</td>
                            <td className='th-w30'>مستودع الفرع الرئيسيA</td>
                            <td className='th-w30'>200 pcs </td>
                        </tr>
                    </tbody>
                </Table>
                </Box>
            </Col>
        </Row>
    </div>
  )
}
