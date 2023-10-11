import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";

export default function CreateMenus() {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({
    cd_client_id: "",
    cd_brand_id: "",
    cd_branch_id: "",
    cd_station_id: "",
    is_active: 1,
    menu_name: "",
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

  const fetchStations = async () => {
    //logic here
  };

  const fetchMenuData = async () => {
    //logic here
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

  const handleStationChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_station_id: selectedIds,
    }));
    console.log(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //logic here
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

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchStations();
  }, []);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Add New Product</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <CardLayout>
                <Row>
                  <Col md={12}>
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
                          label="Stations"
                          name="cd_stations_id"
                          type="select"
                          title="Stations"
                          options={stations}
                          value={form.cd_station_id}
                          onChange={handleStationChange}
                        />
                      </Col>

                      <Col md={4}>
                        <LabelField
                          required
                          label="Menu name"
                          name="menu_name"
                          type="text"
                          value={form.menu_name}
                          placeholder="Enter menu name"
                          onChange={handleChange}
                        />
                      </Col>

                      <Col md={12}>
                        <button className="cus-btn"> Create</button>
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
    </div>
  );
}
