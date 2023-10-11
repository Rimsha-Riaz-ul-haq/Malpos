import React,{useState} from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "../../components/elements";
import {
  faMinus,
  faSearch,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Payroll() {
  const [open, Close] = useState(false);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
          <Col md={12}>
              <div className="d-flex justify-content-between align-items-center">
                <h5>PayRoll</h5>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>{" "}
              </div>           
          </Col>
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
                    <Col md={9} className="col-9-checkbox">
                      <Box className={"h-checkBox-payroll"}>
                        <Form.Check
                        style={{fontSize:"0.7rem", marginLeft:"0.5rem"}}
                          type="checkbox"
                          label="Show Deleted Accounts"
                        />
                      </Box>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Table className="payroll-table" responsive>
                    <thead  style={{backgroundColor:'#F07632',color:"white"}}>
                      <tr>
                        <th className="th-w15">Username</th>
                        <th className="th-w15">Role</th>
                        <th className="th-w15">
                          Transaction
                          <br />
                        </th>
                        <th className="th-w15 text-end">
                          Total Paid
                          <br />
                          <span style={{color:'red'}} >0.3345 SAR</span>
                        </th>
                        <th className="th-w10 text-end">
                          Salary
                          <br />
                          <span style={{color:'red'}} >0.3345 SAR</span>
                        </th>
                        <th className="th-w10 text-end">
                          Bonus
                          <br />
                          <span style={{color:'red'}} >0.3345 SAR</span>
                        </th>
                        <th className="th-w10 text-end">
                          Paid Salary
                          <br />
                          <span style={{color:'red'}} >0.3345 SAR</span>
                        </th>
                        <th className="th-w10 text-end">Left Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
    <td>Abdulrahman</td>
    <td>Manager</td>
    <td>
      <Link className="link" to={"/payroll-transactions"}>
        Transaction
      </Link>
    </td>
    <td className="text-end">00.240 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
    <td className="text-end">0</td>
    <td className="text-end">0</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
  </tr>
  <tr>
    <td>JohnDoe</td>
    <td>Employee</td>
    <td>
      <Link className="link" to={"/payroll-transactions"}>
        Transaction
      </Link>
    </td>
    <td className="text-end">0.125 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
    <td className="text-end">0.050 SAR</td>
    <td className="text-end">0.075 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
  </tr>
  <tr>
    <td>MarySmith</td>
    <td>Employee</td>
    <td>
      <Link className="link" to={"/payroll-transactions"}>
        Transaction
      </Link>
    </td>
    <td className="text-end">0.180 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
    <td className="text-end">0.090 SAR</td>
    <td className="text-end">0.090 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
  </tr>
  <tr>
    <td>SusanJohnson</td>
    <td>Employee</td>
    <td>
      <Link className="link" to={"/payroll-transactions"}>
        Transaction
      </Link>
    </td>
    <td className="text-end">0.300 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
    <td className="text-end">0.150 SAR</td>
    <td className="text-end">0.150 SAR</td>
    <td className="text-end">
      <FontAwesomeIcon icon={faMinus} />
    </td>
  </tr>
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
