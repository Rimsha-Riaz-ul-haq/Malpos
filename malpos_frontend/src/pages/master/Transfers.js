import React, { useState } from "react";
import { CardGroup, Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEdit,
  faCheck,
  faEllipsis,
  faMinus,
  faCopy,
  faTrash,
  faCircleXmark,
  faUserEdit,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import { Table } from "react-bootstrap";
export default function Transfers() {
  const [openDot, CloseDot] = useState(false);

  const handleDotBox = () => {
    CloseDot(!openDot);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>Transfers</CardLayout>
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
                    <Col md={6} className="p-0">
                      <Row>
                        <Col md={3} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="From Storage"
                            options={[
                              { label: "Return ", value: "Return" },
                              {
                                label: "Return ",
                                value: "Return",
                              },
                              {
                                label: "Back Stor ",
                                value: "Back Stor",
                              },
                            ]}
                          />
                        </Col>
                        <Col md={3} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="To Storage"
                            options={[
                              { label: "Return ", value: "Return" },
                              {
                                label: "Return ",
                                value: "Return",
                              },
                              {
                                label: "Back Stor ",
                                value: "Back Stor",
                              },
                            ]}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3} className="rs-btn-create">
                      <Link to={"/transfers-create"}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"transfer-table-wrap"}>
                        <Table className="transfer-table">
                          <thead className="thead-dark">
                            <tr>
                              <th className="th-w50">Id</th>
                              <th className="th-w300">Product</th>
                              <th className="th-w130">Operation Time</th>
                              <th className="th-w130">From Storage</th>
                              <th className="th-w130">To Storage</th>
                              <th className="th-w100">Reason</th>
                              <th className="th-w100">Process</th>
                              <th className="th-w100">
                                Total Cost
                                <br />
                                <span>0.223 SAR</span>
                              </th>
                              <th className="th-w50"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="td-w50">
                                <Link
                                  className="link"
                                  to={"/transfers-details"}
                                >
                                  {" "}
                                  132
                                </Link>
                              </td>
                              <td className="td-w300">
                                كاتشب(1000 g),جبنة شرائح(50 pcs),خبز برجر(3 pcs)
                              </td>
                              <td className="td-w130">Mar 19, 16:04:47</td>
                              <td className="td-w130">تودع الفرع الرئيسي</td>
                              <td className="td-w130">Bar Storage 2</td>
                              <td className="td-w100">
                                <FontAwesomeIcon icon={faMinus} />
                              </td>
                              <td className="td-w100">
                                <span className="span-g-check">
                                  <FontAwesomeIcon icon={faCheck} />
                                </span>
                              </td>
                              <td className="td-w100">100.00 SAR</td>
                              <td className="td-w50">
                              <Box className="dot-content">

<div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
{openDot ? (
  <Box className="DotBox-main-wrapper">
    <Box className="DotBox-inner">
      <Box className="DotBox-p-con">
        <FontAwesomeIcon icon={faEdit} /> Edit
      </Box>
      <Box className="DotBox-p-con">
        <FontAwesomeIcon icon={faTrash} /> Remove
      </Box>
      <Box className="DotBox-p-con">
        <FontAwesomeIcon icon={faDownload} /> Export
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
                                <Link to={"/transfers-details"}> 132</Link>
                              </td>
                              <td className="td-w300">
                                كاتشب(50 g),جبنة شرائح(0 pcs), برجر(0 pcs)
                              </td>
                              <td className="td-w130">Feb 1, 16:04:47</td>
                              <td className="td-w130"> الفرع الرئيسي</td>
                              <td className="td-w130"> Storage 3</td>
                              <td className="td-w100">
                                <FontAwesomeIcon icon={faMinus} />
                              </td>
                              <td className="td-w100">
                                <span className="span-g-check">
                                  <FontAwesomeIcon icon={faCheck} />
                                </span>
                              </td>
                              <td className="td-w100">110.00 SAR</td>
                              <td className="td-w50">
                                <Box className="dot-content">

                                  <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                  {openDot ? (
                                    <Box className="DotBox-main-wrapper">
                                      <Box className="DotBox-inner">
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Box>
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon icon={faTrash} /> Remove
                                        </Box>
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon icon={faDownload} /> Export
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
