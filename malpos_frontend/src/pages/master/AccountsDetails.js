import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import { Box } from "../../components/elements";

export default function AccountsDetails() {
  return (
    <div>
      <PageLayout>
        <Row>
            
            {/* </Row> */}
          
          <Col md={12}>
            <CardLayout>
              <Row>
          <Col md={12}>
            {/* <Row> */}
              <div className="d-flex justify-content-between align-items-center">
                <h5>Details</h5>
                <Box className="construction-edit-icons">
                  <Box className="edit-icons">
                    <Link to="/accounts" className="addproduct-btn ">
                      <img
                        className="fas fa-user"
                        src="/images/icons/close1.png"
                        alt="Close"
                      />
                    </Link>
                  </Box>
                </Box>
              </div>
              </Col>
                <Col md={12}>
                  <Table className="acc-details-table">
                    <thead style={{backgroundColor:'#F07632'}}>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mar 27, 08:05:13</td>
                        <td>640.61 SAR</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
