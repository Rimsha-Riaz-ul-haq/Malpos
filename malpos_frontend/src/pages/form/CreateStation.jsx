import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Toggle from "react-toggle";
import Select from "react-select";
import "react-toggle/style.css"; // Import the styles

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectFieldCustom from "../../components/fields/MultiSelectFieldCustom";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";

export default function CreateStation() {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);

  const validationSchema = yup.object().shape({
    cd_client_id: yup.array().min(1, "Client is required"),
    cd_brand_id: yup.array().min(1, "Brand is required"),
    cd_branch_id: yup.array().min(1, "Branch is required"),
    station_name: yup.string().required("Station name is required"),
  });

  const formik = useFormik({
    initialValues: {
      cd_client_id: [],
      cd_brand_id: [],
      cd_branch_id: [],
      is_active: 1,
      station_reminder: 1,
      can_be_printed: 1,
      station_name: "",
      created_by: "1",
      updated_by: "1",
      station_product: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const processedValues = {
        ...values,
        cd_client_id: values.cd_client_id.join(","),
        cd_brand_id: values.cd_brand_id.join(","),
        cd_branch_id: values.cd_branch_id.join(","),
        // station_product: values.station_product.join(","),
      };
      if (location.state?.id) {
        try {
          const res = await axiosInstance.post(
            `station_update/${location.state.id}`,
            processedValues
          );
          toast.success("Station updated successfully", { autoClose: 5000 });
        } catch (error) {
          toast.error("Error updating station");
        }
      } else {
        try {
          const res = await axiosInstance.post(
            "/station_store",
            processedValues
          );
          toast.success("Station created successfully", { autoClose: 5000 });
        } catch (error) {
          toast.error(error.message, { autoClose: 5000 });
        }
      }
    },
  });

  const location = useLocation();

  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({
      label: item[nameKey] || item["name"] || item["product_name"],
      value: item[idKey],
    }));

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

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/product");
      const formattedData = formatData(res.data.products.data, "md_product_id");
      setProducts(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const formatStationProducts = (products) => {
    return products.map((product) => ({
      label: product.product.product_name,
      value: product.md_product_id,
      md_product_id: product.md_product_id, // include original value if you need it
    }));
  };

  const fetchStationData = async () => {
    try {
      const response = await axiosInstance.get(
        `station_edit/${location.state?.id}`
      );
      if (response && response.data) {
        const {
          cd_client_id,
          cd_brand_id,
          cd_branch_id,
          station_name,
          is_active,
          station_reminder,
          can_be_printed,
          station_product,
        } = response.data[0];

        const stationProducts = formatStationProducts(station_product); // use the function here

        formik.setValues({
          cd_client_id: [cd_client_id],
          cd_brand_id: [cd_brand_id],
          cd_branch_id: [cd_branch_id],
          station_name: station_name || "",
          is_active: is_active,
          station_reminder: station_reminder,
          can_be_printed: can_be_printed,
          created_by: "1",
          updated_by: "1",
          station_product: stationProducts, // set it here
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchProducts();

    if (location.state?.id) fetchStationData();
  }, []);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Add New Station</h3>
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
                        <LabelField
                          className="w100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          required
                          error={
                            formik.touched.station_name &&
                            formik.errors.station_name
                          }
                          label="Station name"
                          name="station_name"
                          type="text"
                          value={formik.values.station_name}
                          placeholder="Enter Station name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                      <Row>
                        <Col md={4}>
                          <label>Select Products</label>
                          <Select
                            className="w100"
                            isMulti
                            name="station_product"
                            options={products}
                            placeholder="Associate Products"
                            value={formik.values.station_product}
                            onChange={(selectedValues) => {
                              const transformed = selectedValues.map(
                                (item) => ({
                                  label: item.label,
                                  value: item.value,
                                  md_product_id: item.value, // You can still include the original value
                                })
                              );
                              console.log("Transformed:", transformed);
                              formik.setFieldValue(
                                "station_product",
                                transformed
                              );
                            }}
                          />
                        </Col>
                      </Row>

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
                      <Col md={4} className="pt-4">
                        <label className="toggle-label px-2 pb-0">
                          Can be Printed:
                        </label>
                        <div className=""></div>
                        <Toggle
                          cla
                          id="can_be_printed"
                          checked={formik.values.can_be_printed === 1}
                          onChange={(event) => {
                            formik.setFieldValue(
                              "can_be_printed",
                              event.target.checked ? 1 : 0
                            );
                          }}
                        />
                      </Col>
                      <Col md={4} className="pt-4">
                        <label className="toggle-label px-2 pb-0">
                          Station Reminder:
                        </label>
                        <div className=""></div>
                        <Toggle
                          cla
                          id="station_reminder"
                          checked={formik.values.station_reminder === 1}
                          onChange={(event) => {
                            formik.setFieldValue(
                              "station_reminder",
                              event.target.checked ? 1 : 0
                            );
                          }}
                        />
                      </Col>

                      <Col md={12}>
                        <button className="cus-btn" type="submit">
                          Create
                        </button>
                        <Link to="/station">
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
}
