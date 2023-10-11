import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import { Box } from '../../components/elements'
import { LabelField } from '../../components/fields'
import { Text } from '../../components/elements'
import CusLabelField from '../../components/fields/CusLabelField'
import MultiSelectField from '../../components/fields/MultiSelectField'
import PageLayout from '../../layouts/PageLayout'
import { SketchPicker } from 'react-color';
export default function EmenuSetting() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [color, setColor] = useState('#ffffff');

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    };

    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Settings
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={10} lg={8}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="E-menu enabled
        "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="Hide service charge
        "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="Status of call waiter
        "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="Status of ask for check
        "

                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="Status of approve order
        "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="WhatsApp order status
        "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <CusLabelField type={'number'} placeholder={'Whatsapp Number'} label="Whatsaap Order Number" />
                                        </Col>
                                        <Col md={6}>
                                            <CusLabelField type={'text'} placeholder={'SubTitle'} label="SubTitle" />

                                        </Col>
                                        <Col md={6} className={'multi-seclect-settings-mt'}>
                                            <MultiSelectField />
                                        </Col>
                                        <Col md={12}>
                                            <hr />
                                        </Col>
                                        <Col md={6}>
                                            <Text className={'f-13'} as='span'>Background Image</Text>

                                            {selectedImage && (
                                                <Box className={'img-dis-box'}>
                                                    <img
                                                        alt="not found"

                                                        src={URL.createObjectURL(selectedImage)}
                                                    />
                                                    <br />
                                                    <Box className='img-remove-btn-faX'>
                                                        <button onClick={() => setSelectedImage(null)}><FontAwesomeIcon icon={faXmark} color="#fff" /> </button>

                                                    </Box>
                                                </Box>
                                            )}


                                            <input
                                                type="file"
                                                name="myImage"
                                                onChange={(event) => {
                                                    setSelectedImage(event.target.files[0]);
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Text className={'f-13'} as='span'>Image</Text>
                                            {selectedImage && (
                                                <Box className={'img-dis-box'}>
                                                    <img
                                                        alt="not found"
                                                        src={URL.createObjectURL(selectedImage)}
                                                    />
                                                    <br />
                                                    <Box className='img-remove-btn-faX'>
                                                        <button onClick={() => setSelectedImage(null)}><FontAwesomeIcon icon={faXmark} color="#fff" /> </button>

                                                    </Box>
                                                </Box>
                                            )}
                                            <input
                                                type="file"
                                                name="myImage"
                                                onChange={(event) => {
                                                    setSelectedImage(event.target.files[0]);
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <SketchPicker
                                                color={color}
                                                onChange={handleColorChange}
                                            />
                                            {/* check changes in p */}
                                        </Col>
                                        <Col md={6}>
                                            <Box className={'qr-img'}>
                                                <img src='images/malpos-qe.png' alt='QR Code' />
                                            </Box>
                                            <Box className={'d-qr-box'}>
                                                <Text className={'down-qr-text f-13'} as='span'>Downlaod QR for each Table</Text>
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
