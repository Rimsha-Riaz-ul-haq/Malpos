import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom/dist";
import { toast } from "react-toastify";

import { LabelField, LabelTextarea } from "../fields";
import { Input, Item } from "../elements";
import { Image } from "../elements";
import { Box } from "../elements";
import ColorDivs from "./ColorDivs";
import axiosInstance from "../../api/baseUrl";
import MultiSelectField from "../fields/MultiSelectField";
import SelectField from "../fields/SelectField";

export default function BasicInfo({ data }) {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [diets, setDiets] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [menus, setMenus] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [form, setForm] = useState({
    cd_client_id: "",
    cd_brand_id: "",
    cd_branch_id: "",
    td_tax_category_id: null,
    md_diet_id: null,
    md_allergy_id: null,
    md_menu_id: null,
    is_active: 1,
    product_name: "",
    product_code: "",
    product_image: null,
    md_product_category_id: "",
    product_price: "",
    created_by: "1",
    updated_by: "1",
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

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      const formattedData = formatData(
        res.data.product_category,
        "md_product_category_id",
        "product_category_name"
      );

      setCategories(formattedData);
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

  const fetchTaxCategories = async () => {
    try {
      const res = await axiosInstance.get("/tax_category");
      const formattedData = formatData(
        res.data.tax_category,
        "td_tax_category_id"
      );
      setTaxCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiets = async () => {
    try {
      const res = await axiosInstance.get("/diet");
      const formattedData = formatData(res.data, "md_diet_id", "diet_name");
      setDiets(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllergies = async () => {
    try {
      const res = await axiosInstance.get("/allergy");
      const formattedData = formatData(res.data, "md_allergy_id");
      setDiets(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await axiosInstance.get("/menu");
      const formattedData = formatData(res.data, "md_menu_id");
      setMenus(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductData = async () => {
    if (location.state?.id !== null) {
      const id = location.state?.id;
      try {
        const response = await axiosInstance.get(`/product_edit/${id}`);
        const productData = response.data;

        setForm((prevForm) => ({
          ...prevForm,
          cd_client_id: productData.cd_client_id,
          cd_brand_id: productData.cd_brand_id,
          cd_branch_id: productData.cd_branch_id,
          md_product_category_id: productData.md_product_category_id,
          td_tax_category_id: productData.td_tax_category_id,
          product_name: productData.product_name,
          product_code: productData.product_code,
          product_price: productData.product_price,
          product_image: productData.product_image,
        }));
      } catch (error) {}
    }
  };

  const handleClientChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_client_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleBrandChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_brand_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleBranchChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_branch_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleCategoryChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_product_category_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "product_image") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleTaxCategoryChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      td_tax_category_id: e.target.value,
    }));
  };

  const handleDietsChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_diet_id: e.target.value,
    }));
  };

  const handleAllergyChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_allergy_id: e.target.value,
    }));
  };

  const handleMenuChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_menu_id: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      // Allow the value to be null if it's an empty string or another undesired value
      formData.append(key, form[key] || null || "");
    });

    if (editProductId !== null) {
      try {
        await axiosInstance.post(`/product_update/${editProductId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product updated successfully", {
          autoClose: true,
        });
      } catch (error) {
        console.log(error, "Error updating product");
      }
    } else {
      try {
        const response = await axiosInstance.post("/product_store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Product created successfully", {
          autoClose: true,
        });
      } catch (error) {
        toast.success("Error creating product", {
          autoClose: true,
        });
      }
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchCategories();
    fetchTaxCategories();
    fetchDiets();
    fetchAllergies();
    fetchMenus();

    if (location.state?.id) {
      setEditProductId(location.state?.id);
    }
    fetchProductData();
  }, []);

  return (
    <form>
      <Row>
        <Col md={3}>
          <MultiSelectField
            required
            label="Role"
            name="cd_client_id"
            type="select"
            title="Client"
            options={clients}
            value={form.cd_client_id}
            onChange={handleClientChange}
          />
        </Col>
        <Col md={3}>
          <MultiSelectField
            required
            label="Role"
            name="cd_brand_id"
            type="select"
            title="Brand"
            options={brands}
            value={form.cd_brand_id}
            onChange={handleBrandChange}
          />
        </Col>
        <Col md={3}>
          <MultiSelectField
            required
            label="Role"
            name="cd_branch_id"
            type="select"
            title="Branch"
            options={branches}
            value={form.cd_branch_id}
            onChange={handleBranchChange}
          />
        </Col>
        <Col md={3}>
          <MultiSelectField
            required
            label="Category"
            name="md_product_category_id"
            type="select"
            title="Category"
            options={categories}
            value={form.md_product_category_id}
            onChange={handleCategoryChange}
          />
        </Col>
        <Col md={3}>
          <SelectField
            label="Tax Category"
            name="td_tax_category_id"
            options={taxCategories}
            value={form.td_tax_category_id}
            onChange={handleTaxCategoryChange}
          />
        </Col>
        <Col md={3}>
          <SelectField
            label="Diet"
            name="md_diet_id"
            options={diets}
            value={form.md_diet_id}
            onChange={handleDietsChange}
          />
        </Col>
        <Col md={3}>
          <SelectField
            label="Allergy"
            name="md_allergy_id"
            options={allergies}
            value={form.md_allergy_id}
            onChange={handleAllergyChange}
          />
        </Col>
        <Col md={3}>
          <SelectField
            label="Menus"
            name="md_menu_id"
            options={menus}
            value={form.md_menu_id}
            onChange={handleMenuChange}
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Product image</Form.Label>
                      <Box className="pl-img">
                        <img src={data.src} alt="image" />
                      </Box>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <ColorDivs />
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <LabelField
                type="text"
                label="Product Name"
                fieldSize="w-100 h-md"
                value={data.heading}
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="text"
                label="Product Bardcode"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Category"
                option={["Sea food", "Expresso", "Ice drink", "Pizza"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                placeholder={data.station}
                label="Station"
                option={["Kitchen", "Hotbar", "Shisha"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="number"
                placeholder={data.costPrice}
                label="Cost price"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                label="Taxes"
                option={["VAT 15%", "VAT 20%", "Tobacco Tax 100%"]}
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <LabelField
                type="number"
                placeholder="0"
                label="Sale Price"
                fieldSize="w-100 h-md"
              />
            </Col>
            <Col md={6}>
              <Box className="basicInfo-checkBoxes">
                <Form.Check type="checkbox" label="Inactive" />
                <Form.Check type="checkbox" label="Gifts" />
                <Form.Check type="checkbox" label="Can't be Discounted" />
                <Form.Check type="checkbox" label="Sold by Weight" disabled />
              </Box>
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
}
