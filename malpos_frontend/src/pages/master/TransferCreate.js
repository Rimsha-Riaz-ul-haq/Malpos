import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import MultiSelectField from "../../components/fields/MultiSelectField";
import CalenderField from "../../components/fields/CalenderField";
import { LabelField } from "../../components/fields";
import CusField from "../../components/fields/CusField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { Box, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import IconSearchBar from "../../components/elements/IconSearchBar";
import CusLabelField from "../../components/fields/CusLabelField";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function TransferCreate() {
  const [open, close] = useState(false);
  const [show, setShow] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [numBoxes, setNumBoxes] = useState(1);
  const [boxId, setBoxId] = useState();
  const handleCloseGoods = () => setShow(false);
  const handleShowGoods = () => setShow(true);
  const Closehandle = () => {
    close(false);
  };
  const handleMultiSelect = () => {
    close(!open);
  };
  const handleAddBox = (id) => {
    const nextIndex = boxes.length;
    setBoxId(id);
    const newBox = (
      <Col md={12} key={boxId}>
        <Box className={"product-add-boxes"}>
          <Box className={"product"}>
            {" "}
            <LabelField option={["Select"]} fieldSize="w-100 h-md" />
          </Box>
          <Box className={"Unit"}>
            {" "}
            <LabelField option={["Select"]} fieldSize="w-100 h-md" />
          </Box>
          <Box className={"Qty"} style={{ backgroundColor: "#f0f0f0" }}>
            {" "}
            <CusField placeholder={"0"} type="number" />{" "}
          </Box>

          <Box className={"Xmark"}>
            {" "}
            <button onClick={() => handleRemoveBox(boxId)}>✖</button>
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
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>Transfer Create</CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={8}>
                  <Row>
                    <Col md={6} className="cus-col-mt">
                      <LabelField
                        label="From storage"
                        option={[
                          "Select form storage",
                          "Return",
                          "Bar storage",
                          "Back Store",
                        ]}
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={6} className="cus-col-mt">
                      <LabelField
                        label="Storage"
                        option={["Return", "Bar storage", "Back Store"]}
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={12} className="cus-col-mt">
                      <Row>
                        <Col md={6}>
                          <CalenderField label={"Opration time"} />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6} className="cus-col-mt">
                      <LabelField type={"text"} label={"Reason"} />
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Box className={"product-add-box"}>
                    <Box className={"product"}> Product</Box>
                    <Box className={"Unit"}> Unit</Box>
                    <Box className={"Qty"}> Qty</Box>

                    <Box className={"Xmark"}> </Box>
                  </Box>
                  <Box className={"product-add-boxes"}>
                    <Box className={"product"}>
                      {" "}
                      <LabelField option={["Select"]} fieldSize="w-100 h-md" />
                    </Box>
                    <Box className={"Unit"}>
                      {" "}
                      <LabelField option={["Select"]} fieldSize="w-100 h-md" />
                    </Box>
                    <Box
                      className={"Qty"}
                      style={{ backgroundColor: "#f0f0f0" }}
                    >
                      {" "}
                      <CusField placeholder={"0"} type="number" />{" "}
                    </Box>
                  </Box>
                </Col>
                <Col md={12}>
                  {boxes.map((box, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {box}
                      </div>
                    );
                  })}
                </Col>
                <Col md={12}>
                  <Box className={"tc-multiSel-btns"}>
                    <Button
                      onClick={handleMultiSelect}
                      className={" tc-multiSel-btn cus-icon-btn"}
                    >
                      <FontAwesomeIcon icon={faBars} /> Multi Select
                      {open ? (
                        <Box className={"tc-multiSel-Select-item-box"}>
                          <Box className={"tc-multiSel-Select-item-inner"}>
                            <Box
                              className={"tc-multiSel-Select-item-textfield"}
                            >
                              <IconSearchBar />
                            </Box>
                            <Box className={"tc-multiSel-Select-item-btns"}>
                              <Box>
                                <Button
                                  onClick={handleShowGoods}
                                  className={"tc-select-btn-outline"}
                                >
                                  Create Ingredients
                                </Button>
                                <Modal
                                  show={show}
                                  className={"goods-cre-model-wrapper"}
                                  onHide={handleCloseGoods}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Create Ingredient</Modal.Title>
                                  </Modal.Header>
                                  <Box className={"cre-goods-body-wrap"}>
                                    <Modal.Body>
                                      <Row>
                                        <Col md={12}>
                                          <CusField
                                            type={"text"}
                                            placeholder="Name"
                                          />
                                        </Col>
                                        <Col md={12}>
                                          <LabelField
                                            option={[
                                              "Select Category",
                                              "R TIS",
                                              "T TIS",
                                              "Tax Materials",
                                            ]}
                                            fieldSize="w-100 h-md"
                                          />
                                        </Col>
                                        <Col md={12}>
                                          <LabelField
                                            option={[
                                              "Select Unit",
                                              "Piece",
                                              "liter",
                                              "meter",
                                            ]}
                                            fieldSize="w-100 h-md"
                                          />
                                        </Col>
                                      </Row>
                                    </Modal.Body>
                                  </Box>
                                  <Modal.Footer className="model-footer">
                                    <Button
                                      className={"model-f-btn"}
                                      onClick={handleCloseGoods}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      className={" model-f-btn "}
                                      onClick={handleCloseGoods}
                                    >
                                      Cancel
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Box>
                              <Box>
                                <Button className={"tc-select-btn"}>
                                  Select All
                                </Button>
                                <Button
                                  onClick={Closehandle}
                                  className={"tc-select-btn"}
                                >
                                  Save
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Button>

                    <Button
                      className={"  cus-icon-btn-sc"}
                      onClick={() => handleAddBox(uuidv4)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Add{" "}
                    </Button>
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
