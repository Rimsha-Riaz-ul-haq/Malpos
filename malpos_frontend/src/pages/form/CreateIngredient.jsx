import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Import the styles

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectFieldCustom from "../../components/fields/MultiSelectFieldCustom";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";

const CreateIngredient = () => {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);

  const validationSchema = yup.object().shape({
    cd_client_id: yup.array().min(1, "Client is required"),
    cd_brand_id: yup.array().min(1, "Brand is required"),
    cd_branch_id: yup.array().min(1, "Branch is required"),
    name: yup.string().required("Ingredient name is required"),
  });

  const formik = useFormik({
    initialValues: {
      cd_client_id: [],
      cd_brand_id: [],
      cd_branch_id: [],
      md_ingredient_category_id: [],
      is_active: 1,
      name: "",
      unit: "",
      base_unit: "",
      cost_price: "",
      barcode: "",
      created_by: "1",
      updated_by: "1",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const processedValues = {
        ...values,
        cd_client_id: values.cd_client_id.join(","),
        cd_brand_id: values.cd_brand_id.join(","),
        cd_branch_id: values.cd_branch_id.join(","),
        md_ingredient_category_id: values.md_ingredient_category_id.join(","),
      };
      console.log(processedValues);
      if (location.state?.id) {
        try {
          const res = await axiosInstance.post(
            `ingredient_update/${location.state.id}`,
            processedValues
          );

          toast.success("Ingredient updated successfully", { autoClose: 5000 });
        } catch (error) {
          toast.error("Error updating ingredient");
        }
      } else {
        try {
          const res = await axiosInstance.post(
            "/ingredient_store",
            processedValues
          );
          console.log(res, "res");
          toast.success("Ingredient created successfully", { autoClose: 5000 });
        } catch (error) {
          toast.error(error.message, { autoClose: 5000 });
        }
      }
    },
  });
  const location = useLocation();

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

  const fetchIngredientData = async (id) => {
    try {
      const res = await axiosInstance.get(`/ingredient_edit/${id}`);

      const {
        cd_client_id,
        cd_brand_id,
        cd_branch_id,
        md_ingredient_category_id,
        name,
        unit,
        barcode,
        cost_price,
        base_unit,
        is_active,
      } = res.data;
      formik.setValues({
        cd_client_id: [cd_client_id],
        cd_brand_id: [cd_brand_id],
        cd_branch_id: [cd_branch_id],
        md_ingredient_category_id: [md_ingredient_category_id],
        name: name || "",
        unit: unit || "",
        barcode: barcode || "",
        base_unit: base_unit || "",
        cost_price: cost_price || "",
        is_active: is_active,
        created_by: "1",
        updated_by: "1",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchIngredientCategories();
  }, []);

  useEffect(() => {
    if (location.state?.id) {
      fetchIngredientData(location.state?.id);
    }
  }, [location.state?.id]);
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Add New Ingredient</h3>
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
                          label="Ingredient name"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          placeholder="Enter Ingredient name"
                          onChange={formik.handleChange}
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
                          label="Barcode"
                          name="barcode"
                          type="text"
                          value={formik.values.barcode}
                          placeholder="Enter BarCode name"
                          onChange={formik.handleChange}
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
                          label="Unit"
                          name="unit"
                          type="text"
                          value={formik.values.unit}
                          placeholder="Enter Unit name"
                          onChange={formik.handleChange}
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
                          label="Base Unit "
                          name="base_unit"
                          type="text"
                          value={formik.values.base_unit}
                          placeholder="Enter Base Unit name"
                          onChange={formik.handleChange}
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
                          label="Cost Price"
                          name="cost_price"
                          type="text"
                          value={formik.values.cost_price}
                          placeholder="Enter Cost Price"
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
                        <button className="cus-btn" type="submit">
                          Create
                        </button>
                        <Link to="/ingredient">
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

export default CreateIngredient;
