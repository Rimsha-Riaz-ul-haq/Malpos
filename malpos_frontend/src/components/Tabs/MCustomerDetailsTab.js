import { faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Box, Text } from '../elements'

export default function MCustomerDetailsTab() {
  return (
    <div>
        <Box className={'cus-ptb'}>
         <Row>
            <Col md={12}>
                <Box className={'name-title'}>
                    <Box className={'name-title-content'}>
                    <h3>Benali Group</h3>
                    <Text as='span'>+9323742345</Text>
                    </Box>
                </Box>
            </Col>
            <Col md={12} className={'cus-ptb'}>
                <Row>
                    <Col md={6} className={'m-customer-bonus-col-6'} >
                        <Box className={'m-customer-details-bonus'}>
                            <Box className={'cus-bonus-start'}>
                            <FontAwesomeIcon icon={faStar} size="2x" color='#f29b30' />

                            </Box>
                            <Box className={'cus-bonus-con'}>
                            <h4>0</h4>
                                <Text as={'span'} className={'f-13'}>Bonus</Text>
                            </Box>
                        </Box>
                    </Col>
                    <Col md={6} className={'m-customer-bonus-col-6'}>
                    <Box className={'m-customer-details-bonus'}>
                            <Box className={'cus-bonus-start'}>
                                <FontAwesomeIcon icon={faDollarSign} size="2x" color='#ee3432' />
                            </Box>
                            <Box className={'cus-bonus-con'}>
                            
                                <h4>25.00 SAR</h4>
                                <Text as={'span'} className={'f-13'}>Balance</Text>
                            </Box>
                        </Box>
                    </Col>
                </Row>
            </Col>
            <Col md={12}>
                <Box className={'cus-detail-bonus-tot '}>
                <Row>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Total spent</Text>
                      <h4>25.00 SAR</h4>
                    </Col>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Total discount</Text>
                      <h4>25.00 SAR</h4>
                    </Col>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Total bonus</Text>
                      <h4>25.00 SAR</h4>
                    </Col>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Receipt count</Text>
                      <h4>25.00 SAR</h4>
                    </Col>
                </Row>
                </Box>
            </Col>
            <Col md={12}>
                    <hr/>
                </Col>
            <Col md={12}>
                <Box className={'m-cus-group-dis'}>
                <Row>
                    <Col md={6}>
                        <h3>TIS</h3>
                    </Col>
                    <Col md={6}>
                        <Box className={'discounted'}>
                        <Text as='span' className={'f-13'}>Group Discount</Text>
                        <Text as='span' className={'f-13 percentage'}>100%</Text>
                        </Box>
                    </Col>
                </Row>
                </Box>
                </Col>
                <Col md={12}>
                    <hr/>
                </Col>
                <Col md={12}>
                <Box className={'cus-info-bonus cus-ptb'}>
                <Row>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Phones</Text><br/>
                      <Text as={'span'} className={'f-13'}>+966 9200 33035</Text>
                    </Col>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Gender</Text><br/>
                      <Text as={'span'} className={'f-13'}>Male</Text>
                    </Col>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>Date of birth</Text><br/>
                      <Text as={'span'} className={'f-13'}>08.12.1987</Text>
                    </Col>
                    <Col md={3}>
                   
                      <Text as={'span'} className={'f-13'}>E-mail</Text><br/>
                      <Text as={'span'} className={'f-13'}>sales@tissoftware.sa</Text>
                    </Col>
                </Row>
                </Box>
            </Col>
        </Row>
        </Box>
    </div>
  )
}
