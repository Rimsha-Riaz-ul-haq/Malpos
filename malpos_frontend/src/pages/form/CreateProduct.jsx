import { Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import CreateRecipe from "../../components/createProduct/CreateRecipe";
import ModifiersTable from "../../components/createProduct/ModifiersTable";
import ColorDivs from "../../components/Tabs/ColorDivs";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";
import { useProduct } from "../../components/createProduct/productContext";
import ManageModifier from "../master/ManageModifier";

export default function CreateProduct() {
  const {
    clients,
    brands,
    branches,
    categories,
    taxCategories,
    diets,
    allergies,
    stations,
    menus,
    menuId,
    UOMs,
    // menuSections,
    imagePreviewURL,
    setDeletingMethod,
    deletingMethod,
    editProductId,
    form,
    setForm,
    setClients,
    setBrands,
    setBranches,
    setCategories,
    setTaxCategories,
    setDiets,
    setAllergies,
    setStations,

    setMenus,
    // setMenuId,
    // setMenuSections,
    setImagePreviewURL,
    setEditProductId,

    handleClientChange,
    handleBrandChange,
    handleBranchChange,
    handleCategoryChange,
    handleDietsChange,
    handleAllergyChange,
    // handleMenuChange,
    handleMenuSectionChange,
    handleStationChange,

    handleChange,
    handleTaxCategoryChange,
    handleUomChange,
    handleCheckboxChange,
    handleSubmit,
  } = useProduct();

  const [activeTab, setActiveTab] = useState(0);
  const [action, setAction] = useState();
  const location = useLocation();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    console.log(stations, menus, UOMs,"context");
    console.log(location.state, "locations");
    if (location.state?.id) {
      setEditProductId(location.state?.id);
      setAction(location.state?.action);
      fetchProductData();
    } else {
      setImagePreviewURL("");
      setEditProductId(null);
      setForm({
        cd_client_id: "",
        cd_brand_id: "",
        cd_branch_id: "",
        td_tax_category_id: null,
        deleting_method: "",
        totel_weight: "",
        md_product_category_id: "",
        md_station_id: "",
        md_allergy_id: "",
        md_diet_id: "",
        is_active: 1,
        product_name: "",
        maximun_day_of_product_return: "",
        cooking_time: "",
        description: "",
        gift: false,
        portion: false,
        bundle: false,
        not_allow_apply_discount: "",
        sold_by_weight: false,
        sale_price: "",
        barcode: "",
        product_image: null,
        product_price: "",
        created_by: "1",
        updated_by: "1",
        product_detail: [],
      });
    }
  }, []);
  const getPreSelectIds = (productData, field) => {
    console.log(productData, field);
    const categoryIds = productData.map((item) => item[field]);
    console.log("ids here ->>" + categoryIds, field);
    return categoryIds;
  };
  const fetchProductData = async () => {
    if (location.state?.id) {
      const id = location.state?.id;
      try {
        const response = await axiosInstance.get(`/product_edit/${id}`);
        console.log(response, "response is here");
        const productData = response.data;
        setImagePreviewURL(productData.product_image);
        setForm((prevForm) => ({
          ...prevForm,
          cd_client_id: productData.cd_client_id,
          cd_brand_id: getPreSelectIds(
            productData.product_brand,
            "cd_brand_id"
          ),
          cd_branch_id: getPreSelectIds(
            productData.product_branch,
            "cd_branch_id"
          ),
          md_product_category_id: getPreSelectIds(
            productData.product_product_category,
            "md_product_category_id"
          ),
          td_tax_category_id: productData.td_tax_category_id,
          product_name: productData.product_name,
          maximun_day_of_product_return:
            productData.maximun_day_of_product_return,
          sold_by_weight: productData.sold_by_weight,
          sale_price: productData.sale_price,
          is_active: productData.is_active,
          description: productData.description,
          gift: productData.gift,
          cooking_time: productData.cooking_time,
          barcode: productData.barcode,
          bundle: productData.bundle,
          not_allow_apply_discount: productData.not_allow_apply_discount,
          md_allergy_id: getPreSelectIds(
            productData.product_allergy,
            "md_allergy_id"
          ),
          md_menu_id: productData.md_menu_id,
          md_menu_section_id: productData.md_menu_section_id,
          md_diet_id: getPreSelectIds(productData.product_diet, "md_diet_id"),
          md_station_id: getPreSelectIds(
            productData.station_product,
            "md_station_id"
          ),
          product_code: productData.product_code,
          product_price: productData.product_price,
          product_image: productData.product_image,
          product_detail: productData.product_detail,
        }));
      } catch (error) {}
    }
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>
                {action === "updateProduct"
                  ? "Update Product"
                  : "Add New Product"}
              </h3>
              <div className="d-flex justify-content-between">
                <Box className="tabs-btn d-flex pt-3">
                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={activeTab === 0 ? "active" : ""}
                    >
                      General
                    </button>
                  </Box>

                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(1)}
                      className={activeTab === 1 ? "active" : ""}
                    >
                      Recipe
                    </button>
                  </Box>

                  <Box className="categories-btn">
                    <button
                      onClick={() => handleTabClick(2)}
                      className={activeTab === 2 ? "active" : ""}
                    >
                      Modifiers
                    </button>
                  </Box>
                </Box>
                <div className="d-flex align-self-end">
                  <button
                    className="add-product-btn-pl"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* <Box className="categories-btn"> */}

              {/* </Box> */}
            </CardLayout>
          </Col>
          <Col md={12}>
            {activeTab === 0 && (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <CardLayout>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md={3}>
                          <SelectField
                            // className="w-50"
                            label="Client"
                            name="cd_client_id"
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
                          {/* <SelectField
                            label="Diet"
                            name="md_diet_id"
                            options={diets}
                            value={form.md_diet_id}
                            onChange={handleDietsChange}
                          /> */}

                          <MultiSelectField
                            required
                            label="Diet"
                            name="md_diet_id"
                            type="select"
                            title="Diet"
                            options={diets}
                            value={form.md_diet_id}
                            onChange={handleDietsChange}
                          />
                        </Col>
                        <Col md={3}>
                          {/* <SelectField
                            label="Allergy"
                            name="md_allergy_id"
                            options={allergies}
                            value={form.md_allergy_id}
                            onChange={handleAllergyChange}
                          /> */}
                          <MultiSelectField
                            required
                            label="Allergy"
                            name="md_allergy_id"
                            title="Allergy"
                            options={allergies}
                            value={form.md_allergy_id}
                            onChange={handleAllergyChange}
                          />
                        </Col>
                        <Col md={3}>
                          <SelectField
                            label="Station"
                            name="md_station_id"
                            options={stations}
                            value={form.md_station_id}
                            onChange={handleStationChange}
                          />
                        </Col>
                        <Col md={3}>
                          <SelectField
                            label="Unit of Measurement"
                            name="md_uoms_id"
                            options={UOMs}
                            value={form.md_uoms_id}
                            onChange={handleUomChange}
                          />
                        </Col>
                        {/* <Col md={6}>
                          <SelectField
                            // className="w-50"
                            label="Menus"
                            name="md_menu_id"
                            options={menus}
                            value={form.md_menu_id}
                            onChange={handleMenuChange}
                          />
                        </Col>
                        <Col md={6}>
                          {form.md_menu_id && (
                            <SelectField
                              // className="w-50"
                              label="Menu Section"
                              name="md_menu_id"
                              options={menuSections}
                              value={form.md_menu_section_id}
                              onChange={handleMenuSectionChange}
                            />
                          )}
                        </Col> */}
                        <Col md={4}>
                          <LabelField
                            required
                            label="Product name"
                            name="product_name"
                            type="text"
                            value={form.product_name}
                            placeholder="Enter product name"
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Product Code"
                            type="text"
                            name="product_code"
                            placeholder="Enter product code"
                            value={form.product_code}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Barcode"
                            type="text"
                            name="barcode"
                            placeholder="Enter barcode"
                            value={form.barcode}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Cooking Time"
                            type={"text"}
                            name="cooking_time"
                            placeholder="Enter Cooking time"
                            value={form.cooking_time}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Product return days"
                            type="number"
                            name="maximun_day_of_product_return"
                            placeholder="Number of days to return"
                            value={form.maximun_day_of_product_return}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Description"
                            name="description"
                            type="text"
                            value={form.description}
                            placeholder="Enter product description"
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Product Price"
                            type="number"
                            name="product_price"
                            placeholder="Enter product Price"
                            value={form.product_price}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            label="Sale Price"
                            type="number"
                            name="sale_price"
                            placeholder="Enter Sale Price"
                            value={form.sale_price}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={12}>
                          <Box className="basicInfo-checkBoxes">
                            <Form.Check
                              type="checkbox"
                              label="Inactive"
                              name="is_active"
                              value={form.is_active}
                              checked={form.is_active === 1}
                              onChange={handleCheckboxChange}
                            />

                            <Form.Check
                              type="checkbox"
                              label="Gifts"
                              name="gift"
                              value={form.gift}
                              checked={form.gift === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Can't be Discounted"
                              name="not_allow_apply_discount"
                              value={form.not_allow_apply_discount}
                              checked={form.not_allow_apply_discount === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Ignore Service Charges"
                              name="ignory_service_charges"
                              value={form.ignory_service_charges}
                              checked={form.ignory_service_charges === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Bundle"
                              name="bundle"
                              value={form.bundle}
                              checked={form.bundle === 1}
                              onChange={handleCheckboxChange}
                            />

                            <Form.Check
                              type="checkbox"
                              label="Sold by Weight"
                              name="sold_by_weight"
                              value={form.sold_by_weight}
                              checked={form.sold_by_weight === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Portion"
                              name="portion"
                              value={form.portion}
                              checked={form.portion === 1}
                              onChange={handleCheckboxChange}
                            />
                          </Box>
                        </Col>
                        <Col md={6}>
                          {imagePreviewURL && (
                            <Form>
                              <Form.Group controlId="formFile">
                                <Form.Label>Product image</Form.Label>
                                <Box className="pl-img">
                                  <img src={imagePreviewURL} alt="Product" />
                                </Box>
                              </Form.Group>
                            </Form>
                          )}
                        </Col>
                        <Col md={6}>
                          <ColorDivs />
                        </Col>
                        <Col md={6}>
                          <label htmlFor="image">
                            Upload Image<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="file"
                            id="image"
                            name="product_image"
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={12}>
                          <button className="cus-btn">
                            {" "}
                            {action === "updateProduct" ? "Update" : "Create"}
                          </button>
                          <Link to="/product-list">
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
            )}

            {activeTab === 1 && <CreateRecipe />}
            {/* {activeTab === 2 && <SelectModifiers />} */}
            {activeTab === 2 && <ModifiersTable />}
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
