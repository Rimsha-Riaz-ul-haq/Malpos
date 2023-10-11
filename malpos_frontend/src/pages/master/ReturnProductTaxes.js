import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ReturnProductTaxes() {
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              Taxes
              <Box className="construction-edit-icons">
                <Box className="edit-icons">
                  <Link to="/receipt-edit" className="addproduct-btn ">
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
              <Box className="receipt-product-tax-table-wrap">
                <Table className="product-tax-table">
                  <thead className="thead-modifier">
                    <tr>
                      <th className="th-tax">Name</th>
                      <th className="th-tax">Percent</th>
                      <th className="th-tax">Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-tax td-tax-name">VAT %15 </td>
                      <td className="td-tax">19</td>
                      <td className="td-tax">8</td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
