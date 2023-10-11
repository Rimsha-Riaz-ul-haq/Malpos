import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import SelectField from "../../components/fields/SelectField";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { useProduct } from "../../components/createProduct/productContext"; // Import the context
import { MultiSelect } from "react-multi-select-component";
export default function SuppliesEdit() {
  const location = useLocation();
  const { form } = useProduct(); // Retrieve the context
  const [storage, setStorage] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [numBoxes, setNumBoxes] = useState(1);
  const [editSuppliesId, setEditSuppliesId] = useState(null);
  const [action, setAction] = useState("asdf");
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [products, setProducts] = useState([]);
  const statusOptions = [
    { label: "Approved", value: "approved" },
    { label: "Draft", value: "draft" },
    { label: "Deleted", value: "deleted" },
  ];
  const [uoms, setUOMs] = useState([]);
  const [clients, setClients] = useState([]);
  const [UOMConversions, setUOMConversions] = useState([]);
  const [currentSupplies, setCurrentSupplies] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [invoiceNumber, setInvoicesNumber] = useState("");
  const [description, setDescription] = useState("");
  const [seleectedProduct, setSelectedProduct] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [seletedSupplier, setSelectedSupplier] = useState([]);
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
    }));
  const storageOptions =
    storage != undefined &&
    storage?.map((item) => ({
      label: item.name,
      value: item.id,
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
  const [supplyLines, setSupplyLines] = useState([
    {
      md_supply_id: 0,
      md_product_id: 0,
      qty: 0,
      total: 0,
      cost: 0,
      discount_percent: 0,
      tax: 0,
      uom_id: 0,
      uom_type: "base",
      unitsOptions: [],
    },
  ]);
  useEffect(() => {
    fetchProducts();
    fetchUom();
    fetchStorage();
    fetchClients();
    fetchBrands();
    fetchBranches();
    
    fetchCategories();
    fecthSuppliers();
    if (location.state?.id) {
      setEditSuppliesId(location.state.id);
      setAction(location.state.action);
      fetchSuppliesById(location.state.id);
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
  const fetchSuppliesById = async (id) => {
    try {
      const res = await axiosInstance.get(`/md_supplies/${id}/edit`);
     
      setSelectedClientId(res.data.cd_client_id);
      setSelectedBranchId(res.data.cd_branch_id);
      setSelectedBrandId(res.data.cd_brand_id);
      setSelectedStorage(res.data.md_storage_id);
      const supplylines = await fecthSupplyLines(res.data?.supplies_lines);
      
      fecthSuppliersById(res.data?.md_supplier_id);
      setSelectedStatus(res.data.status.toLowerCase());
      setInvoicesNumber(res.data.invoice_no);
      setSelectedSupplier(res.data?.md_supplier_id);
      setDescription(res.data?.description);
      const momentObject = moment(
        res.data.operation_time,
        "YYYY-MM-DD HH:mm:ss"
      );
      const formattedDate = momentObject.format("YYYY-MM-DD HH:mm");
      setSelectedDateTime(formattedDate);
      res.data.supplies_lines = supplylines;
      console.log(res.data, "supplies updated");
      setCurrentSupplies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fecthSuppliersById = async (id) => {
    const res = await axiosInstance.get(`/md_supplier/${id}/edit`);
  };

  const fecthSuppliers = async (id) => {
    const res = await axiosInstance.get(`/md_supplier/`);
    setSuppliers(res.data.data);
  };

  const fecthSupplyLines = async (supplies) => {

    const suppliesOptions = 
    await Promise.all(
      supplies.map(async (item) => {
        const unitsOptions = await fetchUomConversions(item.md_product_id);
        let tempData = {
          md_supply_id: item.md_supply_id,
          md_product_id: item.md_product_id,
          qty: item.qty,
          total: item.total,
          cost: item.cost,
          discount_percent: item.discount_percent,
          tax: item.tax,
          uom_id: item.uom_id,
          uom_type: "base",
          unitsOptions: unitsOptions,
        }
        return tempData
      })
    );
    setSupplyLines(suppliesOptions);
    return suppliesOptions
    // Now suppliesOptions contains the resolved data.
  
  };
  const productOptions =
    products != undefined &&
    products?.map((item) => ({
      label: item.product_name,
      value: item.md_product_id,
    }));

  const supplierOptions =
    suppliers != undefined &&
    suppliers?.map((item) => ({
      label: item.supplier_name,
      value: item.id,
    }));

  const CategoryOptions =
    categories != undefined &&
    categories?.map((item) => ({
      label: item.product_category_name,
      value: item.md_product_category_id,
    }));

  const handleSwitchChange = () => {
    setCurrentSupplies((prevSupplier) => ({
      ...prevSupplier,
      is_active: prevSupplier.is_active === "1" ? "0" : "1",
    }));
  };

  const fetchStorage = async () => {
    try {
      const res = await axiosInstance.get("/md_storage");
      setStorage(res.data.data);
      console.log("Storage", res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/product");
      setProducts(res.data.products.data);
      console.log("setProducts", res.data.products.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUomConversions = async (id) => {
    const res = await axiosInstance.get(`/uom/get_units_by_product/${id}`);
    const uniqueId = Date.now();
    const mergedArray = [
      {
        uniqueid: uniqueId,
        name: res.data.data.name,
        md_uoms_id: res.data.data.md_uoms_id,
      },
      ...res.data.data.conversions.map((conversion) => ({
        ...conversion,
        uniqueid: uniqueId,
      })),
    ];
    return mergedArray;
  };
  const fetchUom = async () => {
    try {
      const res = await axiosInstance.get("/uom");
      setUOMs(res.data.data.data);
      console.log("uom details", res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleRemoveBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
    setNumBoxes(numBoxes - 1);
  };
  const handleAddBox = () => {
    const newSupplyLine = {
      md_product_id: "",
      qty: 0,
      cost: 0,
      discount_percent: 0,
      tax: 0,
      total: 0,
      uom_id: "",
      uom_type: "base",
    };
    const updatedSupplyLines = [...supplyLines];
    updatedSupplyLines.push(newSupplyLine);
    setSupplyLines(updatedSupplyLines);
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      setCategories(res.data.product_category);
      console.log("product_category", res.data.product_category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSupplies = (editSuppliesId) => {
    const momentObject = moment(selectedDateTime, "YYYY-MM-DD HH:mm:ss");
    delete supplyLines.unitsOptions;
    console.log(selectedDateTime);
    const formattedDate = momentObject.format("YYYY-MM-DD HH:mm");
    let currentSupplies_ = {
      cd_client_id: selectedClientId,
      cd_brand_id: selectedBrandId,
      cd_branch_id: selectedBranchId,
      invoice_no: invoiceNumber,
      operation_time: formattedDate,
      md_supplier_id: seletedSupplier,
      md_storage_id: selectedStorage,
      status: selectedStatus,
      balance: null,
      category: null,
      description: description,
      created_by: "1",
      updated_by: "1",
      lines: supplyLines,
    };
    // console.log(currentSupplies_,'currentSupplies_');
    // return
    axiosInstance
      .post(`/md_supplies/update/${editSuppliesId}`, currentSupplies_)
      .then((response) => {
        toast.success("Supplies updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Supplies updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating supplies", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error updating supplies", error);
      });
  };
  const handleCreateSupplies = () => {
    let timeCurrent = selectedDateTime.format("YYYY-MM-DD HH:mm:ss");
    delete supplyLines.unitsOptions;

    let currentSupplies_ = {
      cd_client_id: 1,
      cd_brand_id: 1,
      cd_branch_id: 1,

      invoice_no: invoiceNumber,
    operation_time: timeCurrent,
      md_supplier_id: 1,
      md_storage_id: selectedStorage,
      status: selectedStatus,
      balance: null,
      category: null,
      description: description,
      created_by: "1",
      updated_by: "1",
      lines: supplyLines,
    };
    // console.log(currentSupplies_,'currentSupplies_');
    // return
    axiosInstance
      .post(`/md_supplies`, currentSupplies_)
      .then((response) => {
        toast.success("Supplies updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Supplies updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating supplies", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error updating supplies", error);
      });
  };
  const handleStorageChange = (e) => {
    setSelectedStorage(e.target.value);
    // setSelectedStorage(selectedOptions);
    // const selectedIds = selectedOptions.map((option) => option.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action == "updateSupplies") {
      handleUpdateSupplies(location.state.id);
    } else {
      handleCreateSupplies();
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
  };
  const handleDateChange = (date) => {
    setSelectedDateTime(date);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleProductSelect = (e) => {
    console.log(e.target.value);
    setSelectedProduct(e.target.value);
  };

  const calculateTotal = (supply) => {
    const qty = parseFloat(supply.qty) || 0;
    const cost = parseFloat(supply.cost) || 0;
    const discount = parseFloat(supply.discount_percent) || 0;
    const tax = parseFloat(supply.tax) || 0;

    return qty * cost - discount + tax;
  };
  const handleSupplyFieldsChange = (event, index, fieldName) => {
    const { value } = event.target;

    // Clone the supplyLines array
    const updatedSupplyLines = [...supplyLines];
    // Update the field
    updatedSupplyLines[index][fieldName] = value;
    // Calculate and update the total
    updatedSupplyLines[index].total = calculateTotal(updatedSupplyLines[index]);

    // Update the state
    setSupplyLines(updatedSupplyLines);
  };
let handleChangeFlag = 0
  const handleUnitOptionsChange = (event, index) => {
    handleChangeFlag = 1
    const  value  =JSON.parse(event)
    let fieldName = value.md_uoms_id ? "md_uoms_id" :"md_uom_id" 
    let typeName = value.md_uoms_id ? "base" : "conversion"
    // Clone the supplyLines array
    const updatedSupplyLines = [...supplyLines];
    // Update the field
    updatedSupplyLines[index][fieldName] = value[fieldName];
    updatedSupplyLines[index]['type'] = typeName;
    console.log("hello world",updatedSupplyLines[index])
    debugger
    // Calculate and update the total
    // updatedSupplyLines[index].total = calculateTotal(updatedSupplyLines[index]);

    // Update the state
    setSupplyLines(updatedSupplyLines);
  };
  const getUomValue = (id, type)=>{
    if(type =='conversion'){

      console.log("conversion")
    }
    if(type =='base'){
      console.log("base")
    }

  }
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between">
                <h3>
                  {action === "updateSupplies"
                    ? "Update Supplies"
                    : "Create Supplies"}
                </h3>
                <div className="align-self-end">
                  <button
                    className="add-product-btn-pl"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
              <Col md={4}>
              <SelectField
                      // className="w-50"
                      label="Client"
                      name="cd_client_id"
                      options={clientsOptions}
                      value={selectedClientId}
                      onChange={(e) => {
                        setSelectedClientId(e.target.value);
                      }}
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
                      value={selectedBrandId}
                      onChange={(e) => {
                        setSelectedBrandId(e.target.value);
                      }}
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
                      value={selectedBranchId}
                      onChange={(e) => {
                        setSelectedBranchId(e.target.value);
                      }}
                    />
                  </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control
                      as="select"
                      name="productid"
                      type="select"
                      value={seletedSupplier} // Set the value to preselect
                      onChange={(e) => {
                        setSelectedSupplier(e.target.value);
                      }}
                    >
                      <option value="">Select</option>
                      {supplierOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Storage</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      type="select"
                      value={selectedStorage} // Set the value to preselect
                      onChange={handleStorageChange}
                    >
                      <option value="">Select</option>
                      {storageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Box className="multi-select-opt">
                    <label>
                      Category
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MultiSelect
                      options={[]}
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      labelledBy="Select"
                      hasSelectAll={false}
                    />
                  </Box>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      type="select"
                      value={selectedStatus} // Set the value to preselect
                      onChange={handleStatusChange}
                    >
                      <option value="">Select</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Label>OPERATION TIME</Form.Label>
                  <Datetime
                    value={selectedDateTime}
                    onChange={handleDateChange}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Invoice Number"
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoicesNumber(e.target.value)}
                    placeholder={"Invoice Number"}
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"Description"}
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Balance"
                    type="text"
                    value={currentSupplies && currentSupplies?.balance}
                    placeholder={"Balance"}
                  />
                </Col>

                <Col md={12}>
                  <Box className="manage-modifier-gen-box">
                    <Box className="manage-modifier-gen-box-inner">
                      <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                        Product
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-name">
                        Unit
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-img">
                        QTY
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-gross">
                        Cost
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-def">
                        Discount(%)
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-cp">
                        Tax(%)
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-price">
                        Total
                      </Box>
                    </Box>
                  </Box>

                  {supplyLines.map((supply, index) => {
                      return (
                      <Box className="manage-modifier-gen-box">
                        <Box className="manage-modifier-gen-box-inner-textfield">
                          <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="productid"
                                type="select"
                                value={supply.md_product_id} // Set the value to preselect
                                onChange={(e) => {
                                  handleSupplyFieldsChange(
                                    e,
                                    index,
                                    "md_product_id"
                                  );
                                }}
                              >
                                <option value="">Select</option>
                                {productOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Box>
                          
                          <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="uom_id"
                                type="select"
                                value={supply.uom_id} // Set the value to preselect
                                onChange={(e) => 
                                  handleUnitOptionsChange(e.target.value, index)
                                }
                              >
                                <option value="">Select</option>
                                {supply.unitsOptions &&
                                  supply.unitsOptions.length > 0 &&
                                  supply.unitsOptions.map((item) => (
                                    <option
                                      key={item}
                                      value={JSON.stringify(item)}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                              </Form.Control>
                            </Form.Group>
                          </Box>

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              value={supply.qty}
                              onChange={(e) => {
                                handleSupplyFieldsChange(e, index, "qty");
                              }}
                              type="text"
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              type="text"
                              value={supply.cost}
                              onChange={(e) => {
                                handleSupplyFieldsChange(e, index, "cost");
                              }}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              type="text"
                              value={supply.discount_percent}
                              onChange={(e) => {
                                handleSupplyFieldsChange(
                                  e,
                                  index,
                                  "discount_percent"
                                );
                              }}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              type="text"
                              value={supply.tax}
                              onChange={(e) => {
                                handleSupplyFieldsChange(e, index, "tax");
                              }}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                          <Box className="modifier-gen-box-items modifier-gen-box-price">
                            <LabelField
                              type="text"
                              value={supply.total}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                  {boxes.map((box, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {console.log(index)}
                        <div
                          style={{
                            display: "flex",
                            flexGrow: 1,
                            marginRight: "10px",
                          }}
                        >
                          {box}
                        </div>
                        <button onClick={() => handleRemoveBox(index)}>
                          ✖
                        </button>
                      </div>
                    );
                  })}
                  <button
                    className="mange-mod-tab-add-btn"
                    onClick={handleAddBox}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
