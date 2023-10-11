import React, { useState, useEffect } from "react";
import { Col, Row, Form, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import SkeletonCell from "../../components/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEllipsis,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import {
  Button,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import { useNavigate } from "react-router-dom";
export default function Unitmeasurement() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unitMeasurements, setUnitMeasurements] = useState([]);
  const navigate = useNavigate();

  const handleDotBox = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchUnitMeasurements().then(() => setLoading(false))
    .catch((error) => {
      console.error("Error fetching supply data", error);
    });
  }, []);

  const fetchUnitMeasurements = async () => {
    try {
      const response = await axiosInstance.get("/uom");

      const unitMeasurementsData = response.data.data.data;

      if (Array.isArray(unitMeasurementsData)) {
        setUnitMeasurements(unitMeasurementsData);
      } else {
        console.error("Response data is not an array:", unitMeasurementsData);
      }
    } catch (error) {
      console.error("Error fetching unit measurements data", error);
    }
  };

  const handleUomEdit = (id) => {
    console.log("id: " + id);
    navigate(`/units-create/`, {
      state: {
        id: id,
        action: "updateUom",
      },
    });
  };
  const handleUomDelete = async (id) => {
    console.log("id is here", id)
    try {
      await axiosInstance.delete(`/uom/${id}`);
      fetchUnitMeasurements();
      toast.success("Unit deleted successfully", {
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
            <CardLayout>Unit of Measurements</CardLayout>
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
                    <Col md={9}>
                      <Link to={"/units-create"} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"unit-measurements-table-wrap"}>
                        <Table responsive>
                          <thead
                            className="thead-dark"
                            style={{ backgroundColor: "#F07632" }}
                          >
                            <tr>
                              <th className="th-w30">Name</th>
                              <th className="th-w30">Equal</th>
                              <th className="th-w30">Unit</th>
                              <th className="th-w10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading
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
                                   <SkeletonCell/>
                                  </td>


                                </tr>
                              ))
                            :unitMeasurements != undefined &&
                              unitMeasurements.map((measurement) => (
                                <tr
                                  key={measurement.md_uoms_id}
                                  className="f-13"
                                >
                                  <td className="td-w30">{measurement.name}</td>
                                  <td className="td-w30">{measurement.code}</td>
                                  <td className="td-w30">
                                    {measurement.symbol}
                                  </td>
                                  <td className="td-w10">
                                    <Row>
                                      <Col className="text-center">
                                        <Button
                                          title="Edit"
                                          className="material-icons edit"
                                          onClick={() =>
                                            handleUomEdit(
                                              measurement.md_uoms_id
                                            )
                                          }
                                        >
                                          edit
                                        </Button>

                                        <Button
                                          title="Delete"
                                          className="material-icons delete"
                                          onClick={() =>
                                            handleUomDelete(
                                              measurement.md_uoms_id
                                            )
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
