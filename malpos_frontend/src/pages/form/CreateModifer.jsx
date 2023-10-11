import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import api from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";

const CreateModifer = () => {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [subModifiers, setSubModifiers] = useState([
    {
      name: "",
      min: "",
      max: "",
      price: "",
    },
  ]);

  const [form, setForm] = useState({
    cd_client_id: "1",
    cd_brand_id: "1",
    cd_branch_id: "1",
    is_active: 1,
    name: "",
    min_select: "",
    modifier_type: "several",
    max_select: "",
    created_by: "1",
    updated_by: "1",
    submodifierData: [],
  });

  const location = useLocation();

  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({ label: item[nameKey], value: item[idKey] }));

  const fetchClients = async () => {
    try {
      const res = await api.get("/cdclient");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
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

  const fetchModifierData = async (id) => {
    if (location.state?.id) {
      try {
        const response = await api.get(`/modifier_edit/${id}`);
        console.log(response, "check");

        // Update the state using setForm
        setForm((prevForm) => ({
          ...prevForm,
          name: response.data.name,
          min_select: response.data.min_select,
          max_select: response.data.max_select,
          // Add other fields as needed, for example:
          // cd_client_id: response.data.cd_client_id,
          // cd_brand_id: response.data.cd_brand_id,
          // ...
        }));

        console.log(id);
      } catch (error) {
        toast.error("Problem getting data");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...form, submodifierData: subModifiers };
    try {
      if (location.state?.id) {
        const response = await api.post(
          `/modifier_update/${location.state?.id}`,
          formData
        );
        toast.success("Modifer updated successfully");
      } else {
        const response = await api.post(
          `/modifier_store/${location.state?.id}`,
          formData
        );
        toast.success("Modifer created successfully");
      }
    } catch (error) {
      console.log(formData);
      toast.error("Problem storing modifier data");
    }
  };

  const handleAddRow = () => {
    setSubModifiers([
      ...subModifiers,
      { name: "", min: "", max: "", price: "" },
    ]);
  };

  const handleSubModifierChange = (index, field, value) => {
    const newSubModifiers = [...subModifiers];
    newSubModifiers[index][field] = value;
    setSubModifiers(newSubModifiers);
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();

    if (location.state?.id) {
      fetchModifierData(location.state?.id);
    }
  }, []);
  return (
    <PageLayout>
      <Row>
        <Col md={12}>
          <CardLayout>
            <h3>Add New Modifier</h3>
          </CardLayout>
        </Col>
        <Col md={12}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <CardLayout>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={4}>
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
                    <Col md={4}>
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
                    <Col md={4}>
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

                    <Col md={4}>
                      <LabelField
                        required
                        label="Modifer Name"
                        name="name"
                        type="text"
                        value={form.name}
                        placeholder="Enter Modifier Name"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        label="Min Select"
                        name="min_select"
                        type="number"
                        value={form.min_select}
                        // placeholder="Enter Modifier Name"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        label="Max Select"
                        name="max_select"
                        type="number"
                        value={form.max_select}
                        // placeholder="Enter Modifier Name"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardLayout>
          </form>
        </Col>
        <Col md={12}>
          <CardLayout>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {subModifiers &&
                  subModifiers.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <LabelField
                          className="w-100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          name="name"
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleSubModifierChange(i, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <LabelField
                          className="w-100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          name="min"
                          type="number"
                          value={item.min}
                          onChange={(e) =>
                            handleSubModifierChange(i, "min", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <LabelField
                          className="w-100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          name="max"
                          type="number"
                          value={item.max}
                          onChange={(e) =>
                            handleSubModifierChange(i, "max", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <LabelField
                          className="w-100"
                          style={{
                            border: "1px solid",
                            borderColor: "black",
                            padding: "0.4rem",
                          }}
                          name="price"
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleSubModifierChange(i, "price", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                <button
                  onClick={handleAddRow}
                  className="btn btn-primary"
                  type="button"
                >
                  Add
                </button>
              </tbody>
            </Table>
            <Col md={12}>
              <button className="cus-btn" onClick={(e) => handleSubmit(e)}>
                {" "}
                Create
              </button>
              <Link to="/create-product">
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
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default CreateModifer;
