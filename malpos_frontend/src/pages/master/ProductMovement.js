import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import { Button, Input, Box, Label } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function ProductMovement() {
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
              <h5>Product Movement 0</h5>
              <div>
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>{" "}
            </div>
          </CardLayout>
        </Col>

        <Col md={12}>
          <CardLayout>
            <Box className="">
              <Box className="receipt-tab">
                {/* <Col md={12}> */}

                <Col md={12}>
                  <Box className="filter-box">
                    <Box className="filter-box-item">
                      <div onClick={() => handleStateChange("storageOpen")}>
                        <span className="filter-box-span">Storage</span>
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
                                  <Form.Check label="Return" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Bar Store"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Back Store"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Drinks Store"
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
                        <span className="filter-box-span">Product</span>
                        <span className="filter-box-span-caret">
                          <FontAwesomeIcon icon={faAngleDown} />{" "}
                        </span>
                      </div>
                      {state.productOpen ? (
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
                                    label="Ingredient"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Dish" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Preparation"
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
                      <div onClick={() => handleStateChange("typeOpen")}>
                        <span className="filter-box-span">Opration type </span>
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
                                  <Form.Check type="checkbox" label="Supply" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Transfer"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Make" />
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
                </Col>
                {/* </Col> */}
              </Box>
            </Box>
          </CardLayout>
        </Col>
        <Col md={12}>
          <CardLayout>
            {/* <h3>Select Product</h3> */}
            <Row>
              <Col md={12}>
                <Box className="payment-sale-table-wrap">
                  <Table className="sale-m-table" responsive>
                    <thead className="mc-table-head dark">
                      <tr>
                        <th>
                          ID
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th className="th-w220">Name</th>
                        <th>Opration type</th>
                        <th>
                          Quantity
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th> One unit cost</th>
                        <th>
                          {" "}
                          Total cost
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th> Storage</th>
                        <th>
                          {" "}
                          Operated at
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          {" "}
                          Created at
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td className="td-w220">Olive Oil</td>
                        <td>Make</td>
                        <td>0 gr 0.00 SAR</td>
                        <td>0.012 gr 1.20 SAR</td>
                        <td> 5.00 SAR</td>
                        <td>Kitchen</td>
                        <td>-- </td>
                        <td>--</td>
                      </tr>
                    </tbody>
                  </Table>
                </Box>
                <Pagination />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
