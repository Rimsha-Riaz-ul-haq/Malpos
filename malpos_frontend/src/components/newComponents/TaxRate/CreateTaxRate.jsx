import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";

import { CardLayout } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import { LabelField } from "../../../components/fields";
import api from "../../../api/baseUrl";
import SelectField from "../../../components/fields/SelectField";

export default function CreateTaxRate() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState();
  const [region, setRegion] = useState([]);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    cd_brand_id: "",
    cd_branch_id: "",
    gd_country_id: "",
    gd_region_id: "",
    description: "",
    name: "",
    td_tax_category_id: "",
    valid_form: "May",
    type: "",
    rate: "",
  });

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchBrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTaxCategories = async () => {
    try {
      // Add Tax Category api endpoint here
      const res = await api.get("/tax_category");
      const formattedData = formatData(
        res.data.tax_category,
        "td_tax_category_id"
      );
      setTaxCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await api.get("/get_country");
      const formattedData = formatData(res.data, "gd_country_id");
      setCountry(formattedData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegions = async () => {
    try {
      const res = await api.get(`/get_region/${countryId}`);
      const formattedData = formatData(res.data, "gd_region_id");
      console.log(res.data);
      setRegion(formattedData);
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };

  const handleTaxCategoryChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      td_tax_category_id: parseInt(e.target.value),
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
  };

  const handleCountryChange = (e) => {
    const id = parseInt(e.target.value);
    setCountryId(id);
    setFormData((prevForm) => ({
      ...prevForm,
      gd_country_id: parseInt(e.target.value),
    }));

    fetchRegions();
  };

  const handleRegionChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      gd_region_id: parseInt(e.target.value),
    }));
  };

  const fetchTaxRateData = async () => {
    const taxRateId = localStorage.getItem("taxRateId");
    setEditId(taxRateId);
    if (taxRateId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/tax_rate_edit/${taxRateId}`);
        const taxRateData = response.data;
        setFormData({
          name: taxRateData.name,
          cd_brand_id: taxRateData.cd_brand_id,
          cd_branch_id: taxRateData.cd_branch_id,
          td_tax_category_id: taxRateData.td_tax_category_id,
          name: taxRateData.name,
          description: taxRateData.description,
          valid_form: taxRateData.valid_form,
          type: taxRateData.valid_form,
          rate: taxRateData.rate,
        });
        localStorage.removeItem("taxRateId");
      } catch (error) {
        console.log(error, "Error retrieving tax rate data");
      }
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchBrands();
    fetchTaxCategories();
    fetchCountries();
    fetchTaxRateData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
      };

      let response;

      if (isUpdate) {
        // Update request
        response = await api.post(
          `/tax_rate_update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Tax Rate edited successfully", {
          autoClose: true,
        });
      } else {
        // Create request
        response = await api.post("/tax_rate_store", updatedFormData);
        console.log(response);
        toast.success("Tax Rate created successfully", {
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error creating/updating Tax Rate", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Tax Rate</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
              <CardLayout>
                <Row>
                  <Row>
                    <Col md={2}>
                      <SelectField
                        label="Brand"
                        name="cd_brand_id"
                        options={brands}
                        value={formData.cd_brand_id}
                        onChange={handleBrandChange}
                      />
                    </Col>

                    <Col md={2}>
                      <SelectField
                        label="Branch"
                        name="cd_branch_id"
                        options={branches}
                        value={formData.cd_branch_id}
                        onChange={handleBranchChange}
                      />
                    </Col>

                    <Col md={2}>
                      <SelectField
                        label="Tax Category"
                        name="td_tax_category_id"
                        options={taxCategories}
                        value={formData.td_tax_category_id}
                        onChange={handleTaxCategoryChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <SelectField
                        label="Select Country"
                        name="gd_country_id"
                        options={country}
                        value={formData.gd_country_id}
                        onChange={handleCountryChange}
                      />
                    </Col>
                    <Col md={4}>
                      {countryId && (
                        <SelectField
                          label="Select Region"
                          name="gd_region_id"
                          options={region}
                          value={formData.gd_region_id}
                          onChange={handleRegionChange}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <LabelField
                        type="text"
                        placeholder="Name"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={2}>
                      <LabelField
                        type="number"
                        placeholder="%"
                        label="Tax Rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2}>
                      <SelectField
                        label="Tax Type"
                        name="type"
                        options={[
                          { label: "PO", value: "PO" },
                          { label: "SO", value: "SO" },
                        ]}
                        value={formData.type}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <LabelField
                        type="text"
                        placeholder="Description"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Col md={12}>
                    <button className="cus-btn" type="submit">
                      Create
                    </button>
                    <Link to="/tax-rate">
                      <button
                        className="cus-btn-bor"
                        style={{
                          backgroundColor: "#F07632",
                          color: "white",
                          borderColor: "#F07632",
                        }}
                      >
                        Back
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardLayout>
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
