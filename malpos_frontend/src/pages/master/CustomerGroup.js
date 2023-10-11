import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CustomerGroup() {
  const [sortOrder, setSortOrder] = useState("asc");

  const [setState] = useState({
    showOption: false,
    productOpen: false,
    storageOpen: false,
    accountOpen: false,
    typeOpen: false,
    categoryOpen: false,
  });
  const handleStateChange = (key) => {
    setState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((k) => {
        newState[k] = k === key ? !prevState[k] : false;
      });
      return newState;
    });
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>Customer Group</CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
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
                    <Col md={9}>
                      <Link to={""} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"pacakes-table-wrap"}>
                        <Table>
                          <thead className="thead-dark">
                            <tr>
                              <th className="th-w30">
                                Name
                                <button
                                  className="sorting-icon"
                                  onClick={toggleSortOrder}
                                >
                                  {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th className="th-w30">
                                Discount Value
                                <button
                                  className="sorting-icon"
                                  onClick={toggleSortOrder}
                                >
                                  {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th className="th-w30">Balance</th>
                              <th className="th-w10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="th-w30">TIS group</td>
                              <td className="th-w30">100</td>
                              <td className="th-w30">51.00</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="th-w30">General group</td>
                              <td className="th-w30">--</td>
                              <td className="th-w30">--</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="th-w30">Member Ship</td>
                              <td className="th-w30">10</td>
                              <td className="th-w30">--</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="th-w30">Employee</td>
                              <td className="th-w30">30</td>
                              <td className="th-w30">--</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="th-w30">BENALI</td>
                              <td className="th-w30">--</td>
                              <td className="th-w30">49921.00</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="th-w30">كوب قهوة</td>
                              <td className="th-w30">100</td>
                              <td className="th-w30">--</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                            <tr>
                              <td className="th-w30">Ahad</td>
                              <td className="th-w30">50</td>
                              <td className="th-w30">--</td>
                              <td className="th-w10">
                                <Box className={"td-left"}>
                                  <span>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </span>
                                </Box>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Box>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
