import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { Box } from '../../components/elements'
export default function StorageDetails() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                    Storage #1 : المستودع الرئيسي

                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                        <Box className='storageDetails-table-wrap'>
                            <Table>
                                <thead className='thead-dark'>
                                    <tr>
                                    <th>Date</th>
                                    <th className='text-end'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>Mar 29, 08:04:07</td>
                                    <td className='text-end'>-1.78 SAR</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Box>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
