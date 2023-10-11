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

const MenuSections = () => {
  const [menuSections, setMenuSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchMenuSections = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/menu_section", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setMenuSections(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate("/create-menu-section", {
      state: {
        id: id,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/menu_section_delete/${id}`);
      toast.success("Menu Section deleted successfully", { autoClose: 5000 });
      fetchMenuSections();
    } catch (error) {
      toast.error("Error deleting Menu Section", { autoClose: 5000 });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchMenuSections();
  }, [searchTerm, currentPage]);
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3>Menu Sections</h3>
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
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
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
                    <Link to={"/create-menu-section"}>
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
                            {menuSections &&
                              menuSections.map((item, i) => (
                                <Tr key={i}>
                                  <Td className="td-left">{item.name}</Td>
                                  <Td>
                                    {item.is_active === 1 ? (
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
                                            handleDelete(
                                              item.md_menu_section_id
                                            )
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
                                            handleEdit(item.md_menu_section_id)
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

export default MenuSections;
