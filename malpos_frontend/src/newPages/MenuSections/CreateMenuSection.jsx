import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import * as yup from "yup";
import { useFormik } from "formik";
import Toggle from "react-toggle";
import Select from "react-select";
// import "react-toggle/style.css"; // Import the styles
// import "react-datepicker/dist/react-datepicker.css";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectFieldCustom from "../../components/fields/MultiSelectFieldCustom";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";
import "./MenuSection.css";

const CreateMenuSection = () => {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [menus, setMenus] = useState([]);
  const [products, setProducts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [showProductsGrid, setShowProductsGrid] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSalePrice, setSelectedSalePrice] = useState("");
  const [rows, setRows] = useState([
    { selectedSalePrice: "", selectedOption: null },
  ]);

  const currentDate = new Date();

  const addRow = () => {
    const newRows = [...rows, { selectedSalePrice: "", selectedOption: null }];
    setRows(newRows);
    formik.setFieldValue("products", newRows);
  };

  const updateRow = (index, key, value) => {
    const newRow = [...rows];
    newRow[index][key] = value;
    setRows(newRow);
    formik.setFieldValue("products", newRow);
  };

  const validationSchema = yup.object().shape({
    cd_client_id: yup.array().min(1, "Client is required"),
    cd_brand_id: yup.array().min(1, "Brand is required"),
    cd_branch_id: yup.array().min(1, "Branch is required"),
    md_menu_id: yup.array().min(1, "Menu is required"),
    name: yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      cd_client_id: [],
      cd_brand_id: [],
      cd_branch_id: [],
      md_menu_id: [],
      is_active: 1,
      name: "",
      start_date: currentDate,
      end_date: currentDate,
      products: [],
      start_time: "00:00", // 24-hour format
      end_time: "00:00",
      created_by: "1",
      updated_by: "1",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formattedProducts = values.products.map((row) => ({
        md_product_id: row.md_product_id, // Replace with actual product ID
        price: row.selectedSalePrice,
        currency: row.selectedOption.label, // Replace with actual currency
        td_currency_id: row.td_currency_id,
      }));

      console.log(formattedProducts, "csdas");
      const processedValues = {
        ...values,
        cd_client_id: values.cd_client_id.join(","),
        cd_brand_id: values.cd_brand_id.join(","),
        cd_branch_id: values.cd_branch_id.join(","),
        md_menu_id: values.md_menu_id.join(","),
        start_date: values.start_date.toISOString().substring(0, 10),
        end_date: values.end_date.toISOString().substring(0, 10),
        products: formattedProducts,
      };

      console.log(processedValues, "Process");
      if (location.state?.id) {
        try {
          const res = await axiosInstance.post(
            `menu_section_update/${location.state.id}`,
            processedValues
          );

          toast.success("Menu section updated successfully", {
            autoClose: 5000,
          });
        } catch (error) {
          toast.error("Error updating Menu Section");
        }
      } else {
        try {
          const res = await axiosInstance.post(
            "/menu_section_store",
            processedValues
          );

          toast.success("Menu Section created successfully", {
            autoClose: 5000,
          });
        } catch (error) {
          toast.error(error.message, { autoClose: 5000 });
        }
      }
    },
  });

  const location = useLocation();

  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({
      label:
        item[nameKey] ||
        item["menu_name"] ||
        item["product_name"] ||
        item["currency_type"] ||
        "Default Label",
      value: item[idKey],
      product_price: item["product_price"],
      id: item["md_product_id"],
      cId: item["td_currency_id"],
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

  const fetchMenus = async () => {
    try {
      const res = await axiosInstance.get("/menu");
      const formattedData = formatData(res.data.data, "md_menu_id");
      setMenus(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const res = await axiosInstance.get("/currency");
      const formattedData = formatData(res.data, "td_currency_id");
      setCurrencies(formattedData);
      // console.log(res, "currency");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/");
      const formattedData = formatData(res.data.products.data, "md_product_id");
      console.log(res, "checking");
      console.log(formattedData, "md_product_id");
      setProducts(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenuSectionData = async () => {
    try {
      const response = await axiosInstance.get(
        `menu_section_edit/${location.state?.id}`
      );
      console.log(response, "response section");

      if (response && response.data) {
        const {
          cd_client_id,
          cd_brand_id,
          cd_branch_id,
          md_menu_id,
          name,
          start_date,
          end_date,
          menu_section_product,
          start_time,
          end_time,
          is_active,
        } = response.data[0];
        const formattedProducts = menu_section_product.map((product) => ({
          md_product_id: product.md_product_id,
          selectedSalePrice: product.price,
          selectedOption: {
            value: product.td_currency_id,
            label: product.currency_type,
          },
        }));

        const parsedStartDate = new Date(start_date);
        const parsedEndDate = new Date(end_date);

        formik.setValues({
          cd_client_id: [cd_client_id],
          cd_brand_id: [cd_brand_id],
          cd_branch_id: [cd_branch_id],
          md_menu_id: [md_menu_id],
          name: name || "",
          start_date: parsedStartDate,
          end_date: parsedEndDate,
          start_time: start_time,
          products: formattedProducts,
          end_time: end_time,
          is_active: is_active,
          created_by: "1",
          updated_by: "1",
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
    fetchMenus();
    fetchProducts();
    fetchCurrencies();

    if (location.state?.id) fetchMenuSectionData();
  }, []);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Add New Menu Section</h3>
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
                          required
                          error={
                            formik.values.md_menu_id && formik.values.md_menu_id
                          }
                          label="Role"
                          name="md_menu_id"
                          title="Menu"
                          options={menus}
                          value={formik.values.md_menu_id}
                          onChange={(selectedValues) => {
                            formik.setFieldValue(
                              "md_menu_id",
                              selectedValues.map((v) => v.value)
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>

                      <Col md={4}>
                        <LabelField
                          required
                          error={formik.touched.name && formik.errors.name}
                          label="Section name"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          placeholder="Enter Section name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                      <Row>
                        <Col md={6}>
                          <div className="custom-date-picker">
                            <label>Start Date</label>
                            <DatePicker
                              value={formik.values.start_date}
                              className="custom-input"
                              name="start_date"
                              onChange={(date) =>
                                formik.setFieldValue("start_date", date)
                              }
                              selectsStart
                              startDate={formik.values.start_date}
                              endDate={formik.values.end_date}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="custom-date-picker">
                            <label>End Date</label>
                            <DatePicker
                              name="end_date"
                              value={formik.values.end_date}
                              className="custom-input"
                              onChange={(date) =>
                                formik.setFieldValue("end_date", date)
                              }
                              selectsEnd
                              startDate={formik.values.start_date}
                              endDate={formik.values.end_date}
                              minDate={formik.values.start_date}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <label>Start Time</label>
                          <input
                            type="time"
                            name="start_time"
                            value={formik.values.start_time}
                            onChange={formik.handleChange}
                          />
                        </Col>
                        <Col md={6}>
                          <label>End Time</label>
                          <input
                            type="time"
                            name="end_time"
                            value={formik.values.end_time}
                            onChange={formik.handleChange}
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
                          Show Products:
                        </label>
                        <div className=""></div>
                        <Toggle
                          id="show_products"
                          checked={showProductsGrid}
                          onChange={() =>
                            setShowProductsGrid(!showProductsGrid)
                          }
                        />
                      </Col>
                      {showProductsGrid && (
                        <div className="products-grid pb-2">
                          {rows.map((row, index) => (
                            <div
                              className="row justify-content-center"
                              key={index}
                            >
                              <div className="col-md-3">
                                <label>Product</label>
                                <Select
                                  options={products}
                                  onChange={(option) => {
                                    updateRow(
                                      index,
                                      "selectedSalePrice",
                                      option.product_price
                                    );
                                    updateRow(
                                      index,
                                      "md_product_id",
                                      option.id
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-md-4">
                                <label>Sale Price</label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={row.selectedSalePrice}
                                    onChange={(e) => {
                                      updateRow(
                                        index,
                                        "selectedSalePrice",
                                        e.target.value
                                      );
                                    }}
                                  />

                                  <div className="input-group-append">
                                    <Select
                                      options={currencies}
                                      value={row.selectedOption}
                                      onChange={(option) => {
                                        console.log(option);
                                        updateRow(
                                          index,
                                          "selectedOption",
                                          option
                                        );
                                        updateRow(
                                          index,
                                          "td_currency_id",
                                          option.cId
                                        );
                                      }}
                                      className="input-group-select"
                                      name="embeddedProduct"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="text-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={addRow}
                            >
                              Add New Row
                            </button>
                          </div>
                        </div>
                      )}

                      <Col md={12}>
                        <button className="cus-btn" type="submit">
                          Create
                        </button>
                        <Link to="/menu-section">
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

export default CreateMenuSection;
