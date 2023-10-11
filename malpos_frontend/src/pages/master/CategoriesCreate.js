import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";

import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function CategoriesCreate() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleNameBlur() {
    setNameTouched(true);
  }
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
          <Col md={12}>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "500px", fontSize:"1.1rem" }}>
                    <Link to="/account-categories" style={{ color: "#edb213" }}>
                      Categories
                    </Link>
                    /Create
                  </h3>
                </Box>
                <Box className="head-sec-rearrange-right">
                  <Box className="rearrange-right">
                    <Link
                      to={"/account-categories"}
                      style={{ display: "block" }}
                    >
                      {" "}
                      <button className="head-sec-rearrange-btn">
                        <FontAwesomeIcon icon={faCheck} />
                        &nbsp; Save
                      </button>
                    </Link>
                  </Box>
                </Box>
              </Box>
          </Col>
                <Col md={11}>
                  <Row>
                    <Col md={6}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        className="m-0"
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        isInvalid={nameTouched && name.trim() === ""}
                        ref={nameInputRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        Must not be empty
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} style={{marginTop:"1.8rem"}} >
                      <LabelFieldS
                        label=" Type"
                        option={[
                          { label: "Income", value: null },
                          { label: "Expense", value: null },
                          { label: "Both", value: null },
                        ]}
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={6}>
                      <LabelFieldS
                        label=" Parent Category"
                        option={[
                          { label: "Select  Parent category" },
                          { label: "-- Customer Payment", value: null },
                          { label: "Other expenses", value: null },
                          { label: "Supplies", value: null },
                          { label: "--Refund", value: null },
                        ]}
                        fieldSize="w-100 h-md"
                      />
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
