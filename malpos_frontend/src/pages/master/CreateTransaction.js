import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";

import PageLayout from "../../layouts/PageLayout";

import { faCalendarDays, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import TransactionExpense from "./TransactionExpense";
import TransactionTransfer from "./TransactionTransfer";
import TransactionIncome from "./TransactionIncome";

export default function CreateTransaction() {
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
             
                <div className="d-flex justify-content-between align-items-center" style={{marginBottom:"1rem"}}>
                  <h5>Create Transaction</h5>
                  <Box className="construction-edit-icons">
                    <Box className="edit-icons">
                      <Link to="/transactions" className="addproduct-btn ">
                        <img
                          className="fas fa-user"
                          src="/images/icons/close1.png"
                          alt="Close"
                        />
                      </Link>
                    </Box>
                  </Box>
                </div>
            
            </Row>
          </Col>
                <Col md={12}>
                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={activeTab === 0 ? "active " : ""}
                    >
                      Expense
                    </button>
                    <button
                      onClick={() => handleTabClick(1)}
                      className={activeTab === 1 ? "active" : ""}
                    >
                      Income
                    </button>
                    <button
                      onClick={() => handleTabClick(2)}
                      className={activeTab === 2 ? "active" : ""}
                    >
                      Transfer
                    </button>
                  </Box>
                  <Row>
                    <Col md={12}>
                      <div>
                        {activeTab === 0 && (
                          <Box className="cate-Tabs-main">
                            <TransactionExpense />
                          </Box>
                        )}
                        {activeTab === 1 && (
                          <Box className="cate-Tabs-main">
                            <TransactionIncome />
                          </Box>
                        )}
                        {activeTab === 2 && (
                          <Box className="cate-Tabs-main">
                            <TransactionTransfer />
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
