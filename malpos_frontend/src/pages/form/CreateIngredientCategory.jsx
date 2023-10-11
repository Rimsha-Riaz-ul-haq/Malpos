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

const CreateIngredientCategory = () => {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const location = useLocation();

  const validationSchema = yup.object().shape({
    cd_client_id: yup.array().min(1, "Client is required"),
    cd_brand_id: yup.array().min(1, "Brand is required"),
    cd_branch_id: yup.array().min(1, "Branch is required"),
    name: yup.string().required("Category name is required"),
  });

  const formik = useFormik({
    initialValues: {
      cd_client_id: [],
      cd_brand_id: [],
      cd_branch_id: [],
      parent_category_id: [],
      is_active: 1,
      name: "",
      image: "",
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
        parent_category_id: values.parent_category_id.join(","),
      };

      const formData = new FormData();
      Object.keys(processedValues).forEach((key) => {
        formData.append(key, processedValues[key]);
      });

      if (formik.values.image) {
        formData.append("image", formik.values.image);
      }

      if (location.state?.id) {
        try {
          const formData = new FormData();

          // Loop through all processedValues keys and append them to formData
          for (const key in processedValues) {
            if (processedValues.hasOwnProperty(key)) {
              if (key === "image" && processedValues[key] instanceof File) {
                formData.append(key, processedValues[key]);
              } else {
                formData.append(key, processedValues[key]);
              }
            }
          }

          const res = await axiosInstance.post(
            `ingredient_category_update/${location.state.id}`,
            formData
          );

          toast.success("Ingredient Category updated successfully", {
            autoClose: 5000,
          });
        } catch (error) {
          toast.error("Error updating ingredient category");
        }
      } else {
        try {
          const formData = new FormData();

          // Loop through all processedValues keys and append them to formData
          for (const key in processedValues) {
            if (processedValues.hasOwnProperty(key)) {
              if (key === "image" && processedValues[key] instanceof File) {
                formData.append(key, processedValues[key]);
              } else {
                formData.append(key, processedValues[key]);
              }
            }
          }

          const res = await axiosInstance.post(
            "/ingredient_category_store",
            formData
          );

          toast.success("Categorys created successfully", { autoClose: 5000 });
        } catch (error) {
          toast.error(error.message, { autoClose: 5000 });
        }
      }
    },
  });

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
      const response = await axiosInstance.get("/ingredient_category");
      const formattedData = formatData(
        response.data.data,
        "md_ingredient_category_id"
      );
      setCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIngredientCategoryData = async (id) => {
    try {
      const response = await axiosInstance.get(
        `ingredient_category_edit/${id}`
      );

      const {
        cd_client_id,
        cd_brand_id,
        cd_branch_id,
        parent_category_id,
        name,
        image,
        is_active,
      } = response.data;
      formik.setValues({
        cd_client_id: [cd_client_id],
        cd_brand_id: [cd_brand_id],
        cd_branch_id: [cd_branch_id],
        parent_category_id: [parent_category_id],
        name: name || "",
        image: image || "",
        is_active: is_active,
        created_by: "1",
        updated_by: "1",
      });
      setImagePreview(image);
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
    fetchIngredientCategoryData(location.state?.id);
  }, [location.state?.id]);
  return (
    <PageLayout>
      <Row>
        <Col md={12}>
          <CardLayout>
            <h3>Add New Category</h3>
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
                          formik.touched.parent_category_id &&
                          formik.errors.parent_category_id
                        }
                        label="Role"
                        name="parent_category_id"
                        title="Parent Category"
                        options={categories}
                        value={formik.values.parent_category_id}
                        onChange={(selectedValues) => {
                          formik.setFieldValue(
                            "parent_category_id",
                            selectedValues.map((v) => v.value)
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>

                    <Col md={12}>
                      <LabelField
                        className="w100"
                        style={{
                          border: "1px solid",
                          borderColor: "black",
                          padding: "0.4rem",
                        }}
                        required
                        error={formik.touched.name && formik.errors.name}
                        label="Category name"
                        name="name"
                        type="text"
                        value={formik.values.name}
                        placeholder="Enter Category name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                    <Col md={6}>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Category Preview"
                          width={250}
                          height={100}
                        />
                      )}

                      <LabelField
                        label="Category Photo"
                        name="image"
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          formik.setFieldValue("image", file);

                          // Image Preview logic
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setImagePreview(null);
                          }
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>

                    <Col md={12} className="pt-4 ps-3">
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
                      <Link to="/categories">
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
  );
};

export default CreateIngredientCategory;
