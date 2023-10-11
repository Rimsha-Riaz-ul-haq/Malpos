import React, { useState } from "react";
import { LabelField } from "../fields";
import { Col, Row, Table, Form } from "react-bootstrap";
import { Box } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ManageModifierGenTab({ data }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [imgfile, setImgFile] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [numBoxes, setNumBoxes] = useState(1);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const option = [
    "Select",
    "Sea food",
    "Expresso",
    "Ice drink",
    "Pizza",
    "cold coffee",
  ];
  const options = option.map((item, i) => {
    return item;
  });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImgFile([...imgfile, reader.result]);
    };

    reader.readAsDataURL(file);
  };
  const handleImageRemove = (index) => {
    const newImgFile = [...imgfile];
    newImgFile.splice(index, 1);
    setImgFile(newImgFile);
  };
  /////////logic add box/////////
  const handleAddBox = () => {
    const nextIndex = boxes.length;
    const newBox = (
      <Col md={12}>
        <Box className="manage-modifier-gen-box">
          <Box className="manage-modifier-gen-box-inner-textfield">
            <Box className=" modifier-gen-box-items modifier-gen-box-mod">
              <LabelField
                option={options}
                fieldSize="w-100 h-md"
                onChange={handleOptionChange}
              />
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-name">
              <LabelField
                type="text"
                fieldSize="w-100 h-md"
                value={selectedOption}
              />
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-img">
              <Form>
                <Form.Group controlId="formFile">
                  {/* <Form.Label>Image</Form.Label> */}
                  <Box
                    className="pl-img"
                    style={{ height: "40px", width: "40px" }}
                  >
                    {imgfile.length === 0 ? (
                      <>
                        <input
                          style={{ fontSize: "11px", marginTop: "8px" }}
                          type="file"
                          id="fileInput"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleImageUpload}
                        />
                      </>
                    ) : (
                      <>
                        {imgfile.map((elem, index) => (
                          <span key={elem} style={{ display: "block" }}>
                            <button
                              onClick={() => handleImageRemove(index)}
                              style={{
                                float: "right",
                                marginBottom: "5px",
                              }}
                            >
                              ✖
                            </button>
                            <img
                              src={elem}
                              height="100"
                              width="100"
                              alt="med1"
                              style={{
                                float: "left",
                                marginLeft: "13px",
                                height: "33px",
                              }}
                            />
                          </span>
                        ))}
                      </>
                    )}
                  </Box>
                </Form.Group>
              </Form>
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-gross">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>
            <Box
              className="modifier-gen-box-items modifier-gen-box-def"
              style={{ marginLeft: "40px", marginTop: "10px" }}
            >
              <Form.Check type="radio" aria-label="radio 1" />
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-cp">
              0 SAR
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-price">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>
            {/* <Box className="modifier-gen-box-items modifier-gen-box-xmart">
            <FontAwesomeIcon icon={faXmark} />
          </Box> */}
          </Box>
        </Box>
      </Col>
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
      <Col md={12}>
        <Row>
          <Col md={4}>
            <LabelField
              label="Name"
              type="text"
              fieldSize="w-100 h-md"
              placeholder={data.heading}
            />
          </Col>

        </Row>
      </Col>
    </div>
  );
}
