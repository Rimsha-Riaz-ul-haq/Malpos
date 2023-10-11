import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import api from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";

export default function CreateBank() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    cd_client_id: ",",
    cd_brand_id: "",
    cd_branch_id: "",
    description: "",
    name: "",
    is_active: "1",
    updated_by: "malpos",
    created_by: "malpos",
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

  const fetchClients = async () => {
    try {
      const res = await api.get("/getuser");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      is_active: e.target.checked,
    });
  };

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };

  const handleClientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value),
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
  };

  const fetchBankData = async () => {
    const bankId = localStorage.getItem("bankId");
    setEditId(bankId);
    if (bankId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/bank_edit/${bankId}`);
        const bankData = response.data;
        setFormData({
          name: bankData.name,
          cd_brand_id: bankData.cd_brand_id,
          cd_branch_id: bankData.cd_branch_id,
          cd_client_id: bankData.cd_client_id,
          name: bankData.name,
          description: bankData.description,
          active: bankData.is_active,
        });
        localStorage.removeItem("bankId");
      } catch (error) {
        console.log(error, "Error retrieving bank data");
      }
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchBrands();
    fetchClients();
    fetchBankData();
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
        response = await api.post(`/bank_update/${editId}`, updatedFormData);
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Bank edited successfully", {
          autoClose: true,
        });
      } else {
        // Create request
        response = await api.post("/bank_store", updatedFormData);
        console.log(response);
        toast.success("Bank created successfully", {
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error creating/updating Bank", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Bank</h3>
              </CardLayout>
            </Col>
            <Col md={12}>
              <CardLayout>
                <Row>
                  <Row>
                    <Col md={2}>
                      <SelectField
                        label="Client"
                        name="cd_client_id"
                        options={clients}
                        value={formData.cd_client_id}
                        onChange={handleClientChange}
                      />
                    </Col>
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
                    <Link to="/banks">
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
