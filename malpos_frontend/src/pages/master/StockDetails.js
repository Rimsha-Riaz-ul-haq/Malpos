import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { Tabs, Tab } from "react-bootstrap";
import StockDetailsGenTab from './StockDetailsGenTab';
import StockDetailsHisTab from './StockDetailsHisTab';
import StockDetailsTab from './StockDetailsTab';

export default function StockDetails() {
    const [key, setKey] = useState("tab1");

  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                    Stock #280 : Egg بيض
                    </CardLayout>
                </Col>
                <Col md={12}>
                <CardLayout>
                <Tabs
            id="my-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
           
          >
            <Tab eventKey="tab1" title="General">
              <div className="tabContent">
               <StockDetailsGenTab/>
              </div>
            </Tab>
            <Tab eventKey="tab2" title="History">
              <div className="tabContent">
              <StockDetailsHisTab/>
              </div>
            </Tab>
            <Tab eventKey="tab3" title="Details">
              <div className="tabContent">
              <StockDetailsTab/>
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
