import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";
import InputGroup from "react-bootstrap/InputGroup";

import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";
import { IconField, LabelTextarea, LabelField } from "../../components/fields";

export default function TransactionIncome() {
  const [dateTouched, setDateTouched] = useState(false);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const [categoryTouched, setCategoryTouched] = useState(false);
  // const nameInputRef = useRef(null);

  // useEffect(() => {
  //   nameInputRef.current.focus();
  // }, []);
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleDateBlur() {
    setDateTouched(true);
  }
 
  return (
    <Col md={12}>
      <Row>
        <Col md={11}>
          <Row>
          <Col md={4} style={{height:"10%"}}>
              <Form.Label   
                >Amount</Form.Label>
              <InputGroup   style={{ width:"80%" }}
                >
                <InputGroup.Text
                  className="bg-danger text-light fw-bold"
                  id="basic-addon1"
                 style={{width:"20%"}}
                  
                  >
                  ––
                </InputGroup.Text>
                <Form.Control
                    placeholder="Enter Amount"
                  //ref={nameInputRef}
                  label="Amount"
               
               />
              </InputGroup>
            </Col>

            <Col md={4}  style={{height:"10%"}}>
              <LabelFieldS
              style={{width:"80%"}}
label=" Account Type"
                option={[
                  { label: "Assets", value: null },
                  { label: "Liability", value: null },
                  { label: "Owner Equity", value: null },
                  { label: "Expense", value: null },
                  { label: "Revenue", value: null },
                ]}
                 />
            </Col>
            
            <Col md={4}   style={{height:"10%"}} >
              <Form.Label>Date</Form.Label>
              <Form.Control
                style={{width:"80%"}}
                className="m-0"
                label="calender"
                type="date"
                required
                value={date}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                isInvalid={dateTouched && date.trim() === ""}
              />
              <Form.Control.Feedback type="invalid">
                Must not be empty
              </Form.Control.Feedback>
            </Col>
            <Col md={4} style={{height:"10%"}} >
              <LabelFieldS
                label="Bank/Cash Account "
                placeholder="Bank Amount"
                style={{width:"80%"}}
                type="text"
  
              />
            </Col>
            <Col md={4} style={{height:"10%"}} >
              <LabelFieldS
                label="Accounts"
                placeholder="Accounts"
                type="text"
                style={{width:"80%"}}
              />
            </Col>
            <Col md={4} style={{height:"10%"}} >
              <LabelFieldS
                label="Empolyee"
                type="text"
                placeholder="Enter employee"
                style={{width:"80%"}}
              />
            </Col>
            <Col md={4}  style={{height:"10%"}} >
              <LabelFieldS
                label="Supplier"
                type="text"
                placeholder="Enter supplier"
                style={{width:"80%"}}
              />
            </Col>
            <Col md={4} style={{ height:"10%"}} >
              <LabelFieldS
                label="Customer"
                placeholder="Enter customer"
                type="text"
                style={{width:"80%"}}
              />
            </Col>
          </Row>
          <Col md={12}>
            <Box className="head-sec-rearrange-right">
              <Box className="rearrange-right">
                <Link
                  to={"/transactions"}
                  style={{ display: "block", marginTop: "15px" }}
                >
                  {" "}
                  <button className="head-sec-rearrange-btn">
                    <FontAwesomeIcon icon={faCheck} />
                    &nbsp; Save
                  </button>
                </Link>
              </Box>
            </Box>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}
