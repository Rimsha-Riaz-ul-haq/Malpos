import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PackagesCreate() {

  const [unitConversionData, setUnitConversionData] = useState({
    cd_client_id: 1,
    cd_brand_id: 1,
    cd_branch_id: 1,
    uom_to_name: "",
    multiply_rate: "",
    md_uom_id: "",
    created_by: "1",
    updated_by: "1",
  });

  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [UOMs, setUOMs] = useState([]);
  const [action, setAction] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
    }));

  const unitOptions =
    UOMs != undefined &&
    UOMs?.map((item) => ({
      label: item.name,
      value: item.md_uoms_id,
    }));
  
    const branchesOptions =
    branches != undefined &&
    branches?.map((item) => ({
      label: item.name,
      value: item.cd_branch_id,
    }));
  
    const brandsOptions =
    brands != undefined &&
    brands?.map((item) => ({
      label: item.name,
      value: item.cd_brand_id,
    }));

  useEffect(() => {
    fetchUoms();
    fetchClients();
    fetchBrands();
    fetchBranches();
    if (location.state?.id) {
      setAction(location.state.action);
      fetchConversionById(location.state.id);
    }
  }, [location.state]);

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      console.log(res.data, "cdclients");
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      console.log(res.data, "cdbranch");
      setBranches(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      setBrands(res.data);
      console.log(res.data, "cdbrand");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConversionById = async (id) => {
    try {
      const response = await axiosInstance.get(`/uom_conversion/${id}/edit`);
      const unitConversionsData = response.data.data;

      if (unitConversionsData != undefined) {

        const { md_uom_id,uom_to_name,multiply_rate } = unitConversionsData;
        let unitConversionsData_ =  {
        ...unitConversionsData,
        uom_to_name: uom_to_name,
        multiply_rate:multiply_rate,
        md_uom_id: md_uom_id,             };

        console.log(unitConversionsData_, "asdfasdkljfhaksjdfh");
        setUnitConversionData(unitConversionsData_);
      } else {
        console.error("Response data is not an array:", unitConversionsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUoms = async () => {
    try {
      const res = await axiosInstance.get(`/uom`);
      setUOMs(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUnitConversionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axiosInstance
      .post("/uom_conversion", unitConversionData)
      .then((response) => {
        let msg;
        if (action == "updateConversion") {
          msg = "Conversion updated successfully.";
          navigate(`/packages`);
        } else {
          msg = "Conversion created successfully.";
          navigate(`/packages`);
        }
        toast.success(msg, {
          autoClose: true,
        });
      })
      .catch((error) => {
        console.error("Error creating unit of measurement:", error);
      });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Col md={12}>
                <Row>
                  {
                    <Col md={12}>
                      <CardLayout>
                        {action != undefined && action == "updateConversion"
                          ? "Update Unit Conversion"
                          : "Create Unit Conversion"}
                      </CardLayout>
                    </Col>
                  }
                  <Col md={3}>
                    <SelectField
                      // className="w-50"
                      label="Client"
                      name="client"
                      options={clientsOptions}
                      value={unitConversionData?.cd_client_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={3}>
                    <SelectField
                      required
                      label="Brand"
                      name="brand"
                      type="select"
                      title="Brand"
                      options={brandsOptions}
                      value={unitConversionData?.cd_brand_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={3}>
                    <SelectField
                      required
                      label="Branch"
                      name="branch"
                      type="select"
                      title="Branch"
                      options={branchesOptions}
                      value={unitConversionData?.cd_branch_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      type="text"
                      name="uom_to_name"
                      value={unitConversionData?.uom_to_name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      label="Name"
                    />
                  </Col>

                  <Col md={4}>
                    <LabelField
                      type="number"
                      name="multiply_rate"
                      value={unitConversionData?.multiply_rate}
                      onChange={handleInputChange}
                      placeholder="Equal"
                      label="Equal"
                    />
                  </Col>
                  <Col md={3}>
                    <SelectField
                      required
                      label="Unit"
                      name="md_uom_id"
                      type="select"
                      title="unit"
                      options={unitOptions !=undefined && unitOptions}
                      value={unitConversionData !=undefined && unitConversionData?.md_uom_id}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Link style={{ float: "left" }}>
                    <Button
                      className="acc-create-btn rs-btn-create"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Link>
                </Row>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
