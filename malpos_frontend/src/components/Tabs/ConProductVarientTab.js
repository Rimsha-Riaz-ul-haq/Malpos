import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { LabelField } from "../fields";

import { Box } from "../elements";
import { FormLabel } from "react-bootstrap";
import { useState } from "react";
export default function ConProductVarientTab() {
  const [show, setShow] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [numBoxes, setNumBoxes] = useState(1);
  const [boxes, setBoxes] = useState([]);

  const showDetails = () => {
    setShow(!show);
  };
  const showBardetails = () => {
    setShowBar(false);
  };
  const handleAddBox = () => {
    const nextIndex = boxes.length;
    const newBox = (
      <Box key={nextIndex} className="product-varient-tab-main-textfield">
        <Box className="varient-tab-textfield varient-tab-main-name-textfield">
          <input type="text" />
        </Box>
        <Box className="varient-tab-textfield varient-tab-main-barcode-textfield">
          <input type="text" />
        </Box>
        <Box className="varient-tab-textfield varient-tab-main-cost-textfield">
          <input type="number" placeholder="0" />
        </Box>
        <Box className="varient-tab-textfield varient-tab-main-price-textfield">
          <input type="number" placeholder="0" />
        </Box>
      </Box>
    );
    setBoxes([...boxes, newBox]);
    setNumBoxes(numBoxes + 1);
  };

  const handleRemoveBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
    setNumBoxes(numBoxes - 1);
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <FormLabel>Has Variants</FormLabel>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onClick={showDetails}
                  />
                </Col>
                {show ? (
                  <div>
                    <Col md={12}>
                      <Box className="product-varient-tab-main">
                        <Box className="varient-tab varient-tab-main-name">
                          <FormLabel>Name</FormLabel>
                        </Box>
                        <Box className="varient-tab varient-tab-main-barcode">
                          <FormLabel>Barcode</FormLabel>
                        </Box>
                        <Box className=" varient-tab varient-tab-main-cost">
                          <FormLabel>Cost</FormLabel>
                        </Box>

                        <Box className="varient-tab varient-tab-main-price">
                          <FormLabel>Price</FormLabel>
                        </Box>
                      </Box>
                      {showBar ? (
                        <div>
                          <Box className="product-varient-tab-main-textfield">
                            <Box className="varient-tab-textfield varient-tab-main-name-textfield">
                              <input type="text" />
                            </Box>
                            <Box className="varient-tab-textfield varient-tab-main-barcode-textfield">
                              <input type="text" />
                            </Box>
                            <Box className="varient-tab-textfield varient-tab-main-cost-textfield">
                              <input type="number" placeholder="0" />
                            </Box>

                            <Box className="varient-tab-textfield varient-tab-main-price-textfield">
                              <input type="number" placeholder="0" />
                            </Box>
                            <button onClick={showBardetails}>
                              <img
                                style={{ height: "35px" }}
                                className="addproduct-btn"
                                src="/images/icons/close1.png"
                                alt="Close"
                              />
                            </button>
                          </Box>
                        </div>
                      ) : (
                        ""
                      )}
                      {boxes.map((box, index) => {
                        return (
                          <div
                            key={index}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {box}
                            <button onClick={() => handleRemoveBox(index)}>
                              <img
                                style={{ height: "35px", marginTop: "10px" }}
                                className="addproduct-btn"
                                src="/images/icons/close1.png"
                                alt="Close"
                              />
                            </button>
                          </div>
                        );
                      })}
                      <Box>
                        <button
                          className="varient-tab-main-textfield-btn"
                          onClick={handleAddBox}
                        >
                          + Add
                        </button>
                      </Box>
                    </Col>
                  </div>
                ) : (
                  ""
                )}
                <Col md={12}>
                  <Row>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Cost Price"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        label="Price"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
