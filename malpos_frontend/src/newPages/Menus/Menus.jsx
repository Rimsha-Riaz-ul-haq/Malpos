import React, { useState, useEffect } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row, Form } from "react-bootstrap";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "../../components/elements/Table";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import IconSearchBar from "../../components/elements/IconSearchBar";
import axiosInstance from "../../api/baseUrl";
import CustomPagination from "../../components/CustomPagination";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchMenus = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/menu", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setMenus(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    navigate("/create-menu", {
      state: {
        id: id,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance(`/menu-delete/${id}`);
      toast.success("Menu deleted successfully", { autoClose: 5000 });
    } catch (error) {
      toast.error("Error deleting menu", { autoClose: 500 });
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [searchTerm, currentPage]);
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
                  <h3>Manage Menus</h3>
                </Col>
              </Row>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={9} lg={10}>
                  <Row>
                    <Col md={4} lg={3}>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="search-pl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={3} lg={2}>
                  <Row>
                    <Col md={12}>
                      <Col md={6} sm={12}>
                        {" "}
                        <Link to="/create-menu">
                          <button className="pm-create-btn w-100">
                            <FontAwesomeIcon icon={faPlus} /> Create
                          </button>
                        </Link>
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Col md={12}>
                <Row>
                  <Col md={12}>
                    <Box className="table-menuCat">
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
                                    {menus &&
                                      menus.map((menu, i) => (
                                        <Tr key={i}>
                                          <Td className="td-left">
                                            {menu.menu_name}
                                          </Td>
                                          <Td>
                                            {menu.is_active === 1 ? (
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
                                                      menu.md_menu_id
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
                                                    handleEdit(menu.md_menu_id)
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
                    </Box>
                  </Col>
                </Row>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
         
    </div>
  );
}
