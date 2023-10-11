import React, { useState } from "react";
import { Col, Row, Form, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSearch,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import { Box } from "../../components/elements";
import { Link } from "react-router-dom";
export default function ProductReturn() {
  const [state, setState] = useState({
    showOption: false,
    staffOpen: false,
    courierOpen: false,
    hallOpen: false,
    productOpen: false,
    statusOpen: false,
    customerOpen: false,
    suspiciousOpen: false,
    productDeleteOpen: false,
    typeOpen: false,
    paymentOpen: false,
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
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Product Return 1</h5>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
              </div>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Box className="order-return-tab-wrapper">
                <Box className="receipt-tab">
                  <Col md={4} sm={12} lg={2}>
                    <Box>
                      <div style={{ position: "relative", height: "34px" }}>
                        <Form.Control
                          type="search"
                          placeholder="Receipt #"
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
                    </Box>
                  </Col>
                  <Col md={8} lg={10} sm={12} className="md-mt-2">
                    <Box className="filter-box" style={{ marginLeft: "5px" }}>
                      <Box className="filter-box-item">
                        <div onClick={() => handleStateChange("staffOpen")}>
                          <span className="filter-box-span">Staff </span>
                          <span className="filter-box-span-caret">
                            <FontAwesomeIcon icon={faAngleDown} />{" "}
                          </span>
                        </div>
                        {state.staffOpen ? (
                          <Box className="filter-box-select-opt">
                            <Box className="filter-box-select-opt-box">
                              <Box className="filter-box-search">
                                <div
                                  style={{
                                    position: "relative",
                                    height: "34px",
                                  }}
                                >
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
                                      fontSize: "11px",
                                    }}
                                  >
                                    <button type="submit">
                                      <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                  </span>
                                </div>
                              </Box>
                              <Box className="filter-box-checkbox-main">
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="TIS Software"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Cashier"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Waiter 2"
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                    <Box className="filter-box">
                      <Box className="filter-box-item">
                        <div onClick={() => handleStateChange("productOpen")}>
                          <span className="filter-box-span">Product </span>
                          <span className="filter-box-span-caret">
                            <FontAwesomeIcon icon={faAngleDown} />{" "}
                          </span>
                        </div>
                        {state.productOpen ? (
                          <Box className="filter-box-select-opt">
                            <Box className="filter-box-select-opt-box">
                              <Box className="filter-box-search">
                                <div
                                  style={{
                                    position: "relative",
                                    height: "34px",
                                  }}
                                >
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
                                      fontSize: "11px",
                                    }}
                                  >
                                    <button type="submit">
                                      <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                  </span>
                                </div>
                              </Box>
                              <Box className="filter-box-checkbox-main">
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="3rd Planet"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Ethiopoa"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="Kenya" />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Familia Chacon"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="Kenya" />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                    <Box className="filter-box">
                      <Box className="filter-box-item">
                        <div onClick={() => handleStateChange("statusOpen")}>
                          <span className="filter-box-span">Customers </span>
                          <span className="filter-box-span-caret">
                            <FontAwesomeIcon icon={faAngleDown} />{" "}
                          </span>
                        </div>
                        {state.statusOpen ? (
                          <Box className="filter-box-select-opt filter-box-select-opt-status">
                            <Box className="filter-box-select-opt-box">
                              <Box className="filter-box-checkbox-main">
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-search">
                                    <div
                                      style={{
                                        position: "relative",
                                        height: "34px",
                                      }}
                                    >
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
                                          fontSize: "11px",
                                        }}
                                      >
                                        <button type="submit">
                                          <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                      </span>
                                    </div>
                                  </Box>
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="TIS" />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="MOHAMMAD"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Abdul Rehman"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="Ahad" />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                    {/*  */}

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    <Box className="filter-box">
                      <Box className="filter-box-item">
                        <div onClick={() => handleStateChange("typeOpen")}>
                          <span className="filter-box-span">
                            Payment method
                          </span>
                          <span className="filter-box-span-caret">
                            <FontAwesomeIcon icon={faAngleDown} />{" "}
                          </span>
                        </div>
                        {state.typeOpen ? (
                          <Box className="filter-box-select-opt">
                            <Box className="filter-box-select-opt-box">
                              <Box className="filter-box-search">
                                <div
                                  style={{
                                    position: "relative",
                                    height: "34px",
                                  }}
                                >
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
                                      fontSize: "11px",
                                    }}
                                  >
                                    <button type="submit">
                                      <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                  </span>
                                </div>
                              </Box>
                              <Box className="filter-box-checkbox-main">
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="Cash" />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="Card" />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Customer Bonus"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Customer Balance"
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                    <Box className="filter-box">
                      <Box className="filter-box-item">
                        <div onClick={() => handleStateChange("showOption")}>
                          <span className="filter-box-span">Terminals </span>
                          {/* <span className="filter-box-span-count">0</span> */}
                          {/* <span className="filter-box-span-xmart">
                            <FontAwesomeIcon icon={faXmark} />{" "}
                          </span> */}

                          <span className="filter-box-span-caret">
                            <FontAwesomeIcon icon={faAngleDown} />{" "}
                          </span>
                        </div>
                        {state.showOption ? (
                          <Box className="filter-box-select-opt">
                            <Box className="filter-box-select-opt-box">
                              <Box className="filter-box-search">
                                <div
                                  style={{
                                    position: "relative",
                                    height: "34px",
                                  }}
                                >
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
                                      fontSize: "11px",
                                    }}
                                  >
                                    <button type="submit">
                                      <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                  </span>
                                </div>
                              </Box>
                              <Box className="filter-box-checkbox-main">
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Terminal 1"
                                    />
                                  </Box>
                                </Box>

                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Terminal 2"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Terminal 3"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Call Center"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Clopas Test"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="t5" />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="t6" />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </Col>

                  {/*  */}
                  {/*  */}
                  {/*  */}

                  {/*  */}
                </Box>
              </Box>
              <Box className="mt-2">
                <Table className="offer-not-table" responsive>
                  <thead className="thead-product-return mc-table-head dark">
                    <tr>
                      <th className="th-w5">Id</th>
                      <th className="th-w10">Receipt</th>
                      <th className="th-w10">Waiter</th>
                      <th className="th-w5">
                        Amount
                        <br />
                        {/* <span>50.34 SAR</span> */}
                      </th>
                      <th className="th-w5">Payment method</th>
                      <th className="th-w5">Terminal</th>
                      <th className="th-w5">Operate at</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                      <td className="">
                        <Link
                          to={"/sale-product-return"}
                          className="pro-return-active-id"
                        >
                          42
                        </Link>
                      </td>
                      <td className="">
                        <Link
                          to={"/receipt-edit"}
                          className="pro-return-active-id"
                        >
                          1062
                        </Link>
                      </td>
                      <td className="">TIS Software</td>
                      <td className="">15</td>
                      <td className="">Cash</td>
                      <td className="">Terminal 1</td>
                      <td className="">Mar 16, 12.52.01</td>
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
