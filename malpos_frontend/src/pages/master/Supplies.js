import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";

import ReceiptTab from "../../components/Tabs/ReceiptTab";
import PageLayout from "../../layouts/PageLayout";
import DeleteReceipt from "./DeleteReceipt";
import OpenReceipt from "./OpenReceipt";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuppliesGeneralTab from "../../components/Tabs/SuppliesGeneralTab";
import SuppliesDetailTab from "../../components/Tabs/SuppliesDetailTab";

export default function Supplies() {
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
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Supplies</h5>
                  <div>
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </div>{" "}
                </div>
              </CardLayout>
            </Row>
          </Col>

          <Col md={12}>
            <Row>
              <CardLayout>
                <Col md={12}>
                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={activeTab === 0 ? "active " : ""}
                    >
                      General
                    </button>
                    {/* <button
                      onClick={() => handleTabClick(1)}
                      className={activeTab === 1 ? "active" : ""}
                    >
                      Details
                    </button> */}
                    <button
                      onClick={() => handleTabClick(2)}
                      className={activeTab === 2 ? "active" : ""}
                    >
                      Deleted Supplies
                    </button>
                    <button
                      onClick={() => handleTabClick(3)}
                      className={activeTab === 3 ? "active" : ""}
                    >
                      Draft
                    </button>
                  </Box>
                  <Row>
                    <Col md={12}>
                      <div>
                
                          <Box className="cate-Tabs-main">
                            <SuppliesGeneralTab activeTab={activeTab}/>
                          </Box>


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
