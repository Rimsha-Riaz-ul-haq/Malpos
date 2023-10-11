import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Box, Item, Text, List } from "../../components/elements";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductReturnSIngleReceipt() {
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              Product Return - #ID 41 - #Receipt 1122
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
              <Box className="receipt-product-return-table-wrap">
                <Table className="product-return-table">
                  <thead className="thead-modifier">
                    <tr>
                      <th className="th-return">Product</th>
                      <th className="th-return">Quality</th>
                      <th className="th-return">Status</th>
                      <th className="th-return">Cost</th>
                      <th className="th-return">Price</th>
                      <th className="th-return">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-return td-return-product">
                        Gold Dust Espresso (اسبريسو){" "}
                      </td>
                      <td className="td-return">1</td>
                      <td className="td-return">Storage</td>
                      <td className="td-return">-</td>
                      <td className="td-return">65.22 </td>
                      <td className="td-return">9.78 </td>
                    </tr>
                  </tbody>
                </Table>
              </Box>

              <Box className="product-return-cal-details">
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <Box classsName="items-cal-nam">
                        <List className="items-cal">
                          <Item>
                            <Text as="span" className="item">
                              {" "}
                              Date
                            </Text>
                          </Item>
                          <Item>
                            <Text as="span" className="item">
                              {" "}
                              Total{" "}
                            </Text>
                          </Item>
                          <Item>
                            <Text as="span" className="item">
                              {" "}
                              Payments methods{" "}
                            </Text>
                          </Item>
                        </List>
                      </Box>
                    </Col>
                    <Col md={6}>
                      <Box classsName="items-cal-des">
                        <List className="items-cal-des">
                          <Item>
                            <Text as="span" className="item">
                              {" "}
                              Mar 23:4:24
                            </Text>
                          </Item>
                          <Item>
                            <Text as="span" className="item">
                              {" "}
                              75.0000 SAR
                            </Text>
                          </Item>
                          <Item>
                            <Text as="span" className="item">
                              {" "}
                              Visa 75.0000 SAR{" "}
                            </Text>
                          </Item>
                        </List>
                      </Box>
                    </Col>
                  </Row>
                </Col>
              </Box>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
