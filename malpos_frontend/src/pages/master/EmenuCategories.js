import { faPlus, faEllipsis, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Box } from '../../components/elements'
import { CardLayout } from '../../components/cards'
import IconSearchBar from '../../components/elements/IconSearchBar'
import PageLayout from '../../layouts/PageLayout'

export default function EmenuCategories() {
    const[open,setClose] = useState(false)
    const handleDotBox = () =>{
        setClose(!open)
    }
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>

                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={3}>
                                    <IconSearchBar />
                                </Col>
                                <Col md={9}>
                                    <Box className='suppliers-r-btn'>
                                        <Link to={'/emenu-categories-create'} ><button className='acc-create-btn rs-btn-create'><FontAwesomeIcon icon={faPlus} /> Create </button></Link>
                                    </Box>
                                </Col>
                                <Col md={12}>
                                    <Box className={'emenu-cate-table-wrapper cus-ptb'}>
                                        <Table>
                                            <thead className='f-13 thead-dark'>
                                                <tr >
                                                    <th className='th-w10'>Image</th>
                                                    <th className='th-w30'>Name</th>
                                                    <th className='th-w25'>Type</th>
                                                    <th className='th-w25'>Emenu products count</th>
                                                    <th className='th-w10'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr  className='f-13 '>
                                                    <td className='td-w10'>Image</td>
                                                    <td className='td-w30'>Name</td>
                                                    <td className='td-w25'>Type</td>
                                                    <td className='td-w25'>Emenu products count</td>
                                                    <td className='td-w10'>
                                                        <Box className={'td-left'}>
                                                            <span  onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> 
                                                            {open ?
                                                            <span>
                                                            <Box className={'dot-wrapper'}>
                                                                <Box className={'dot-box-item'}>
                                                                 <Link to={'/emenu-categories-create'}>   <FontAwesomeIcon icon={faEdit} /> Edit</Link>
                                                                </Box>
                                                            </Box>
                                                            </span>
                                                              :""
                                                        }
                                                            
                                                            </span>
                                                        </Box>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Box>
                                </Col>
                            </Row>
                        </CardLayout>
                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
