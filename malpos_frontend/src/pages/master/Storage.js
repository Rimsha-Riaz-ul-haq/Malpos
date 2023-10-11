import React, { useState, useEffect } from "react";
import { Col, Row, Form, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../api/baseUrl";
import SkeletonCell from "../../components/Skeleton";
import {
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faEllipsis,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Input,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { LabelField } from "../../components/fields";
import { useProduct } from "../../components/createProduct/productContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Storage() {
  const navigate = useNavigate();
  const [open, Close] = useState(false);

  const handleDotBox = () => {
    Close(!open);
  };
  const [loading, setLoading] = useState(true);
  const  [storage, setStorage]= useState([]);
  useEffect(() => {
  
    fetchStorage()
    .then(() => setLoading(false))
    .catch((error) => {
      console.error("Error fetching supply data", error);
    });
  },[]);

  const handleStorageEdit = (id) =>{
    console.log("id: " + id);
    navigate(`/storage-edit/`, {
      state: {
        id: id,
        action: "updateStorage",
      },
    });
  };
  const handleStorageDelete = async (id) => {
    try {
      await axiosInstance.delete(`/md_storage/${id}`);
      fetchStorage()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching supply data", error);
      });
      toast.success("Storage deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStorage = async () => {
    try {
      const res = await axiosInstance.get("/md_storage");
      setStorage(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
          <Col md={12}>
            Storage
          </Col>
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
                    <Col md={9}>
                      <Link to={"/storage-create"} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className="storage-table-wrap">
                        <Table>
                          <thead className="thead-dark" style={{backgroundColor:'#F07632'}}>
                            <tr>
                              <td className="th-w30">Name</td>
                              <td className="th-w30">Active</td>
                              <td className="th-w30">Write-off sequence</td>
                              <td className="th-w10">-</td>
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

                                </tr>
                              ))
                            :
                            storage.map((item) => (
                              <tr key={item.id}>
                                <td className="td-w30">
                                    {item.name}
                                </td>
                                <td className="td-w30">
                                  <Form.Check
                                    className="switch"
                                    type="switch"
                                    disabled={true}
                                    checked={item.is_active === 1}
                                    id={`custom-switch-${item.id}`}
                                  />
                                </td>
                                <td className="td-w30">
                                  <Box className={"mul-field"}>
                                    <LabelField
                                      option={["1", "2", "3", "4", "5"]}
                                      style={{ height: "25px", width: "50px" }}
                                    />
                                  </Box>
                                </td>
                                <td className="td-w10">
                                <Button
                                  // to="/product-view"
                                  // state={{ id: `${item.id}` }}
                                  // href="/product-upload"
                                  title="Edit"
                                  className="material-icons edit"
                                  onClick={() => handleStorageEdit(item.id)}
                                >
                                  edit
                                </Button>
                                <Button
                                  title="Delete"
                                  className="material-icons delete"
                                  onClick={() =>
                                    handleStorageDelete(item.id)
                                  }
                                >
                                  delete
                                </Button>
                              
                                  
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
