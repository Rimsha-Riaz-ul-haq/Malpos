import React from "react";
import { useState } from "react";
import { Row, Col, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faCaretRight,
  faEdit, faTrash, faEllipsis,
  faCaretDown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
export default function AccountCatgories() {
  const [expandedRows, setExpandedRows] = useState([]);
  const [open, Close] = useState(false);

  const handleDotBox = () => {
      Close(!open);
  };

  const data = [
    {
      id: 1,
      name: "Return to Supplier",
      type: "Both",

      children: [
        { id: 4, name: "Refund of paid product to supplier", type: "Income " },
        { id: 5, name: "Unpaid product return to supplier", type: "Expense" },
      ],
    },
  ];

  const handleRowClick = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
        <Col md={12}>
            Accounts Categories
          </Col>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      {/* <Row> */}
                      <Col md={6}>
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
                      {/* </Row> */}
                    </Col>
                    <Col md={6} className="col-6-create-btn">
                      <Link to={"/categories-create"}>
                        <button className="acc-create-btn">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Table className="acc-categories-parent-table">
                    <thead style={{backgroundColor:'#F07632', 
  lineHeight: "5px"}}>
                      <tr>
                        <th className="th-w60">Name</th>
                        <th className="th-w30">type</th>
                        <th className="th-w10"></th>
                      </tr>
                    </thead>
                    <tbody>

                      {data.map(({ id, name, type, children }) => (
                        <React.Fragment key={id}>
                          <tr onClick={() => handleRowClick(id)}>
                            <td className="td-w60">
                              <span>
                                <FontAwesomeIcon
                                  icon={
                                    expandedRows.includes(id)
                                      ? faCaretDown
                                      : faCaretRight
                                  }
                                />
                              </span>{" "}
                              {name}
                            </td>
                            <td className="td-w30">{type}</td>
                            <td className="td-w10">
                              <Box className={"faLock"}>
                                <FontAwesomeIcon icon={faLock} />
                              </Box>
                              <Box className="dot-content">
                           <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                      {open ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                       <Link to={'/category-edit'}> <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                                        </Box>
                                                                        </Link>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faTrash} /> Remove
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Box>
                            </td>
                          </tr>
                          {expandedRows.includes(id) && children.length > 0 && (
                            <>
                              {children.map(({ id, name, type }) => (
                                <tr key={id}>
                                  <td>
                                    <Box className={"child-table-td"}>
                                      {name}
                                    </Box>
                                  </td>
                                  <td>{type}</td>
                                  <td className="td-w10">
                                    <Box className={"faLock"}>
                                      <FontAwesomeIcon icon={faLock} />
                                    </Box>
                                   
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
