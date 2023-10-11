import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { Tabs, Tab } from "react-bootstrap";
import IconSearchBar from '../../components/elements/IconSearchBar';
import ProductionDetailsTab from '../../components/Tabs/ProductionDetailsTab';
import ProductionDetailsStockTab from '../../components/Tabs/ProductionDetailsStockTab';
export default function SuppliersDetailsSupplies() {
    const [key, setKey] = useState("tab1");

  return (
    <div>
         <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                        Operation time #33
                    </CardLayout>
                </Col>
              
                <Col md={12}>
                    <CardLayout>
                        <Row>
                        <Col md={12}>
                    <Row>
                        <Col md={3}>
                            <IconSearchBar/>
                        </Col>
                    </Row>
                </Col>
                            <Col md={12}>
                            <Tabs
            id="my-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
           
          >
            <Tab eventKey="tab1" title="Supplies">
              <div className="tabContent">
               <ProductionDetailsTab/>
              </div>
            </Tab>
           
          </Tabs>
                            </Col>
                        </Row>
                  
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
