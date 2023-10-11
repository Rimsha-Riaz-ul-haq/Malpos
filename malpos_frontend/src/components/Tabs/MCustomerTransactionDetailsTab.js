import React from 'react'
import { Table } from 'react-bootstrap'
import { Box } from '../elements'

export default function MCustomerTransactionDetailsTab() {
  return (
    <div>
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
                            <th className='th-w120'>To account</th>
                            <th className='th-w120'>Transacted by</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='f-13 '>
                        <td className='td-w50'>345</td>
                        <td className='td-w150'>March 23.4.23</td>
                            <td className='td-w120'>Tis</td>
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
    </div>
  )
}
