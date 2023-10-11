import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { CardLayout } from "../cards";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../elements";
import { useProduct } from "./productContext";
import axiosInstance from "../../api/baseUrl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap/esm";
import { toast } from "react-toastify";
import Select from "react-select";

const SelectModifiers = () => {
  const {
    modifiers,
    setModifiers,
    selectedModifier,
    setSelectedModifier,
    onSelectExistingModifier,
    updateProductModifiers,
  } = useProduct();

  const [showModal, setShowModal] = useState(false);
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    cd_client_id: "1",
    cd_brand_id: "1",
    cd_branch_id: "1",
    is_active: "1",
    name: "",
    min_select: "",
    max_select: "",
    modifier_type: "",
    created_by: "1",
    updated_by: "1",
    submodifierData: [],
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: name,
      min_select: minNumber,
      max_select: maxNumber,
      modifier_type: selectedOption,
    });
  }, [name, minNumber, maxNumber, selectedOption]);

  const handleRadioChange = (e) => setSelectedOption(e.target.value);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/modifier_store`, formData);
      if (response.data && response.data.newModifierId) {
        updateProductModifiers(response.data.newModifierId);
      }
      toast.success("Modifier created successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Error creating modifier");
    }
  };

  return (
    <Row>
      <Col cl={12}>
        <CardLayout>
          <Box className="head-sec-rearrange">
            <Box className="head-sec-rearrange-left">
              <h3>Modifier</h3>
            </Box>
          </Box>
        </CardLayout>
      </Col>

      <Col md={12}>
        <CardLayout>
          <Row>
            <Col md={3}>
              <Box className="station-right-btn d-flex">
                <button
                  style={{ backgroundColor: "#f29b30" }}
                  onClick={handleOpenModal}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Modifier set
                </button>
              </Box>
            </Col>
          </Row>
        </CardLayout>
      </Col>

      {/* Table to display selected modifier */}
      <Col md={12}>
        <CardLayout>
          <Row>
            <Col md={12}>
              <h4>Selected Modifiers</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    {/* Add additional headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {selectedModifier && (
                    <tr>
                      <td>{selectedModifier.value}</td>
                      <td>{selectedModifier.label}</td>
                      {/* Add additional cells as needed */}
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
        </CardLayout>
      </Col>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Modifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="modifier">Select Modifier</label>
              <Select
                id="modifier"
                options={modifiers}
                onChange={(option) => {
                  setSelectedModifier(option);
                  onSelectExistingModifier(option);
                }}
              />
            </div>
            {selectedModifier &&
              selectedModifier.value == "create_new_modifier" && (
                <>
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <p className="min-description">
                        How many modifiers can be chosen <br /> at the same
                        time:
                      </p>
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="One"
                        name="One"
                        value="One"
                        checked={selectedOption === "One"}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor="option1">
                        One
                        <p className="radio-description">
                          Choose one option from several. For example, pizza
                          diameter.
                        </p>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="several"
                        name="several"
                        value="several"
                        checked={selectedOption === "several"}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor="several">
                        Several
                        <p className="radio-description">
                          Any number in the given range. For example, toppings
                          on a pizza.
                        </p>
                      </label>
                    </div>
                  </div>

                  {selectedOption === "several" && (
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="minInput" className="form-label">
                          Min
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="minInput"
                          value={minNumber}
                          onChange={(e) => setMinNumber(e.target.value)}
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="maxInput" className="form-label">
                          Max
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="maxInput"
                          value={maxNumber}
                          onChange={(e) => setMaxNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              if (
                selectedModifier &&
                selectedModifier.value !== "create_new_modifier"
              ) {
                onSelectExistingModifier(selectedModifier);
                setShowModal(false); // Close the modal
              } else {
                handleSubmit(e);
              }
            }}
          >
            {selectedModifier &&
            selectedModifier.value !== "create_new_modifier"
              ? "Add"
              : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default SelectModifiers;
