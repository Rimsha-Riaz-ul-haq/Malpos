import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";

import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faEdit,
  faSmile,
  faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function Reviews() {
  const [state, setState] = useState({
    showOption: false,
    productOpen: false,
    storageOpen: false,
    accountOpen: false,
    typeOpen: false,
    categoryOpen: false,
  });
  const handleStateChange = (key) => {
    //     // const [open, Close] = useState(false);

    setState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((k) => {
        newState[k] = k === key ? !prevState[k] : false;
      });
      return newState;
    });
  };

  //   const toggleSortOrder = () => {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   };
  const [open, Close] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDotBox = () => {
    Close(!open);
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
              <h5>Review</h5>
            </div>
          </CardLayout>
        </Col>

        <Col md={12}>
          <CardLayout>
            <Box className="">
              <Box className="receipt-tab">
                {/* <Col md={12}> */}
                <Col md={2}>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type="search"
                      placeholder="Receipt#"
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
                <Col md={6}>
                  <Box className="filter-box" style={{ marginLeft: "5px" }}>
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
                                  <Form.Check type="checkbox" label="Receipt" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Brand" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="" />
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
                      <div onClick={() => handleStateChange("storageOpen")}>
                        <span className="filter-box-span">Services</span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.storageOpen ? (
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
                                  <Form.Check type="checkbox" label="Bed" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Normal" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Good" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Very good"
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
                      <div onClick={() => handleStateChange("categoryOpen")}>
                        <span className="filter-box-span">Food</span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.categoryOpen ? (
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
                                  <Form.Check
                                    type="checkbox"
                                    label="Espresso"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Good" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Normal" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Bad" />
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

                  <Box className="filter-box ">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("accountOpen")}>
                        <span className="filter-box-span">Delivery</span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.accountOpen ? (
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
                                  <Form.Check type="checkbox" label="Good" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Normal" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Bad" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Very good"
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
                </Col>

                <Box className={"h-checkBox-acc"}>
                  <Form.Check type="checkbox" label="Show delete reviews " />
                </Box>

                {/* </Col> */}
              </Box>
            </Box>
          </CardLayout>
        </Col>

        <Box className="payment-sale-table-wrap">
          <Table className="sale-m-table" responsive>
            <thead className="mc-table-head dark">
              <tr>
                <th className="th-w220">
                  Type
                  <button className="sorting-icon" onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                  <br />
                  <span className="text-dark">-</span>
                </th>
                <th className="th-w220">
                  full name <br />
                  <span className="text-dark">-</span>
                </th>
                <th className="th-w220">
                  Services <br />
                  <span className="td-faCheck text-warning">4.33</span>
                </th>
                <th className="th-w220">
                  Food
                  <br />
                  <span className=" text-warning">4.33</span>
                </th>

                <th className="th-w220">
                  {" "}
                  Delivery <br />
                  <span className=" text-warning">0</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-w220">Brand</td>
                <td className="td-w220 ">--</td>
                <td className="td-w220 td-faCheck">
                  <FontAwesomeIcon
                    icon={faSmile}
                    style={{ marginLeft: "25px" }}
                  />{" "}
                </td>
                <td className="td-w220 td-faCheck">
                  <FontAwesomeIcon
                    icon={faSmileBeam}
                    style={{ marginLeft: "25px" }}
                  />{" "}
                </td>
                <td className="td-w220">-- </td>
                <td>
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
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
      </Row>
    </PageLayout>
  );
}
