import React, { useState, useEffect } from "react";
import { Col, Row, Form, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import SkeletonCell from "../../components/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faMinus,
  faEllipsis,
  faCircleQuestion,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import {
  Button,
  Input,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Suppliers() {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleDotBox = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Fetch suppliers data
fetchSupplier().then(() => setLoading(false))
.catch((error) => {
  console.error("Error fetching supply data", error);
});;
  }, []);

  const fetchSupplier = async () => {
    
   await axiosInstance
      .get("/md_supplier")
      .then((response) => {
        setSuppliers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers data", error);
      });
  };

  const handleSupplierEdit = (id) => {
    console.log("id: " + id);
    navigate(`/suppliers-edit/`, {
      state: {
        id: id,
        action: "updateSupplier",
      },
    });
  };

  const handleSupplierDelete = async (id) => {
    try {
      await axiosInstance.delete(`/md_supplier/${id}`);
      fetchSupplier();
      toast.success("Supplier deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>Suppliers</CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={3}>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="search-pl"
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            fontSize: "14px",
                          }}
                        >
                          <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </span>
                      </div>
                    </Col>
                    <Col md={3} className="col-md-suppiers-checkbox">
                      <Form.Check
                        className="suppiers-checkbox"
                        type="checkbox"
                        label="Deleted Values"
                      />
                    </Col>
                    <Col md={6}>
                      <Box className="suppliers-r-btn">
                        <Link to={"/suppliers-create"}>
                          <button className="acc-create-btn rs-btn-create">
                            <FontAwesomeIcon icon={faPlus} /> Create{" "}
                          </button>
                        </Link>
                      {/*   <Link to={""}>
                          <button className="acc-create-btn rs-btn-create payment-btn">
                            <FontAwesomeIcon icon={faPlus} /> Make a Payment{" "}
                          </button>
                        </Link>*/}
                      </Box>
                    </Col>
                    <Col md={12}>
                      <Box className={"suppliers-table-wrap"}>
                        <Table responsive>
                          <thead className="thead-dark" style={{backgroundColor:'#F07632'}}>
                            <tr>
                              <th className="th-w20">Name</th>
                              <th className="th-w15 text-end">
                                Debt
                                {""}{" "}
                                <FontAwesomeIcon
                                  icon={faCircleQuestion}
                                  color={"#f29b30"}
                                />
                                <br />
                                <span className="debt" >-322670.00 SAR</span>
                              </th>
                              <th className="th-w15 text-end">
                                Balance
                                {""}{" "}
                                <FontAwesomeIcon
                                  icon={faCircleQuestion}
                                  color={"#f29b30"}
                                />
                                <br />
                                <span className="bal " style={{color:'black'}}>-02670.00 SAR</span>
                              </th>
                              <th className="th-w15">Description</th>
                              <th className="th-w15">Phone</th>
                              <th className="th-w10">Tin</th>
                              <th className="th-w10">Active</th>{" "}
                              {/* Added "Active" column */}
                              <th className="th-w10">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                            loading
                            ? // Render skeletons while loading
                              Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  <td>
                                    <SkeletonCell />
                                  </td> 
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  <td>
                                    <SkeletonCell />
                                  </td> 
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  
                                  <td>
                                    <SkeletonCell />
                                  </td>

                                </tr>
                              ))
                            :
                            
                            suppliers !=undefined && suppliers.map((supplier) => (
                              <tr key={supplier.id} className="f-13">
                                <td className="td-w20">
                                  {supplier.supplier_name}
                                </td>
                                <td className="td-w15 text-end">322670.00</td>
                                <td className="td-w15 text-end">322670.00</td>
                                <td className="td-w15">
                                  {supplier.description}
                                </td>
                                <td className="td-w15">{supplier.phone}</td>
                                <td className="td-w10">{supplier.tin}</td>
                                <td className="td-w30">
                                  <Form.Check
                                    className="switch"
                                    type="switch"
                                    disabled={true}
                                    checked={supplier.is_active === 1}
                                    id={`custom-switch-${supplier.id}`}
                                  />
                                </td>
                                <td className="td-w10">
                                  <Row>
                                    <Col className="text-center">
                                      <Button
                                        title="Edit"
                                        className="material-icons edit"
                                        onClick={() =>
                                          handleSupplierEdit(supplier.id)
                                        }
                                      >
                                        edit
                                      </Button>
                                    </Col>
                                    <Col className="text-center">
                                      <Button
                                        title="Delete"
                                        className="material-icons delete"
                                        onClick={() =>
                                          handleSupplierDelete(supplier.id)
                                        }
                                      >
                                        delete
                                      </Button>
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Box>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
