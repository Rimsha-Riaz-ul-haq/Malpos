import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row, InputGroup, Form } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import { Box } from '../../components/elements'
import { LabelField, LabelTextarea } from '../../components/fields'
import CusLabelField from '../../components/fields/CusLabelField'
import InputGroupField from '../../components/fields/InputGroupField'
import InputGroupFieldNoLabel from '../../components/fields/InputGroupFieldNoLabel'
import MultiSelectField from '../../components/fields/MultiSelectField'
import PageLayout from '../../layouts/PageLayout'

export default function MCustomerCreate() {
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Customer Create
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={8}>
                                    <Row>
                                        <Col md={6}>
                                            <LabelField type={'text'} placeholder={'Name'} label={"Name"} />
                                        </Col>
                                        <Col md={6}>
                                            <LabelField type={'text'} placeholder={'Code'} label={"Code"} />

                                        </Col>
                                        <Col md={6}>
                                            <LabelField type={'text'} placeholder={'Email'} label={"Email"} />
                                        </Col>
                                        <Col md={6}>
                                            <LabelField type={'date'} placeholder={'Date of Birth'} label={"Date of Birth"} />
                                        </Col>
                                        <Col md={6}>
                                        <InputGroupField label={'Address'} icon={faPlus}/>
                                        <InputGroupFieldNoLabel  icon={faMinus}/>
                                        </Col>
                                        <Col md={6}>
                                            <Box className={'cus-mt-5'}>
                                            <MultiSelectField label={'Gender'}/>
                                            </Box>
                                        </Col>
                                        <Col md={6}>
                                            <LabelTextarea label={'Description'}/>
                                        </Col>
                                        <Col md={6}>
                                        <Box className={'cus-mt-5'}>
                                            <MultiSelectField label={'Group'}/>
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
