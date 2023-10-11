import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import { Box, Text } from '../../components/elements'
import IconSearchBar from '../../components/elements/IconSearchBar'
import { LabelField } from '../../components/fields'
import CalenderField from '../../components/fields/CalenderField'
import CusLabelField from '../../components/fields/CusLabelField'
import MultiSelectField from '../../components/fields/MultiSelectField'
import PageLayout from '../../layouts/PageLayout'

export default function InventoryCreate() {
    const [activeButton, setActiveButton] = useState(1);
    const [activeStep, setActiveStep] = useState(1);

    const handleButton1Click = () => {
        setActiveButton(1);
    };

    const handleButton2Click = () => {
        setActiveButton(2);
    };
    const handleStep1Click = () => {
        setActiveStep(1);
    };
    const handleStep2Click = () => {
        setActiveStep(2);
    };
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Inventory check/Create
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={4}>
                                    <MultiSelectField />
                                    <label className='f-13' style={{marginTop:"8px"}}>Search</label>
                                    <IconSearchBar />
                                </Col>
                                <Col md={4}>
                                    <Box className={'inve-c-periods f-13'}>
                                        <Text as='span'>Period for the inventory check</Text>
                                    </Box>
                                    <Button className='cus-icon-btn f-capitalize inve-btn' onClick={handleButton1Click} disabled={activeButton === 1 || activeStep === 2 }>Rectrospective</Button>
                                    <Button  className='cus-icon-btn f-capitalize inve-btn' onClick={handleButton2Click} disabled={activeButton === 2 || activeStep === 2 }>Current</Button>
                                    <br />
                                    {activeButton === 1 && <CalenderField/>}
                                    {activeButton === 2 && <Box className={'inve-c-curr'}>
                                        The current date will be set after clicking "Run inventory"

                                        </Box>}
                                </Col>
                                <Col md={4}>
                                    <Box className={'inven-c-des'}>
                                        <Text as='span' className={'des-span'}>Description</Text><br />
                                        <Text as='span' className={'inven-c-des-total'}>0.00 SAR</Text>
                                    </Box>
                                    <LabelField label={'Description'} type={'text'} placeholder={'Description'}/>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={6}>
                                            <div onClick={handleStep1Click}>
                                        <Box className={`inve-c-steps inve-con-step-one ${activeStep === 1 ?"inve-c-step-active":""}`}>
                                            <Box className={'inve-step'}>
                                            <Box className={'step-cir'}>
                                                1
                                            </Box>
                                            </Box>
                                          
                                            <Box className={'step-con'}>
                                                Step 1<br/>
                                                <p>Calculation of purchased goods, products and preparations</p>
                                            </Box>
                                        </Box>
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                            <div onClick={handleStep2Click}>
                                        <Box className={`inve-c-steps inve-con-step-one ${activeStep === 2 ?"inve-c-step-active":""}`}>
                                            <Box className={'inve-step'}>
                                            <Box className={'step-cir'}>
                                                2
                                            </Box>
                                            </Box>
                                          
                                            <Box className={'step-con'}>
                                                Step 2<br/>
                                                <p>Calculation of purchased goods, products and preparations</p>
                                            </Box>
                                        </Box>  
                                        </div>  
                                        </Col>
                                    </Row>
                                   
                                </Col>
                                <Col md={12}>
                                <Box className={'inve-c-data'}>
                                {activeStep === 1 && <div>Content for Div 1</div>}
                                {activeStep === 2 && <div>Content for Div 2</div>}

                             </Box>

                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={6}>
                                        <Button className='cus-icon-btn'> Add</Button>
                                        <Button className='cus-icon-btn'> Full Screen</Button>
                                        </Col>
                                        <Col md={6}>
                                            <Box className={'inve-c-f-btn'}>
                                        <Button className='cus-icon-btn' onClick={handleStep1Click} disabled={activeStep === 1}>Back</Button>
                                    <Button  className='cus-icon-btn' onClick={handleStep2Click} disabled={activeStep === 2}>Next</Button>
                                    </Box>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardLayout>
                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
