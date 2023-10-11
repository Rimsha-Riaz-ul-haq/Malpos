import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { LabelField } from "../fields";
import { Box, Label } from "../elements";
import { InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { faBars, faPlus, faAngleDown } from "@fortawesome/free-solid-svg-icons";
export default function ConDishRecipeTab() {
  const [multiSelect, setMultiSelect] = useState(false);
  const [singleSelect, setSingleSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalIng, setShowModalIng] = useState(false);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [numBoxes, setNumBoxes] = useState(1);
  const [boxId, setBoxId] = useState();
  const handleShowModal = () => {
    setShowModal(true);
  };
  console.log(boxes);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCreateIngShow = () => {
    setShowModalIng(true);
  };
  const handleCreateIngClose = () => {
    setShowModalIng(false);
  };
  const handleMultiSelectShow = () => {
    setMultiSelect(!multiSelect);
  };
  const handlSingle = () => {
    setSingleSelect(!singleSelect);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setUnit("");
    } else if (e.target.value >= 1000) {
      setUnit("kg");
    } else {
      setUnit("g");
    }
  };
  console.log(boxId);
  ////////////Logic add box/////////////////
  const handleAddBox = (id) => {
    const nextIndex = boxes.length;
    setBoxId(id);
    const newBox = (
      <Col md={12} key={boxId}>
        <Box
          className="cons-dish-receipe-t-details-box"
          style={{ padding: "0px" }}
        >
          <Box className="dish-receipe-t-details-inputs  ingre-details-input">
            <div onClick={handlSingle}>
              <Box className="ingre-details-input-box">
                <Box className="ingre-details-input-val">Fried Rice</Box>
                <Box>
                  <FontAwesomeIcon icon={faAngleDown} />
                </Box>
              </Box>
            </div>
          </Box>
          <Box className="dish-receipe-t-details-inputs">
            <Box className="input-t-details-inputs">
              <InputGroup>
                <FormControl
                  placeholder="0"
                  onChange={handleChange}
                  value={value}
                />
                {unit === "g" && <InputGroup.Text>g</InputGroup.Text>}
                {unit === "kg" && <InputGroup.Text>kg</InputGroup.Text>}
                {unit === "" && <InputGroup.Text>0</InputGroup.Text>}
              </InputGroup>
            </Box>
          </Box>
          <Box className="dish-receipe-t-details-inputs">
            <Box className="input-t-details-inputs">
              <InputGroup>
                <FormControl
                  placeholder="0"
                  // className="bor-none"
                  onChange={handleChange}
                  // disabled
                />
                <InputGroup.Text className="bor-none">Kg</InputGroup.Text>
              </InputGroup>
            </Box>
          </Box>
          <Box className="dish-receipe-t-details-inputs">
            <Box className="input-t-details-inputs">
              <InputGroup>
                <FormControl
                  placeholder="0"
                  // className="bor-none"
                  onChange={handleChange}
                  // disabled
                />
                <InputGroup.Text className="bor-none">SAR</InputGroup.Text>
              </InputGroup>
            </Box>
          </Box>
        </Box>
      </Col>
    );
    setBoxes([...boxes, newBox]);
    setNumBoxes(numBoxes + 1);
  };

  const handleRemoveBox = (id) => {
    setBoxes(boxes.filter((box) => box.key !== id));
    setNumBoxes(numBoxes - 1);
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Box className="cons-dish-receipe-ingre-box">
            <Box className="dish-receipe-ast-box-item  ingre-box-item">
              Ingredients
            </Box>
            <Box className="dish-receipe-ast-box-item">Gross</Box>
            <Box className="dish-receipe-ast-box-item">Gross Weight, Kg</Box>
            <Box className="dish-receipe-ast-box-item">Cost</Box>
          </Box>
        </Col>
        <Col md={12} className="cons-dish-receipe-t-details-box-wrap m-0">
          <Box
            className="cons-dish-receipe-t-details-box"
            style={{ padding: "0px", marginTop: "10px" }}
          >
            <Box className="dish-receipe-t-details-inputs  ingre-details-input">
              <div onClick={handlSingle}>
                <Box className="ingre-details-input-box">
                  <Box className="ingre-details-input-val">Fried Rice</Box>
                  <Box>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Box>
                </Box>
              </div>
            </Box>
            <Box className="dish-receipe-t-details-inputs">
              <Box className="input-t-details-inputs">
                <InputGroup>
                  <FormControl
                    placeholder="0"
                    onChange={handleChange}
                    value={value}
                  />
                  {unit === "g" && <InputGroup.Text>g</InputGroup.Text>}
                  {unit === "kg" && <InputGroup.Text>kg</InputGroup.Text>}
                  {unit === "" && <InputGroup.Text>0</InputGroup.Text>}
                </InputGroup>
              </Box>
            </Box>
            <Box className="dish-receipe-t-details-inputs">
              <Box className="input-t-details-inputs">
                <InputGroup>
                  <FormControl
                    placeholder="0"
                    // className="bor-none"
                    onChange={handleChange}
                    // disabled
                  />
                  <InputGroup.Text className="bor-none">Kg</InputGroup.Text>
                  {/* {unit === 'g' && <InputGroup.Text>g</InputGroup.Text>}
                                    {unit === 'kg' && <InputGroup.Text>kg</InputGroup.Text>}
                                    {unit === '' && <InputGroup.Text>0</InputGroup.Text>} */}
                </InputGroup>
              </Box>
            </Box>
            <Box className="dish-receipe-t-details-inputs">
              <Box className="input-t-details-inputs">
                <InputGroup>
                  <FormControl
                    placeholder="0"
                    // className="bor-none"
                    onChange={handleChange}
                    // disabled
                  />
                  <InputGroup.Text className="bor-none">SAR</InputGroup.Text>
                  {/* {unit === 'g' && <InputGroup.Text>g</InputGroup.Text>}
                                    {unit === 'kg' && <InputGroup.Text>kg</InputGroup.Text>}
                                    {unit === '' && <InputGroup.Text>0</InputGroup.Text>} */}
                </InputGroup>
              </Box>
            </Box>
            {/* <Box className="xmark-r ">
              <FontAwesomeIcon icon={faXmark} />
            </Box> */}
          </Box>
          {singleSelect ? (
            <Row>
              <Col md={8}>
                <Row>
                  <Col
                    md={8}
                    className="multi-select-box-col single-select-box"
                  >
                    <Box className="multi-select-box">
                      <Box className="multi-select-box-inner">
                        <Row>
                          <Col md={6} className="p-0">
                            <p>Ingredients</p>
                            <Box className="multi-select-box-left">
                              <Box className="multi-select-box-left-items">
                                <span>9OZ - كوب ورقي</span>
                                <span id="multi-select-box-items-span">
                                  Pcs
                                </span>
                              </Box>
                              <Box className="multi-select-box-left-items">
                                <span>9OZ - كوب ورقي</span>
                                <span id="multi-select-box-items-span">
                                  Pcs
                                </span>
                              </Box>
                            </Box>
                          </Col>
                          <Col md={6} className="p-0">
                            <p>Ingredients</p>

                            <Box className="multi-select-box-right">
                              <Box className="multi-select-box-right-items">
                                <span>9OZ - كوب ورقي</span>
                                <span id="multi-select-box-items-span">
                                  Pcs
                                </span>
                              </Box>
                            </Box>
                          </Col>
                          <Col md={12}>
                            <Box className="single-select-box-btn">
                              <Box className="multi-select-box-btn-left">
                                <div onClick={handleCreateIngShow}>
                                  Create new Ingredients
                                </div>
                                <Modal
                                  show={showModalIng}
                                  onHide={handleCreateIngClose}
                                  top
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "13px" }}>
                                      Create new set
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Box className="modifier-main-popup">
                                      <LabelField
                                        label="Name"
                                        placeholder="Name"
                                        type="text"
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                      <LabelField
                                        label="Accounting Category"
                                        placeholder="Accounting Category"
                                        option={[
                                          "Sea food",
                                          "Expresso",
                                          "Ice drink",
                                          "Pizza",
                                        ]}
                                        fieldSize="w-100 h-md f-cus-13"
                                      />{" "}
                                      <LabelField
                                        label="Category"
                                        placeholder="Category"
                                        option={[
                                          "Sea food",
                                          "Expresso",
                                          "Ice drink",
                                          "Pizza",
                                        ]}
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                      <LabelField
                                        label="Units"
                                        type="text"
                                        placeholder="Units"
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                    </Box>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button onClick={handleCloseModal}>
                                      Add
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Box>
                              <Box className="multi-select-box-btn-right">
                                <div onClick={handleShowModal}>
                                  Create new Preparation
                                </div>
                                <Modal
                                  show={showModal}
                                  onHide={handleCloseModal}
                                  top
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "13px" }}>
                                      Create new set
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Box className="modifier-main-popup">
                                      <LabelField
                                        label="Name"
                                        placeholder="Name"
                                        type="text"
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                      <LabelField
                                        label="Accounting Category"
                                        placeholder="Accounting Category"
                                        option={[
                                          "Sea food",
                                          "Expresso",
                                          "Ice drink",
                                          "Pizza",
                                        ]}
                                        fieldSize="w-100 h-md f-cus-13"
                                      />{" "}
                                      <LabelField
                                        label="Category"
                                        placeholder="Category"
                                        option={[
                                          "Sea food",
                                          "Expresso",
                                          "Ice drink",
                                          "Pizza",
                                        ]}
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                      <LabelField
                                        label="Units"
                                        type="text"
                                        placeholder="Units"
                                        fieldSize="w-100 h-md f-cus-13"
                                      />
                                      <Label>Description</Label>
                                      <textarea
                                        style={{ fontSize: "12px" }}
                                        className="form-control"
                                        rows={3}
                                      ></textarea>
                                    </Box>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    {boxes.map((box, index) => {
                                      return (
                                        <div
                                          key={index}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "25px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexGrow: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            {box}
                                          </div>
                                          <button
                                            onClick={() =>
                                              handleRemoveBox(index)
                                            }
                                            style={{ marginBottom: "30px" }}
                                          >
                                            ✖
                                          </button>
                                        </div>
                                      );
                                    })}
                                    <Button onClick={handleCloseModal}>
                                      Add
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Box>
                            </Box>
                          </Col>
                        </Row>
                      </Box>
                    </Box>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Row>
                {boxes.map((box, index) => {
                  return (
                    <div
                      key={box.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // marginTop: "25px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexGrow: 1,
                          marginRight: "10px",
                        }}
                      >
                        {box}
                      </div>
                      <button onClick={() => handleRemoveBox(box.key)}>
                        ✖
                      </button>
                    </div>
                  );
                })}
                <Col md={8}>
                  <Row>
                    <Col md={4}>
                      <p className="con-dish-total-p">Total : </p>
                    </Col>
                    <Col md={4}>
                      <p className="con-dish-total-p">0.0000 Kg : </p>
                    </Col>
                  </Row>
                </Col>
                <Box className="dish-tab-main-btn">
                  <button
                    onClick={handleMultiSelectShow}
                    className="dish-tab-main-textfield-btn"
                  >
                    <FontAwesomeIcon icon={faBars} /> Multi Select
                  </button>

                  <button
                    className="dish-tab-main-textfield-btn"
                    onClick={() => handleAddBox(uuidv4)}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                  {multiSelect ? (
                    <Col md={12} className="multi-select-box-col">
                      <Box className="multi-select-box">
                        <Box className="multi-select-box-inner">
                          <Row>
                            <Col md={12}>
                              <LabelField
                                type="search"
                                placeholder="search ..."
                                fieldSize="w-100 h-md f-cus-13"
                              />
                            </Col>
                            <Col md={6} className="p-0">
                              <p>Ingredients</p>
                              <Box className="multi-select-box-left">
                                <Box className="multi-select-box-left-items">
                                  <span>9OZ - كوب ورقي</span>
                                  <span id="multi-select-box-items-span">
                                    Pcs
                                  </span>
                                </Box>
                                <Box className="multi-select-box-left-items">
                                  <span>9OZ - كوب ورقي</span>
                                  <span id="multi-select-box-items-span">
                                    Pcs
                                  </span>
                                </Box>
                              </Box>
                            </Col>
                            <Col md={6} className="p-0">
                              <p>Ingredients</p>

                              <Box className="multi-select-box-right">
                                <Box className="multi-select-box-right-items">
                                  <span>9OZ - كوب ورقي</span>
                                  <span id="multi-select-box-items-span">
                                    Pcs
                                  </span>
                                </Box>
                              </Box>
                            </Col>
                            <Col md={12}>
                              <Box className="multi-select-box-btn">
                                <Box className="multi-select-box-btn-create-ingre">
                                  <button onClick={handleShowModal}>
                                    Create Ingredients
                                  </button>
                                  <Modal
                                    show={showModal}
                                    onHide={handleCloseModal}
                                    top
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title style={{ fontSize: "13px" }}>
                                        Create new set
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <Box className="modifier-main-popup">
                                        <LabelField
                                          label="Accounting Category"
                                          option={[
                                            "Sea food",
                                            "Expresso",
                                            "Ice drink",
                                            "Pizza",
                                          ]}
                                          fieldSize="w-100 h-md f-cus-13"
                                        />{" "}
                                        <LabelField
                                          label="Category"
                                          option={[
                                            "Sea food",
                                            "Expresso",
                                            "Ice drink",
                                            "Pizza",
                                          ]}
                                          fieldSize="w-100 h-md f-cus-13"
                                        />
                                        <LabelField
                                          label="Name"
                                          type="text"
                                          placeholder="Name"
                                          fieldSize="w-100 h-md f-cus-13"
                                        />
                                        {/* again push */}
                                      </Box>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button onClick={handleCloseModal}>
                                        Add
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </Box>
                                <Box className="multi-select-box-btn-save">
                                  <button>Select All</button>
                                  <button className="multi-select-box-btn-save-save">
                                    Save
                                  </button>
                                </Box>
                              </Box>
                            </Col>
                          </Row>
                        </Box>
                      </Box>
                    </Col>
                  ) : (
                    ""
                  )}
                </Box>
                <Col md={4}>
                  <LabelField
                    label="Week"
                    option={["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"]}
                    fieldSize="w-100 h-md"
                  />
                </Col>
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
