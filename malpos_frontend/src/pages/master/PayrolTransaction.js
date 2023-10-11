import React from "react";
import { Col, Table, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { Box } from "../../components/elements";
export default function PayrolTransactions() {
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Transactions : cashier</h5>
                <Box className="construction-edit-icons">
                  <Box className="edit-icons">
                    <Link to="/payroll" className="addproduct-btn ">
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
              <Table className="pr-transaction-table">
                <thead>
                  <tr>
                    <th>Operation Time</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>March 23.0.12 SAR</td>
                    <td>0000000.0 SAR</td>
                  </tr>
                </tbody>
              </Table>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
