import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Import the styles

import { CardLayout } from "../../components/cards";
import { Button, Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import MultiSelectFieldCustom from "../../components/fields/MultiSelectFieldCustom";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";

const CreatePreparation = () => {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalGrossWeight, setTotalGrossWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const validationSchema = yup.object().shape({
    cd_client_id: yup.array().min(1, "Client is required"),
    cd_brand_id: yup.array().min(1, "Brand is required"),
    cd_branch_id: yup.array().min(1, "Branch is required"),
    name: yup.string().required("Prepartion name is required"),
  });

  const formik = useFormik({
    initialValues: {
      cd_client_id: [],
      cd_brand_id: [],
      cd_branch_id: [],
      md_ingredient_category_id: [],
      total_weight: totalGrossWeight,
      total_cost: totalCost,
      ingredients: [],
      is_active: 1,
      name: "",
      gross: "",
      gross_weight: "",
      gross_cost: "",
      description: "",
      recipe_output: "",
      recipe_output_value: "",
      recipe_output_unit: "",
      deleting_method: "",
      created_by: "1",
      updated_by: "1",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const {
        recipe_output_value,
        recipe_output_unit,
        gross,
        gross_weight,
        gross_cost,
        ...apiValues
      } = values;

      const processedValues = {
        ...apiValues,
        cd_client_id: apiValues.cd_client_id.join(","),
        cd_brand_id: apiValues.cd_brand_id.join(","),
        cd_branch_id: apiValues.cd_branch_id.join(","),
        md_ingredient_category_id:
          apiValues.md_ingredient_category_id.join(","),
        ingredients: selectedIngredients.map((ingredient) => ({
          md_ingredient_id: ingredient.md_ingredient_id,
          //   name: ingredient.name,
        })),
      };

      if (location.state?.id) {
        try {
          const res = await axiosInstance.post(
            `preparation_update/${location.state.id}`,
            processedValues
          );

          toast.success("Preparation updated successfully", {
            autoClose: 5000,
          });
        } catch (error) {
          toast.error("Error updating ingredient");
        }
      } else {
        try {
          const res = await axiosInstance.post(
            "/preparation_store",
            processedValues
          );

          toast.success("Preparation created successfully", {
            autoClose: 5000,
          });
        } catch (error) {
          toast.error(error.message, { autoClose: 5000 });
        }
      }
    },
  });
  const { setValues } = formik;

  const location = useLocation();

  const deleteMethodsOptions = [
    { value: "Write off ingredients", label: "Write off ingredients" },
    { value: "Write off ready item", label: "Write off ready item" },
  ];

  const unitOptions = [
    { value: "ml", label: "ml" },
    { value: "g", label: "g" },
    // ... add more units if needed
  ];

  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({ label: item[nameKey], value: item[idKey] }));

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclient");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIngredientCategories = async () => {
    try {
      const res = await axiosInstance.get("/ingredient_category");
      const formattedData = formatData(
        res.data.data,
        "md_ingredient_category_id"
      );
      setIngredientCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const res = await axiosInstance.get("/ingredient");
      console.log(res);
      const formattedData = formatData(res.data.data, "md_ingredient_id");
      setIngredients(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPreparationData = async (id) => {
    try {
      const res = await axiosInstance.get(`/preparation_edit/${id}`);
      console.log(res.data);
      const {
        cd_client_id,
        cd_brand_id,
        cd_branch_id,
        md_ingredient_category_id,
        name,
        description,
        preparation_ingredient: fetchedIngredients,
        recipe_output,
        deleting_method,
        is_active,
      } = res.data[0];

      // Map the fetchedIngredients to a simpler structure for use in your form/state
      const mappedIngredients = fetchedIngredients.map((ingredientData) => {
        return {
          ...ingredientData.ingredient,
          md_preparation_ingredient_id:
            ingredientData.md_preparation_ingredient_id,
        };
      });
      formik.setValues({
        cd_client_id: [cd_client_id],
        cd_brand_id: [cd_brand_id],
        cd_branch_id: [cd_branch_id],
        md_ingredient_category_id: [md_ingredient_category_id],
        name: name,
        description: description || "",
        recipe_output: recipe_output || "",
        ingredients: mappedIngredients, // Set the processed ingredients
        deleting_method: deleting_method || "",
        is_active: is_active,
        created_by: "1",
        updated_by: "1",
      });
      setSelectedIngredients(mappedIngredients);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRow = () => {
    setSelectedIngredients([...selectedIngredients, null]); // Add a new null entry
  };

  const handleGrossChange = (event, index) => {
    const updatedIngredients = [...selectedIngredients];
    // Update the gross weight for the selected ingredient
    updatedIngredients[index].gross = event.target.value;
    // Calculate and update the gross_cost for the selected ingredient
    updatedIngredients[index].gross_cost =
      parseFloat(updatedIngredients[index].gross) *
      updatedIngredients[index].cost_price;
    setSelectedIngredients(updatedIngredients);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(rowIndex, 1); // Remove the row at the given index
    setSelectedIngredients(updatedIngredients);
  };

  useEffect(() => {
    const newTotalGrossWeight = selectedIngredients?.reduce(
      (accumulator, ingredient) =>
        accumulator +
        (ingredient && ingredient.gross ? parseFloat(ingredient.gross) : 0),
      0
    );

    const newTotalCost = selectedIngredients?.reduce(
      (accumulator, ingredient) =>
        accumulator +
        (ingredient && ingredient.gross_cost ? ingredient.gross_cost : 0),
      0
    );

    setTotalGrossWeight(newTotalGrossWeight);
    setTotalCost(newTotalCost);
  }, [selectedIngredients]);

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchIngredientCategories();
    fetchIngredients();

    if (location.state?.id) {
      fetchPreparationData(location.state?.id);
    }
  }, []);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      total_weight: totalGrossWeight,
      total_cost: totalCost,
    }));
  }, [totalGrossWeight, totalCost, setValues]);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Add New Preparation</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <CardLayout>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={3}>
                        <MultiSelectFieldCustom
                          required
                          error={
                            formik.touched.cd_client_id &&
                            formik.errors.cd_client_id
                          }
                          label="Role"
                          name="cd_client_id"
                          title="Client"
                          options={clients}
                          value={formik.values.cd_client_id}
                          onChange={(selectedValues) => {
                            formik.setFieldValue(
                              "cd_client_id",

                              selectedValues.map((v) => v.value)
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                      <Col md={3}>
                        <MultiSelectFieldCustom
                          required
                          error={
                            formik.touched.cd_brand_id &&
                            formik.errors.cd_brand_id
                          }
                          label="Role"
                          name="cd_brand_id"
                          title="Brand"
                          options={brands}
                          value={formik.values.cd_brand_id}
                          onChange={(selectedValues) => {
                            formik.setFieldValue(
                              "cd_brand_id",
                              selectedValues.map((v) => v.value)
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                      <Col md={3}>
                        <MultiSelectFieldCustom
                          required
                          error={
                            formik.touched.cd_branch_id &&
                            formik.errors.cd_branch_id
                          }
                          label="Role"
                          name="cd_branch_id"
                          title="Branch"
                          options={branches}
                          value={formik.values.cd_branch_id}
                          onChange={(selectedValues) => {
                            formik.setFieldValue(
                              "cd_branch_id",
                              selectedValues.map((v) => v.value)
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>

                      <Col md={3}>
                        <MultiSelectFieldCustom
                          error={
                            formik.touched.md_ingredient_category_id &&
                            formik.errors.md_ingredient_category_id
                          }
                          label="Role"
                          name="md_ingredient_category_id"
                          title="Category"
                          options={ingredientCategories}
                          value={formik.values.md_ingredient_category_id}
                          onChange={(selectedValues) => {
                            formik.setFieldValue(
                              "md_ingredient_category_id",
                              selectedValues.map((v) => v.value)
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>

                      <Col md={3}>
                        <LabelField
                          className="w100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          required
                          error={formik.touched.name && formik.errors.name}
                          label="Preparation name"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          placeholder="Enter Preparation name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>

                      <Col md={3}>
                        <div>
                          <label>Delete Method</label>
                          <Select
                            isMulti={false}
                            value={deleteMethodsOptions.find(
                              (option) =>
                                option.value === formik.values.deleting_method
                            )}
                            onChange={(option) => {
                              formik.setFieldValue(
                                "deleting_method",
                                option.value
                              );
                            }}
                            options={deleteMethodsOptions}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div>
                          <label>Recipe Output</label>
                          <div className="d-flex">
                            <input
                              type="number"
                              className="w-100"
                              style={{
                                border: "1px solid",
                                borderColor: "black",
                                padding: "0.4rem",
                                marginRight: "0.5rem",
                              }}
                              name="recipe_output_value"
                              value={formik.values.recipe_output_value}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "recipe_output_value",
                                  e.target.value
                                );
                                const combinedValue =
                                  e.target.value +
                                  (formik.values.recipe_output_unit || "");
                                formik.setFieldValue(
                                  "recipe_output",
                                  combinedValue
                                );
                              }}
                              onBlur={formik.handleBlur}
                            />
                            {formik.values.recipe_output_value && (
                              <>
                                <Select
                                  isMulti={false}
                                  value={unitOptions.find(
                                    (option) =>
                                      option.value ===
                                      formik.values.recipe_output_unit
                                  )}
                                  onChange={(option) => {
                                    formik.setFieldValue(
                                      "recipe_output_unit",
                                      option.value
                                    );
                                    const combinedValue =
                                      (formik.values.recipe_output_value ||
                                        "") + option.value;
                                    formik.setFieldValue(
                                      "recipe_output",
                                      combinedValue
                                    );
                                  }}
                                  options={unitOptions}
                                  className="w-50"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </Col>

                      <Col md={3}>
                        <LabelField
                          className="w100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          label="Description"
                          name="description"
                          type="textarea"
                          value={formik.values.description}
                          placeholder="Enter Description"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>

                      <Col md={4} className="pt-4">
                        <label className="toggle-label px-2 pb-0">
                          Is Active:
                        </label>
                        <div className=""></div>
                        <Toggle
                          cla
                          id="is_active"
                          checked={formik.values.is_active === 1}
                          onChange={(event) => {
                            formik.setFieldValue(
                              "is_active",
                              event.target.checked ? 1 : 0
                            );
                          }}
                        />
                      </Col>

                      <Col md={12}>
                        <h3 className="text-center py-2">
                          Select Ingredients for this Preparation
                        </h3>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Ingredients</th>
                              <th>Type</th>
                              <th>Amount</th>
                              <th>Gross Weight</th>
                              <th>Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedIngredients.map(
                              (selectedIngredient, index) => (
                                <>
                                  <tr key={index}>
                                    <td>
                                      <Select
                                        className="w-100"
                                        isMulti={false}
                                        options={ingredients.map((item) => ({
                                          value: item.id,
                                          label: item.name,
                                          ...item,
                                        }))}
                                        value={{
                                          // label: selectedIngredient.name,
                                          ...selectedIngredient,
                                        }}
                                        onChange={(selectedOption) => {
                                          const updatedIngredients = [
                                            ...selectedIngredients,
                                          ];
                                          updatedIngredients[index] =
                                            selectedOption;
                                          setSelectedIngredients(
                                            updatedIngredients
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>Ingredient</td>
                                    <td>
                                      <LabelField
                                        className="w-100"
                                        style={{
                                          border: "1px solid",
                                          borderColor: "black",
                                          padding: "0.4rem",
                                        }}
                                        name="gross"
                                        type="text"
                                        value={
                                          selectedIngredient &&
                                          selectedIngredient.gross
                                        }
                                        placeholder="Amount"
                                        onChange={(e) =>
                                          handleGrossChange(
                                            e,
                                            index,
                                            selectedIngredient
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="w-50"
                                        readOnly
                                        style={{
                                          border: "1px solid",
                                          borderColor: "black",
                                          borderRadius: "1rem",
                                          padding: "0.4rem",
                                          backgroundColor: "lightgray",
                                        }}
                                        name="gross"
                                        type="number"
                                        value={
                                          selectedIngredient &&
                                          selectedIngredient.gross
                                        }
                                        placeholder="0"
                                        onChange={(event) =>
                                          handleGrossChange(event, index)
                                        }
                                        onBlur={formik.handleBlur}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="w-50"
                                        readOnly
                                        style={{
                                          border: "1px solid",
                                          borderColor: "black",
                                          borderRadius: "1rem",
                                          padding: "0.4rem",
                                          backgroundColor: "lightgray",
                                        }}
                                        name="gross_cost"
                                        type="number"
                                        value={
                                          (selectedIngredient &&
                                            selectedIngredient.gross_cost) ||
                                          0
                                        }
                                        placeholder="0"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                    </td>
                                    <td>
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
                                    </td>
                                    {/* Add more table cells for other columns */}
                                  </tr>
                                </>
                              )
                            )}
                            <tr>
                              <td></td> {/* Empty cell */}
                              <td></td> {/* Empty cell */}
                              <td>
                                <strong>Total:</strong>
                              </td>
                              <td>
                                <strong>{totalGrossWeight}</strong>
                              </td>
                              <td>
                                <strong>{totalCost}</strong>
                              </td>
                              <td></td> {/* Empty cell for trash icon */}
                            </tr>
                            <button
                              onClick={handleAddRow}
                              className="btn btn-primary"
                              type="button"
                            >
                              Add
                            </button>
                          </tbody>
                        </Table>
                      </Col>

                      <Col md={12}>
                        <button className="cus-btn" type="submit">
                          Create
                        </button>
                        <Link to="/preparation">
                          <button
                            style={{
                              backgroundColor: "#F07632",
                              color: "white",
                              borderColor: "#F07632",
                            }}
                            className="cus-btn-bor"
                          >
                            Back
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardLayout>
            </form>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
};

export default CreatePreparation;
