import React,{useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { Tabs, Tab } from "react-bootstrap";
import MCustomerDetailsTab from '../../components/Tabs/MCustomerDetailsTab';
import MCustomerTransactionDetailsTab from '../../components/Tabs/MCustomerTransactionDetailsTab';

export default function MCustomerDetails() {
    const [key, setKey] = useState("tab1");

    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Customer #2 : Mohammed
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Tabs
                                id="my-tabs"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}

                            >
                                <Tab eventKey="tab1" title="Customer Details">
                                    <div className="tabContent">
                                        <MCustomerDetailsTab/>
                                    </div>
                                </Tab>
                                <Tab eventKey="tab2" title="Transactions">
                                    <div className="tabContent">
                                        <MCustomerTransactionDetailsTab/>
                                    </div>
                                </Tab>

                            </Tabs>
                        </CardLayout>
                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
