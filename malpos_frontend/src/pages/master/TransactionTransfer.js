import React, { useState, useEffect, useRef } from "react";
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

export default function TransactionTransfer() {
  const [dateTouched, setDateTouched] = useState(false);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const [categoryTouched, setCategoryTouched] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleDateBlur() {
    setDateTouched(true);
  }
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCategoryBlur = () => {
    setCategoryTouched(true);
  };
  useEffect(() => {
    setCategoryTouched(true);
  }, []);
  return (
    <Col md={12}>
      <Row>
        <Col md={11}>
          <Row>
            <Col md={6}>
              <Form.Label>Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text
                  className="bg-secondary text-light fw-bold"
                  id="basic-addon1"
                  style={{ height: "39px", marginTop: "-1px" }}
                >
                  ⇆
                </InputGroup.Text>
                <Form.Control
                  placeholder=""
                  label="Amount"
                  ref={nameInputRef}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
            <Col md={6} style={{marginTop:"1.8rem"}} >
              <LabelFieldS
                label="From Balance"
                required
                value={category}
                onChange={handleCategoryChange}
                onBlur={handleCategoryBlur}
                isInvalid={
                  categoryTouched && category === "Select From Balance"
                }
                option={[
                  { label: "Select From Balance", value: null },
                  { label: "Cash", value: null },
                  { label: "Card account", value: null },
                  { label: "Bank account", value: null },
                  { label: "Safe", value: null },
                ]}
                fieldSize="w-100 h-md"
              />
              <Form.Control.Feedback type="invalid">
                Must select a category
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <LabelFieldS
                label=" Balance"
                option={[
                  { label: "Select Balance", value: null },
                  { label: "Cash", value: null },
                  { label: "Card account", value: null },
                  { label: "Bank account", value: null },
                  { label: "Safe", value: null },
                ]}
                fieldSize="w-100 h-md"
              />
            </Col>

            <Col md={6} style={{marginTop:"1.2rem"}} >
              <Form.Label>Oprerated at</Form.Label>
              <Form.Control
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

            <Col md={6}>
              <LabelTextarea
                label="Description"
                fieldSize="w-100 h-text-sm"
                labelDir="label-col"
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
