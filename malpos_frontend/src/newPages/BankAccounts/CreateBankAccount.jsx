import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import api from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";

export default function CreateBankAccount() {
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
    bank_account_id: "",
    tender_type: "",
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

  const fetchBankAccountData = async () => {
    const bankAccountId = localStorage.getItem("bankAccountId");
    setEditId(bankAccountId);
    if (bankAccountId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/bank_account_edit/${bankAccountId}`);
        const bankAccountData = response.data;
        setFormData({
          cd_brand_id: bankAccountData.cd_brand_id,
          cd_branch_id: bankAccountData.cd_branch_id,
          cd_client_id: bankAccountData.cd_client_id,
          tender_type: bankAccountData.tender_type,
          bank_account_id: bankAccountData.bank_account_id,
          description: bankAccountData.description,
          active: bankAccountData.is_active,
        });
        localStorage.removeItem("bankAccountId");
      } catch (error) {
        console.log(error, "Error retrieving bank data");
      }
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchBrands();
    fetchClients();
    fetchBankAccountData();
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
          `/bank_account-update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Bank Account edited successfully", {
          autoClose: true,
        });
      } else {
        // Create request
        response = await api.post("/bank_account_store", updatedFormData);
        console.log(response);
        toast.success("Bank Account created successfully", {
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error creating/updating Bank Account", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <CardLayout>
                <h3>Create Bank Account</h3>
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
                        placeholder="Type"
                        label="Tender Type"
                        name="tender_type"
                        value={formData.tender_type}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <LabelField
                        type="text"
                        placeholder="Account Number"
                        label="Account Number"
                        name="bank_account_id"
                        value={formData.bank_account_id}
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
                    <Link to="/bank-account">
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
