import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";

import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import {
  faEdit,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/baseUrl";
import CustomPagination from "../../components/CustomPagination";
import { toast } from "react-toastify";

const Allergies = () => {
  const [allergies, setAllergies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchAllergies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/allergy", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setAllergies(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate("/create-allergie", {
      state: {
        id: id,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/allergy_delete/${id}`);
      toast.success("Allergies deleted successfully", { autoClose: 5000 });
      fetchAllergies();
    } catch (error) {
      toast.error("Error deleting allergies", { autoClose: 5000 });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchAllergies();
  }, [searchTerm, currentPage]);
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3>Allergies</h3>
                </Box>
              </Box>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={10}>
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
                  </Row>
                </Col>
                <Col md={2}>
                  <Box className="station-right-btn">
                    <Link to={"/create-allergie"}>
                      <button>
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Box>
                </Col>
              </Row>
              <Col md={12}>
                <Box className="mc-table-responsive">
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <Table className="mc-table product">
                          <Thead className="mc-table-head">
                            <Tr>
                              <Th className="text-center">Name </Th>
                              {/* <Th className="text-center">Count</Th> */}
                              <Th className="text-center">Active</Th>
                              {/* <Th className="text-center">Station Reminder</Th> */}
                              <Th className="text-center">Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody className="mc-table-body even text-center">
                            {allergies &&
                              allergies.map((allergie, i) => (
                                <Tr key={i}>
                                  <Td className="td-left">
                                    {allergie.allergy_name}
                                  </Td>
                                  <Td>
                                    {allergie.is_active === 1 ? (
                                      <span style={{ color: "green" }}>
                                        &#10004;
                                      </span>
                                    ) : (
                                      <span style={{ color: "red" }}>
                                        &#10008;
                                      </span>
                                    )}
                                  </Td>

                                  <Td className="text-end-td ">
                                    <Box
                                      className={
                                        " client-action-icons d-flex justify-content-center"
                                      }
                                    >
                                      <Box
                                        style={{ cursor: "pointer" }}
                                        className="px-2 text-center"
                                      >
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          color="#ee3432"
                                          onClick={() =>
                                            handleDelete(allergie.md_allergy_id)
                                          }
                                        />
                                      </Box>
                                      <Box
                                        className="text-center px-2"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() =>
                                            handleEdit(allergie.md_allergy_id)
                                          }
                                        />
                                      </Box>
                                    </Box>
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                        <CustomPagination
                          perPage={perPage}
                          totalUsers={totalNumber}
                          paginate={paginate}
                          currentPage={currentPage}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Box>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
};

export default Allergies;
