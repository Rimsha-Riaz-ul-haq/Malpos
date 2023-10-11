import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";

import PageLayout from "../../layouts/PageLayout";

import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransactionTab from "../../components/Tabs/TransactionTab";
import CustomerTab from "../../components/Tabs/CustomerTab";
import SupplierTab from "../../components/Tabs/SupplierTab";

export default function Transaction() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div>
      <PageLayout>
        <Row>

          <Col md={12}>
            <Row>
              <CardLayout>
          <Col md={12}>
            <Row>          
                <div className="d-flex justify-content-between align-items-center"  style={{marginBottom:"1rem"}}>
                  <h5>Transactions 4</h5>
                  <div>
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </div>{" "}
                </div>
            </Row>
          </Col>
                <Col md={12}>
                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={activeTab === 0 ? "active " : ""}
                    >
                      Transactions
                    </button>
                    <button
                      onClick={() => handleTabClick(1)}
                      className={activeTab === 1 ? "active" : ""}
                    >
                      Customer Transactions
                    </button>
                    <button
                      onClick={() => handleTabClick(2)}
                      className={activeTab === 2 ? "active" : ""}
                    >
                      Supplier Transactions
                    </button>
                  </Box>
                  <Row>
                    <Col md={12}>
                      <div>
                        {activeTab === 0 && (
                          <Box className="cate-Tabs-main">
                            <TransactionTab />
                          </Box>
                        )}
                        {activeTab === 1 && (
                          <Box className="cate-Tabs-main">
                            <CustomerTab />
                          </Box>
                        )}
                        {activeTab === 2 && (
                          <Box className="cate-Tabs-main">
                            <SupplierTab />
                          </Box>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </CardLayout>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
