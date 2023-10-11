import React, { useState } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxOpen,
  faCheck,
  faArrowRotateLeft,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import ReceiptTabRE from "../../components/Tabs/ReceiptTabRE";
import ReceiptEditHistoryTab from "../../components/Tabs/ReceiptEditHistoryTab";
import ReceiptEditReturnTab from "../../components/Tabs/ReceiptEditReturnTab";
import ReceiptEditStockTab from "../../components/Tabs/ReceiptEditStockTab";
import { Link } from "react-router-dom";

export default function ReceiptEdit() {
  const [key, setKey] = useState("tab1");

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              {/* <Box className="receipt-edit-h"> */}
              #1002
              {/* </Box> */}
              <Box className="construction-edit-icons">
                <Box className="edit-icons">
                  <Link to="/product-return" className="addproduct-btn ">
                    <img
                      className="fas fa-user"
                      src="/images/icons/close1.png"
                      alt="Close"
                    />
                  </Link>
                </Box>
              </Box>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="tab1" title="Receipt">
                  <div className="tabContent ">
                    <ReceiptTabRE />
                  </div>
                </Tab>

                <Tab eventKey="tab2" title="History">
                  <div className="tabContent ">
                    <ReceiptEditHistoryTab />
                  </div>
                </Tab>
                <Tab eventKey="tab3" title="Detucted stock">
                  <div className="tabContent ">
                    <ReceiptEditStockTab />
                  </div>
                </Tab>
                <Tab eventKey="tab4" title="Product return">
                  <div className="tabContent ">
                    <ReceiptEditReturnTab />
                  </div>
                </Tab>
              </Tabs>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
