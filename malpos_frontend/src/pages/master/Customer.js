import React, { useState } from "react";
import { Row, Col, Form, Table } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Breadcrumb } from "../../components";

import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";

export default function Customer() {
  const [sortOrder, setSortOrder] = useState("asc");

  const [state, setState] = useState({
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
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <div className="d-flex justify-content-between align-items-center">
              <h5>Customer</h5>
            </div>
          </CardLayout>
        </Col>

        <Col md={12}>
          <CardLayout>
            <Row>
              <Box className="">
                <Box className="receipt-tab">
                  <Col md={9}>
                    <Row>
                      <Col md={3}>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type="search"
                            placeholder="Name"
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

                      <Col md={3}>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type="search"
                            placeholder="Phone"
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

                      <Col md={5}>
                        <Row>
                          <Col md={6}>
                            <MultiSelectNoLabel
                              label="Group"
                              options={[
                                { label: "All ", value: "All" },
                                {
                                  label: "Customers with debit ",
                                  value: "Customers with debit",
                                },
                                {
                                  label: "Balance customers ",
                                  value: "Balance customers",
                                },
                              ]}
                            />
                          </Col>
                          <Col md={6}>
                            <LabelField
                              option={[
                                "All",
                                "Customers with debit",
                                "Balance customers",
                              ]}
                              fieldSize="w-100 h-md"
                              style={{ backgroundSize: "15px" }}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2} sm={12} >
                    <Link to={"/customer-create"} className="w-100">
                      <button className="acc-create-btn rs-btn-create w-100 text-center">
                        <FontAwesomeIcon icon={faPlus} /> Create{" "}
                      </button>
                    </Link>
                  </Col>
                </Box>
              </Box>
            </Row>
          </CardLayout>
        </Col>

        <Col md={12}>
          <CardLayout>
            <Row>
              <Col md={12}>
                <Box className="payment-sale-table-wrap">
                  <Table className="sale-m-table" responsive>
                    <thead className="mc-table-head dark">
                      <tr>
                        <th className="th-w220" style={{ fontSize: "8px" }}>
                          Name
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th style={{ fontSize: "8px" }}>Phone</th>
                        <th style={{ fontSize: "8px" }}>address</th>
                        <th style={{ fontSize: "8px" }}> Balance</th>
                        <th style={{ fontSize: "8px" }}> Group</th>
                        <th style={{ fontSize: "8px" }}>Date of Bir</th>
                        <th style={{ fontSize: "8px" }}> gender</th>
                        <th style={{ fontSize: "8px" }}> code</th>
                        <th style={{ fontSize: "8px" }}>Total ceive</th>
                        <th style={{ fontSize: "8px" }}>Source</th>
                        <th style={{ fontSize: "8px" }}>Total Expense</th>
                        <th style={{ fontSize: "8px" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220 fw-bold "><Link className="link" to={'/marketing-customer-details'}> TIS </Link></td>
                        <td>+966 9200 33035</td>
                        <td>jaddah</td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
                          <Box className={"td-left"}>
                            <span>
                              <FontAwesomeIcon icon={faEllipsis} />{" "}
                            </span>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220 fw-bold"><Link className="link" to={'/marketing-customer-details'}> Muhammad </Link></td>
                        <td>+966 9200 33035</td>
                        <td></td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
                          <Box className={"td-left"}>
                            <span>
                              <FontAwesomeIcon icon={faEllipsis} />{" "}
                            </span>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220 fw-bold"><Link className="link" to={'/marketing-customer-details'}> Ahad </Link></td>
                        <td>+966 9200 33035</td>
                        <td></td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
                          <Box className={"td-left"}>
                            <span>
                              <FontAwesomeIcon icon={faEllipsis} />{" "}
                            </span>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220 fw-bold"><Link className="link" to={'/marketing-customer-details'}> Ali Raza </Link></td>
                        <td className="td-w220 fw-bold">+966 9200 33035</td>
                        <td>jaddah</td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
                          <Box className={"td-left"}>
                            <span>
                              <FontAwesomeIcon icon={faEllipsis} />{" "}
                            </span>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220 fw-bold"><Link className="link" to={'/marketing-customer-details'}> Burger Man C </Link></td>
                        <td>+966 9200 33035</td>
                        <td></td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
                          <Box className={"td-left"}>
                            <span>
                              <FontAwesomeIcon icon={faEllipsis} />{" "}
                            </span>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220"><Link className="link" to={'/marketing-customer-details'}> Eman </Link></td>
                        <td>+966 9200 33035</td>
                        <td>Makkah</td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
                          <Box className={"td-left"}>
                            <span>
                              <FontAwesomeIcon icon={faEllipsis} />{" "}
                            </span>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr style={{ fontSize: "10px" }}>
                        <td className="td-w220 fw-bold"><Link className="link" to={'/marketing-customer-details'}> Rehman  </Link> </td>
                        <td>+966 9200 33035</td>
                        <td></td>
                        <td>25.00 </td>
                        <td>TIS Group</td>
                        <td>08.12.198</td>
                        <td>Male</td>
                        <td>--</td>
                        <td>25 </td>
                        <td>--</td>
                        <td>16839.41</td>
                        <td>
                          {" "}
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
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
