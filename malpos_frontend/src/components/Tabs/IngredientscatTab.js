import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { Box } from "../elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import data from "../../data/master/categoriesList.json";
import axiosInstance from "../../api/baseUrl";
import CustomPagination from "../CustomPagination";
import { toast } from "react-toastify";

export default function IngredientscatTab() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchIngredientCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/ingredient_category", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setCategories(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate("/create-ingredient-category", { state: { id: id } });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/ingredient_category_delete/${id}`
      );
      fetchIngredientCategories();
      toast.success("Successfully deleted", { autoClose: 5000 });
    } catch (error) {
      toast.error("Error deleting", { autoClose: 5000 });
    }
  };

  const handleWindow = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  useEffect(() => {
    fetchIngredientCategories();
  }, [searchTerm, currentPage]);

  return (
    <Row>
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
                <Link to={"/create-ingredient-category"}>
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
                          <Th className="text-center">Active</Th>
                          <Th className="text-center">Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody className="mc-table-body even text-center">
                        {categories &&
                          categories.map((category, i) => (
                            <Tr key={i}>
                              <Td className="td-left">{category.name}</Td>

                              <Td>
                                {category.is_active === 1 ? (
                                  <span style={{ color: "green" }}>
                                    &#10004;
                                  </span>
                                ) : (
                                  <span style={{ color: "red" }}>&#10008;</span>
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
                                          category.md_ingredient_category_id
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
                                        handleEdit(
                                          category.md_ingredient_category_id
                                        )
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
  );
}
