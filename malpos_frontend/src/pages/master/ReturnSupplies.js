import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEdit,
  faCalendarDays,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Box } from "../../components/elements";
export default function ReturnSupplies() {
  const [openDot, CloseDot] = useState(false);

  const handleDotBox = () => {
    CloseDot(!openDot);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <Row>
              <CardLayout>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Returned Supplies 4</h5>
                  <div>
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </div>{" "}
                </div>
              </CardLayout>
            </Row>
          </Col>
          <Col md={12}>
            <Row>
              <Col md={12}>
                <CardLayout>
                  <Row>
                    <Col md={3}>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="search-pl"
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            fontSize: "14px",
                          }}
                        >
                          <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </span>
                      </div>
                    </Col>
                    <Col md={6} className="p-0">
                      <Row>
                        <Col md={4} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="Product"
                            options={[
                              { label: "Water Large ", value: "Water Large" },
                              {
                                label: "Water Small ",
                                value: "Water Small",
                              },
                              {
                                label: "Nova Water Large ",
                                value: "Nova Water Large",
                              },
                            ]}
                          />
                        </Col>
                        <Col md={4} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="Supplier"
                            options={[
                              { label: "Fish Market ", value: "Fish Market" },
                              {
                                label: " شركة التوريدات العالمية",
                                value: "شركة التوريدات العالمية",
                              },
                              {
                                label: "شركة توريدات القهوة ",
                                value: "شركة توريدات القهوة",
                              },
                            ]}
                          />
                        </Col>
                        <Col md={4} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="Storage"
                            options={[
                              { label: "Return ", value: "Return" },
                              {
                                label: "Bar Storage 2 ",
                                value: "Bar Storage 2",
                              },
                              {
                                label: "Back Storage ",
                                value: "Back Storage",
                              },
                            ]}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3} className="rs-btn-create">
                      <Link to={"/return-create"}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"retrun-supplies-table-wrap"}>
                        <Table className="retrun-supplies-table">
                          <thead className="thead-dark">
                            <tr>
                              <th className="th-w50">Id</th>
                              <th className="th-w150">Operation Code</th>
                              <th className="th-w100">Supplier</th>
                              <th className="th-w150">Storage</th>
                              <th className="th-w100">Amount</th>
                              <th className="th-w150">Amount</th>
                              <th className="th-w100">Description</th>
                              <th className="th-w130">Opearted At</th>
                              <th className="th-w130">Created At</th>
                              <th className="th-w50"> </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="td-w50">
                                <Link
                                  className="link"
                                  to={"/return-supplies-details"}
                                >
                                  {" "}
                                  23
                                </Link>
                              </td>
                              <td className="td-w150">-</td>
                              <td className="td-w100">Fish Market</td>
                              <td className="td-w150">مستودع الفرع الرئيسيA</td>
                              <td className="td-w100">50.00</td>
                              <td className="td-w150">Supplier:9b6cea5</td>
                              <td className="td-w100">-</td>
                              <td className="td-w130">Mar 19, 16:02:50</td>
                              <td className="td-w130">Mar 19, 16:02:50</td>
                              <td className="td-w50">
                              <Box className="dot-content">

<div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
{openDot ? (
  <Box className="DotBox-main-wrapper">
    <Box className="DotBox-inner">
      <Box className="DotBox-p-con">
        <FontAwesomeIcon icon={faEdit} /> Edit
      </Box>
      
    </Box>
  </Box>
) : (
  ""
)}
</Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="td-w50">
                                <Link
                                  className="link"
                                  to={"/return-supplies-details"}
                                >
                                  {" "}
                                  25
                                </Link>
                              </td>
                              <td className="td-w150">-</td>
                              <td className="td-w100">Grocery</td>
                              <td className="td-w150">مستودع الفرع الرئيسيA</td>
                              <td className="td-w100">50.00</td>
                              <td className="td-w150">Supplier:9b6cea5</td>
                              <td className="td-w100">-</td>
                              <td className="td-w130">Mar 19, 16:02:50</td>
                              <td className="td-w130">Mar 19, 16:02:50</td>
                              <td className="td-w50">
                               
                              </td>
                            </tr>
                            <tr>
                              <td className="td-w50">
                                <Link
                                  className="link"
                                  to={"/return-supplies-details"}
                                >
                                  {" "}
                                  26
                                </Link>
                              </td>
                              <td className="td-w150">-</td>
                              <td className="td-w100">Bakery</td>
                              <td className="td-w150">مستودع الفرع الرئيسيA</td>
                              <td className="td-w100">50.00</td>
                              <td className="td-w150">Supplier:9b6cea5</td>
                              <td className="td-w100">-</td>
                              <td className="td-w130">Mar 19, 16:02:50</td>
                              <td className="td-w130">Mar 19, 16:02:50</td>
                              <td className="td-w50">
                               
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Box>
                    </Col>
                  </Row>
                </CardLayout>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
