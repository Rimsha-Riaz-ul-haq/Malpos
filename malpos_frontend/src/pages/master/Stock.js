import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import { Button, Input, Box, Label } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faSearch,
  faAngleDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import axiosInstance from "../../api/baseUrl";
import SkeletonCell from "../../components/Skeleton";

// ... Other imports and component code ...

export default function Stocks() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setIsLoading] = useState(true); // Loading state
  const [state, setState] = useState({
    showOption: false,
    productOpen: false,
    storageOpen: false,
    accountOpen: false,
    typeOpen: false,
    categoryOpen: false,
  });
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchStocks();
  }, []);
  const handleSuppliesCreate = () => {
    navigate(`/supplies-edit/`, {
      state: {
        action: "createSupplies",
      },
    });
  };
  const fetchStocks = async () => {
    try {
      const response = await axiosInstance.get("/get_stock");
      const stockData = response.data.data;

      // Fetch product and storage details for each stock item
      const stocksWithDetails = await Promise.all(
        stockData.map(async (stock) => {
          const mdProductId = stock.md_product_id;
          const mdStorageId = stock.md_storage_id;

          const productResponse = await axiosInstance.get(
            `/product/${mdProductId}/edit`
          );
          const storageResponse = await axiosInstance.get(
            `/md_storage/${mdStorageId}/edit`
          );

          return {
            ...stock,
            productName: productResponse.data.product_name,
            productPrice: productResponse.data.product_price,
            storageName: storageResponse.data.name,
          };
        })
      );

      setStocks(stocksWithDetails);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getAverage = (totalCost, quantity) => {
    if (quantity === 0) {
      return "N/A";
    }
    const average = (totalCost / quantity).toFixed(2);
    return average;
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <h5>Stocks {stocks.length}</h5>
          </CardLayout>
        </Col>

        <Col md={12}>
          <CardLayout>
            <Box className="">
              <Box className="receipt-tab">
                <Col md={12}>
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
                                  <Form.Check type="checkbox" label="Goods" />
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
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Dish" />
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
                        <span className="filter-box-span">Category</span>
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
                                  <Form.Check
                                    type="checkbox"
                                    label="Organic Tea"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Iced Drinks"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Salad" />
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
                      <div onClick={() => handleStateChange("accountOpen")}>
                        <span className="filter-box-span">
                          Accounting Category
                        </span>
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
                                  <Form.Check type="checkbox" label="Juices" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check type="checkbox" label="Mul" />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="2023 Sales"
                                  />
                                </Box>
                              </Box>
                              <Box className="filter-box-checkbox-div">
                                <Box className="filter-box-checkbox">
                                  <Form.Check
                                    type="checkbox"
                                    label="Without category"
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
                                  <Form.Check type="checkbox" label="Return" />
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
                  <button className="acc-create-btn rs-btn-create">
                    <FontAwesomeIcon
                      onClick={handleSuppliesCreate}
                      icon={faPlus}
                    />{" "}
                    Create Supply
                  </button>
                </Col>
              </Box>
            </Box>
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
                        <th>
                          ID
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th className="th-w220">
                          Name
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          Qty
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          Total Cost
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th> Average</th>
                        <th>
                          {" "}
                          Type
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th>
                          {" "}
                          Category
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th> Storage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? ( // Render skeleton when loading is true
                        <>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        // Render data rows when loading is false
                        stocks.map((stock) => (
                          <tr key={stock.id}>
                            <td>{stock.id}</td>
                            <td>{stock.productName}</td>
                            <td>{stock.current_qty}</td>
                            <td>{stock.current_qty * stock.productPrice}</td>
                            <td>
                              {getAverage(
                                stock.productPrice,
                                stock.current_qty
                              )}
                            </td>
                            <td>Sample Value</td>
                            <td>Sample Value</td>
                            <td>{stock.storageName}</td>
                          </tr>
                        ))
                      )}
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
