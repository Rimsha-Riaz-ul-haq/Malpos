import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import IconSearchBar from '../elements/IconSearchBar'
import MultiSelectNoLabel from '../fields/MultiSelectNoLabel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck,faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Box } from '../elements'

export default function SuppliesDetailTab() {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' },
        { value: 'option5', label: 'Option 5' },
    ];
    return (
        <div>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={10}>
                            <Row>
                                <Col md={3}>
                                    <IconSearchBar />
                                </Col>
                                <Col md={2}>
                                    <MultiSelectNoLabel options={options} />
                                </Col>
                                <Col md={2}>
                                    <MultiSelectNoLabel options={options} />
                                </Col>
                                <Col md={2}>
                                    <MultiSelectNoLabel options={options} />
                                </Col>
                                <Col md={2}>
                                    <MultiSelectNoLabel options={options} />
                                </Col>
                                <Col md={2} className={"cus-mt-10"}>
                                    <MultiSelectNoLabel options={options} />
                                </Col>
                                <Col md={2} className={"cus-mt-10"}>
                                    <MultiSelectNoLabel options={options} />
                                </Col>
                                
                            </Row>
                        </Col>
                        <Col md={2}>
                            <Link to={"/customer-create"} style={{ float: "right" }}>
                                <button className="acc-create-btn rs-btn-create">
                                    <FontAwesomeIcon icon={faPlus} /> Create{" "}
                                </button>
                            </Link>
                        </Col>
                        <Col md={12}>
                            <Box className={'cus-ptb'}>
                                <Box className={'supplies-gen-table-wrap'}>
                                    <Table>
                                        <thead className='thead-dark ' style={{backgroundColor:'#F07632'}} >
                                            <tr className='f-12'>
                                                <th className='th-w50'>ID</th>
                                                <th className='th-w150'>Products</th>
                                                <th className='th-w130'>Operation time</th>
                                                <th className='th-w130'>Created at</th>
                                                <th className='th-w100'>Supplier</th>
                                                <th className='th-w100'>Storage</th>
                                                <th className='th-w100'>Qty<br/>
                                                </th>
                                                <th className='th-w100'>Account</th>
                                                <th className='th-w130'>Cost</th>
                                                <th className='th-w100'>Total</th>
                                                <th className='th-w100'>Invoice no</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='f-13'  >
                                            <td className='td-w50'>188</td>
                                                <td className='td-w150'>New Item11(3 pcs)</td>
                                                <td className='td-w130'>Mar 19, 16:00:20</td>
                                                <td className='td-w130'>Mar 20, 19:20:15</td>
                                                <td className='td-w100'>شركة التوريدات العالمية</td>
                                                <td className='td-w100'>1.60 SAR</td>
                                                <td className='td-w100'>2 Pcs 3 Boxes
                                                    
                                                    </td>
                                                <td className='td-w100'><span className='unpaid'> Unpaid</span></td>
                                                <td className='td-w130'>3243SAR</td>
                                                <td className='td-w100'>0.323434 SAR</td>
                                                <td className='td-w100'>24345346</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
