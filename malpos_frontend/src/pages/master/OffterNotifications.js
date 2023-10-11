import PageLayout from "../../layouts/PageLayout";
import React, { useState } from "react";
import { Box } from "../../components/elements";
import { Col, Form, Table } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCaretDown,
  faMinus,
  faXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { CardLayout } from "../../components/cards";
import { Link } from "react-router-dom";

export default function OfferNotifications() {
  const [state, setState] = useState({
    showOption: false,
    staffOpen: false,
    courierOpen: false,
    hallOpen: false,
    ProductOpen: false,
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
              <h5>Order Notifications</h5>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Box className="order-return-tab-wrapper">
                <Box className="receipt-tab">
                  <Col md={10}>
                    <Box className="filter-box">
                      <Box className="filter-box-item">
                        <div onClick={() => handleStateChange("typeOpen")}>
                          <span className="filter-box-span">Type </span>
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
                                    <Form.Check
                                      type="checkbox"
                                      label="call center"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check type="checkbox" label="Wait" />
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
                          <span className="filter-box-span">Status </span>
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
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Pending"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Ignored"
                                    />
                                  </Box>
                                </Box>
                                <Box className="filter-box-checkbox-div">
                                  <Box className="filter-box-checkbox">
                                    <Form.Check
                                      type="checkbox"
                                      label="Received"
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
                    {/*  */}

                    {/*  */}
                    {/*  */}
                    {/*  */}

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
              <Box className="offer-notification-table-wrap">
                <Table className="offer-not-table">
                  <thead className="thead-offer-notif">
                    <tr>
                      <th className="th-w130">Notification</th>
                      <th className="th-w100">Type</th>
                      <th className="th-w100">Integration</th>
                      <th className="th-w130">Integration Status</th>
                      <th className="th-w130">Status</th>
                      <th className="th-w100">Terminal</th>
                      <th className="th-w130">Accepted by</th>
                      <th className="th-w130">Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-w130">42</td>
                      <td className="td-w100">Emenu</td>
                      <td className="td-w100">Emenu</td>
                      <td className="td-w130">-</td>
                      <td className="td-w130">
                        Ignore{" "}
                        <Link to={"/receipt-edit"}>
                          {" "}
                          <span>#212</span>
                        </Link>{" "}
                      </td>
                      <td className="td-w100">Terminal 1</td>
                      <td className="td-w130">TIS Software</td>
                      <td className="td-w130">Mar 16, 12.52.01</td>
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
