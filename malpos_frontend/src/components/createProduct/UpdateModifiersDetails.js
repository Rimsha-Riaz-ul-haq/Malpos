import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../elements";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxOpen,
  faCheck,
  faArrowRotateLeft,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CardLayout } from "../cards";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";
import ManageModifierEmenuTab from "../../components/Tabs/ManageModifierEmenuTab";
import { useLocation } from "react-router-dom";
import data from "../../data/master/stations.json";
import api from "../../api/baseUrl";
import { useProduct } from "./productContext";
import { useEffect } from "react";
import ManageModifierGenTab from "../Tabs/ManageModifierGenTab";
export default function UpdateModifiersDetails() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;
  // const [clients, setClients] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [branches, setBranches] = useState([]);
  const [subModifiers, setSubModifiers] = useState([
    {
      name: "",
      min: "",
      max: "",
      price: "",
    },
  ]);
  const { setClients, setBrands, setBranches } = useProduct();

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
  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({ label: item[nameKey], value: item[idKey] }));
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

  const handleSubModifierChange = (index, field, value) => {
    const newSubModifiers = [...subModifiers];
    newSubModifiers[index][field] = value;
    setSubModifiers(newSubModifiers);
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

  useEffect(() => {
    // fetchClients();
    // fetchBrands();
    // fetchBranches();

    if (location.state?.id) {
      fetchModifierData(location.state?.id);
    }
  }, []);
  return (
    <div>
      {data &&
        data?.stations.tbody
          .filter((item) => {
            return item.item == 1;
          })
          .map((item, i) => (
            <PageLayout>
              <Row>
                <Col md={12}>
                  <CardLayout>
                    <Box className="head-sec-rearrange">
                      <Box className="head-sec-rearrange-left">
                        <h3>
                          {item.heading} ({item.item})
                        </h3>
                      </Box>
                      <Box className="head-sec-rearrange-right">
                        <Box className="rearrange-right">
                          <button className="head-sec-rearrange-btn">
                            <FontAwesomeIcon icon={faCheck} />
                            &nbsp; Save
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  </CardLayout>
                </Col>
                <Col md={12}>
                  <CardLayout>
                    <Tabs
                      id="my-tabs"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                    >
                      <Tab eventKey="tab1" title="General">
                        <div className="tabContent additiona-infoTab">
                          <ManageModifierGenTab data={item} />
                        </div>
                      </Tab>
                      {/* 
                      <Tab eventKey="tab5" title="eMenu">
                        <div className="tabContent additiona-infoTab">
                          <ManageModifierEmenuTab data={item} />
                        </div>
                      </Tab> */}
                    </Tabs>
                  </CardLayout>
                </Col>
              </Row>
            </PageLayout>
          ))}
    </div>
  );
}
