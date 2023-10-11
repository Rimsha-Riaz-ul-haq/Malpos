import React from "react";
import { Col, Table, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function TransactionCashflow() {
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Transactions</h5>
                <Box className="construction-edit-icons">
                  <Box className="edit-icons">
                    <Link to="/cashflow" className="addproduct-btn ">
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
              <Table className="cashflow-transaction-table">
                <thead>
                  <tr>
                    <th>
                      Operation Time
                      <button
                        style={{ color: "#172026" }}
                        className="sorting-icon"
                        onClick={toggleSortOrder}
                      >
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </button>
                    </th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>
                      Amount
                      <button
                        style={{ color: "#172026" }}
                        className="sorting-icon"
                        onClick={toggleSortOrder}
                      >
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </button>
                      <br />
                      <span>0.00 SAR</span>
                    </th>
                    <th>From Account</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </Table>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
