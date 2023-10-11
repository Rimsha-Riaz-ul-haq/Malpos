import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEdit,
  faPlus,
  faTrash,
  faSearch,
  faPepperHot,
  faBowlRice,
} from "@fortawesome/free-solid-svg-icons";
import { CardLayout } from "../cards";
import PageLayout from "../../layouts/PageLayout";
import { Table, Thead, Tr, Tbody, Th, Td } from "../elements/Table";
import { Box } from "../elements";
import instance from "../../api/baseUrl";
import { useProduct } from "./productContext";

const CreateRecipe = () => {
  const {
    ingredients,
    totalGrossWeight,
    deletingMethod,
    isLoading,
    allOptions,
    setIngredients,
    setTotalGrossWeight,
    setAllOptions,
    seDeletingMethod,
    setIsLoading,
    handleDeletingMethodChange,
    handleGrossWeightChange,
    handleSelectChange,
    updateProductDetail,
    calculateCostPrice,
    handleSubmit,
    form,
  } = useProduct();

  const deletingOptions = [
    { value: "write_off_ready_item", label: "Write off ready item" },
    { value: "write_off_ingredient", label: "Write off ingredient" },
  ];

  // const handleDeletingMethodChange = (selectedOption) => {
  //   setDeletingMethod(selectedOption);
  // };

  const handleDeleteRow = (indexToDelete) => {
    // Remove the ingredient at the given index
    const filteredIngredients = ingredients.filter(
      (_, index) => index !== indexToDelete
    );

    // Update the ingredients state
    setIngredients(filteredIngredients);
  };
  useEffect(() => {
    console.log(allOptions, "update");
    console.log(form.product_detail, "update===");
  });
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white", // or any other color
    }),
  };

  const formatOptionLabel = ({ label, type }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon
        icon={type === "ingredient" ? faPepperHot : faBowlRice}
        style={{ marginRight: "8px", color: "#f07632" }}
      />
      {label}
    </div>
  );

  const addNewRow = () => {
    setIngredients([...ingredients, { ingredient: null }]);
  };

  return (
    <Row>
      <Col md={12}>
        <CardLayout>
          <Box className="head-sec-rearrange">
            <Box className="head-sec-rearrange-left">
              <h3>Recipes</h3>
            </Box>
          </Box>
        </CardLayout>
      </Col>

      <Col md={12}>
        <CardLayout>
          <Row>
            <Col md={10}>
              <Row>
                <Col md={3}></Col>
              </Row>
            </Col>
            <Col md={2}>
              <Box className="station-right-btn">
                <button onClick={addNewRow}>
                  <FontAwesomeIcon icon={faPlus} /> Add Row
                </button>
              </Box>
            </Col>
          </Row>
          <Col md={12}>
            <Box className="mc-table-responsive">
              <Col md={12}>
                <Row>
                  <Col md={12}>
                    <Table className="mc-table product">
                      <Thead className="mc-table-head">
                        <Tr>
                          <Th className="text-center">Ingredient </Th>
                          <Th className="text-center">Type</Th>
                          <Th className="text-center">Gross</Th>
                          {/* <Th className="text-center">Gross weight kg</Th> */}
                          <Th className="text-center">Cost</Th>
                          <Th className="text-center">Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody className="mc-table-body even text-center">
                        {ingredients.map((ing, index) => (
                          <Tr key={index}>
                            <Td>
                              <Select
                                value={ing.ingredient}
                                onChange={(e) => handleSelectChange(e, index)}
                                options={allOptions}
                                formatOptionLabel={formatOptionLabel}
                                menuPortalTarget={document.body}
                                styles={customStyles}
                              />
                            </Td>
                            <Td>
                              {ing.type === "ingredient"
                                ? "Ingredient"
                                : ing.type === "preparation"
                                ? "Preparation"
                                : ""}
                            </Td>

                            <Td>
                              <input
                                type="number"
                                value={ing.gross}
                                onChange={(e) =>
                                  handleGrossWeightChange(e, index)
                                }
                                style={{
                                  borderRadius: "12px",
                                  padding: "8px",
                                  border: "1px solid #ccc",
                                  width: "100px",
                                }}
                              />
                            </Td>
                            <Td>{calculateCostPrice(ing).toFixed(2)}</Td>
                            <Td>
                              <Box
                                style={{ cursor: "pointer" }}
                                className="px-2 text-center"
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  color="#ee3432"
                                  onClick={() => handleDeleteRow(index)}
                                />
                              </Box>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Box>
          </Col>
          <Row className="mt-4  justify-content-between">
            <Col md={3}>
              <label>Deleting Method</label>
              <Select
                value={deletingMethod}
                onChange={handleDeletingMethodChange}
                options={deletingOptions}
              />
            </Col>

            <Col md={3} className="pt-2">
              <label>Total Weight</label>
              <input
                readOnly
                type="number"
                name="totalGrossWeight"
                value={totalGrossWeight}
                style={{
                  borderRadius: "12px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  width: "100px",
                }}
              />
            </Col>
          </Row>
        </CardLayout>
      </Col>
    </Row>
  );
};

export default CreateRecipe;
