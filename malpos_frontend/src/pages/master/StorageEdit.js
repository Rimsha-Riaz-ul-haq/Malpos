import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import SelectField from "../../components/fields/SelectField";

export default function StorageEdit() {
  const location = useLocation();
  const [editStorageId, setEditStorageId] = useState();
  const [action, setAction] = useState();
  const [currentStorage, setCurrentStorage] = useState({ name: "", is_active: 0, cd_branch_id: 1, cd_brand_id: 1, cd_client_id: 1 });
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
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
  const fetchStorageById = async (id) => {
    try {
      const res = await axiosInstance.get(`/md_storage/${id}/edit`);
      setCurrentStorage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    if (location.state?.id) {
      fetchStorageById(location.state?.id);
      setEditStorageId(location.state?.id);
      setAction(location.state?.action);
    }
  }, [location.state]);

  const handleSwitchChange = () => {
    setCurrentStorage((prevStorage) => ({
      ...prevStorage,
      is_active: prevStorage.is_active === 1 ? 0 : 1,
    }));
  };

  const handleUpdateStorage = () => {
    const updatedStorageData = {
      name: currentStorage.name,
      is_active: currentStorage.is_active,
      cd_branch_id: currentStorage.cd_branch_id,
      cd_brand_id: currentStorage.cd_brand_id,
      cd_client_id: currentStorage.cd_client_id,
    };

    const apiEndpoint = editStorageId ? `/md_storage/update/${editStorageId}` : "/md_storage";

    axiosInstance
      .post(apiEndpoint, updatedStorageData) // Always use POST
      .then((response) => {
        toast.success("Storage updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        console.log("Storage updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating storage", {
          position: "top-right",
          autoClose: 3000,
        });

        console.error("Error updating storage", error);
      });
  };

  return (
    <div>
        
      <PageLayout>
        <Row>
        { <Col md={12}>
            <CardLayout>
            {action === "create" ? "Create Storage" : "Update Storage"}
            </CardLayout>
          </Col>}
          <Col md={12}>
            <CardLayout>
              <Row>
              <Col md={4}>
              <SelectField
                      // className="w-50"
                      label="Client"
                      name="cd_client_id"
                      options={clientsOptions}
                      value={currentStorage.cd_client_id}
                      onChange={(e) =>
                        setCurrentStorage({
                          ...currentStorage,
                          cd_client_id: e.target.value,
                        })
                      }
                    />
                </Col>
                <Col md={4}>
                    <SelectField
                      required
                      label="Brand"
                      name="brand"
                      type="select"
                      title="Brand"
                      options={brandsOptions}
                      value={currentStorage.cd_brand_id}
                      onChange={(e) =>
                        setCurrentStorage({
                          ...currentStorage,
                          cd_brand_id: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      required
                      label="Branch"
                      name="branch"
                      type="select"
                      title="Branch"
                      options={branchesOptions}
                      value={currentStorage.cd_branch_id}
                      onChange={(e) =>
                        setCurrentStorage({
                          ...currentStorage,
                          cd_branch_id: e.target.value,
                        })
                      }
                    />
                  </Col>
                <Col md={6}>
                  <LabelField
                  style={{marginBottom:'1rem' }}
                    type="text"
                    label={'Name'}
                    value={currentStorage.name}
                    onChange={(e) =>
                      setCurrentStorage({
                        ...currentStorage,
                        name: e.target.value,
                      })
                    }
                    placeholder={"Name"}
                  />
                  <Box className={"storageEdit-switch"}>
                    <Form.Check
                    style={{marginBottom:'1rem' }}
                      className="switch"
                      type="switch"
                      id="custom-switch"
                      label="Status"
                      checked={currentStorage.is_active === 1}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                  {action === "create" ? (
                    <button className='add-product-btn-pl' onClick={handleUpdateStorage}>
                      Create
                    </button>
                  ) : (
                    <button className='add-product-btn-pl' onClick={handleUpdateStorage}>
                      Update
                    </button>
                  )}
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
