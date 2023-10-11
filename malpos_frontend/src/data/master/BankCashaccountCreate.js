import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function AccountCreate() {
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
        <Row >
          <Col md={12}>
            <CardLayout >
              <Row >
          <Col md={12}>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "500px" , fontSize:"1.1rem"}}>
                    <Link to="/accounts" style={{ color: "#edb213" }}>
                      Bank Cash Account
                    </Link>
                    /Create
                  </h3>
                </Box>
                <Box className="head-sec-rearrange-right">
                  <Box className="rearrange-right">
                    <Link to={"/accounts"} style={{ display: "block" }}>
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
                <Col md={11}  >
                  <Row >
                    <Col md={6}>
                      <Form.Label>Code</Form.Label>
                      <Form.Control
 style={{width:"60%", height:"45%"}}
className="m-0"
                        label="Code"
                        type="number"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                      style={{width:"60%", height:"35%", marginLeft:"25%"}}
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
                    <Col md={6}>
                      <Form.Label>Bank</Form.Label>
                      <Form.Control
style={{width:"60%",height:"55%"}}                        className="m-0"
                        label="Enter bank name"
                        type="text"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Account NO</Form.Label>
                      <Form.Control
                        className="m-0"
                        style={{width:"60%", height:"55%", marginLeft:"20%"}}
                        label="Account_No"
                        type="number"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>BBAN</Form.Label>
                      <Form.Control
                        className="m-0"
                        style={{width:"60%", height:"55%"}}   label="Enter BBAN No"
                        type="text"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>IBAN</Form.Label>
                      <Form.Control
                        className="m-0"
                        label="IBAN"
                        style={{width:"60%", height:"55%", marginLeft:"20%"}}
                        type="text"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Currency</Form.Label>
                      <Form.Control
                        className="m-0"
                        label="Currency"style={{width:"60%", height:"50%"}}
                        type="number"
                        required
                      />
                    </Col>
                    <Col md={6}  mdOffset={2} style={{ height:"55%"}} >
                      <LabelFieldS
                      style={{width:"60%"}}
                        label="Account Type"
                        option={[
                          { label: "Cash", value: null },
                          { label: "Card", value: null },
                          { label: "Bank", value: null },
                        ]}
                       // fieldSize="w-100 h-md"
                      />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label>Current_Balance</Form.Label>
                      <Form.Control
                        className="m-0"
                        label="Balance"
                        type="number" style={{width:"60%", height:"55%"}}
                        required
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
