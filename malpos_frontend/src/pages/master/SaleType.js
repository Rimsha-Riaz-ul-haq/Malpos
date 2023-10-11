import {
  faCheck,
  faEdit,
  faMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SaleType() {
  const [open, Close] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDotBox = () => {
    Close(!open);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>Sale Types 1</CardLayout>
          </Col>

          <Col md={12}>
            <CardLayout>
              <Col md={12}>
                <Row className="justify-content-between">
                  <Col md={6}>
                    <Row>
                      <Col md={10}>
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
                    </Row>
                  </Col>
                  <Col md={2} sm={12}>
                    <Link to={"/saleType-create"} style={{ display: "block" }}>
                      {" "}
                      <button className="pm-create-btn w-100">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Box className="payment-sale-table-wrap">
                <Table className="sale-m-table">
                  <thead className="mc-table-head dark">
                    <tr>
                      <th className="th-w15">
                        Name
                        <button
                          className="sorting-icon"
                          onClick={toggleSortOrder}
                        >
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                      </th>
                      <th className="th-w15">Payment method</th>
                      <th className="th-w10">
                        Status
                        <button
                          className="sorting-icon"
                          onClick={toggleSortOrder}
                        >
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                      </th>
                      <th className="th-w15">Service Charge %</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>In-Store</td>
                      <td className=" td-faCheck">
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{ marginLeft: "55px" }}
                        />{" "}
                      </td>
                      <td className="td-faCheck">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ marginLeft: "25px" }}
                        />{" "}
                      </td>
                      <td>Default Service Charge </td>
                      {/* <td>
                        <Box className="dot-content">
                          <div onClick={handleDotBox}>...</div>
                          {open ? (
                            <Box
                              className="DotBox-main-wrapper"
                              onClick={handleDotBox}
                            >
                              <Box className="DotBox-inner">
                                <Box className="DotBox-p-con">
                                  <Link to={"/payment-method-create"}>
                                    {" "}
                                    <FontAwesomeIcon icon={faEdit} /> Edit{" "}
                                  </Link>
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            ""
                          )}
                        </Box>
                      </td> */}
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
