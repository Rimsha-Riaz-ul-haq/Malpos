import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import IconSearchBar from "../../components/elements/IconSearchBar";
import PageLayout from "../../layouts/PageLayout";
import { Tabs, Tab } from "react-bootstrap";
import TransferSuppliesTab from "../../components/Tabs/TransferSuppliesTab";
import { Link } from "react-router-dom";
import { Box } from "../../components/elements";

export default function TransferDetails() {
  const [key, setKey] = useState("tab1");

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Transfer #186 (مستودع الفرع الرئيسيA test2)</h5>
                <Box className="construction-edit-icons">
                  <Box className="edit-icons">
                    <Link to="/transfers" className="addproduct-btn ">
                      <img
                        className="fas fa-user"
                        src="/images/icons/close1.png"
                        alt="Close"
                      />
                    </Link>
                  </Box>
                </Box>
              </div>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={3}>
                  <IconSearchBar />
                </Col>
                <Col md={12}>
                  <Tabs
                    id="my-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="tab1" title="Supplies">
                      <div className="tabContent">
                        <TransferSuppliesTab />
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
  );
}
