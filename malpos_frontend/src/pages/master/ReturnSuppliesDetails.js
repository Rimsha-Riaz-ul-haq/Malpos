import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { Link } from "react-router-dom";

export default function ReturnSuppliesDetails() {
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Returned supplies - #2</h5>
                <Box className="construction-edit-icons">
                  <Box className="edit-icons">
                    <Link to="/return-supplies" className="addproduct-btn ">
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
              <Table className={"return-supplies-details-table"}>
                <thead>
                  <tr>
                    <td>Product</td>
                    <td className="text-end">Qty</td>
                    <td className="text-end">Price</td>
                    <td className="text-end">Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>New Item11</td>
                    <td className="text-end">100 PCS</td>
                    <td className="text-end">50.00 SAR</td>
                    <td className="text-end">50.00 SAR</td>
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
