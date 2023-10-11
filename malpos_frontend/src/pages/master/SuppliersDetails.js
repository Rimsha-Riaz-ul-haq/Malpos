import React from 'react'
import { Row, Table ,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CardLayout } from '../../components/cards'
import { Box } from '../../components/elements'
import PageLayout from '../../layouts/PageLayout'
export default function SuppliersDetails() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                    Supplier : شركة التوريدات العالمية ID: 1, Balance: 346.6 SAR, Balance ID: 1004

                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                    <Box className={'cus-ptb'}>
            <Box className={'market-customer-transacion-table-wrapper'}>
                <Table>
                    <thead>
                        <tr className='f-12 thead-dark'>
                        <th className='th-w50'>ID</th>
                        <th className='th-w150'>Operation time</th>
                            <th className='th-w120'>Reference</th>
                            <th className='th-w120'>Operation type</th>
                            <th className='th-w150 text-end'>Reference value
                            <br/>
                            <span>082323.33 SAR</span>
                            </th>
                            <th className='th-w150 text-end'>Payment
                            <br/>
                            <span>082323.33 SAR</span>
                            </th>
                            <th className='th-w150 text-end'>After amount</th>
                            <th className='th-w120'>Description</th>
                            <th className='th-w120'>From account</th>
                            <th className='th-w120'>Transacted by</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='f-13 '>
                        <td className='td-w50'>345</td>
                        <td className='td-w150'>March 23.4.23</td>
                            <td className='td-w120'><Link className='link' to={'/suppliers-details-supplies'}>234</Link> </td>
                            <td className='td-w120'>March 23.4.23</td>
                            <td className='td-w150 text-end'>000.3 SAR</td>
                            <td className='td-w150 text-end'>000.3 SAR</td>
                            <td className='td-w150 text-end'> <span>000.534233 SAR</span></td>
                            <td className='td-w120'>TIS Solutions</td>
                            <td className='td-w120'>Paid</td>
                            <td className='td-w120'>Paid</td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
        </Box>
                    </CardLayout>
                </Col>

            </Row>
        </PageLayout>
         
    </div>
  )
}
