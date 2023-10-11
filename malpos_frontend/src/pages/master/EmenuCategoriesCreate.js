import React,{useState} from 'react'
import { Col, Row,Form } from 'react-bootstrap'
import { Box ,Text} from '../../components/elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { CardLayout } from '../../components/cards'
import { LabelField } from '../../components/fields'
import PageLayout from '../../layouts/PageLayout'

export default function EmenuCategoriesCreate() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Categories Create
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={6}>
                                    <Row>
                                        <Col md={12}>
                                            <LabelField type={'text'} placeholder={'عربى'} label={'عربى'} />
                                        </Col>
                                        <Col md={12}>
                                            <LabelField type={'text'} placeholder={'English'} label={'Name'} />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Switch
                                                    type="switch"
                                                    id="my-switch"
                                                    label="Hide
                                                                                     "
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                     
                                        <Text className={'f-13'}  as='span'>Background Image</Text><br/>

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
