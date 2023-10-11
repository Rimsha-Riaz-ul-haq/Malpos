import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import CustomPagination from "../../components/CustomPagination";
import { Box, Text, Button } from "../../components/elements";
import CustomSearch from "../../components/CustomSearch";
import api from "../../api/baseUrl";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);

  const getBrands = async () => {
    try {
      const response = await api.get("/cdbrand");
      setBrands(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  //   Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentBrands = filteredBrands.slice(indexOfFirstUser, indexOfLastUser);

  // const currentBrands = brands.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getBrands();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cdbrand_delete/${id}`);
      getBrands();
      const updatedBrands = brands.filter((brand) => brand.id !== id);
      setBrands(updatedBrands);
      toast.success("Brand deleted successfully", {
        autoClose: true,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    localStorage.setItem("brandId", id);
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Brands</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                {/* <Col xs={12} sm={12} md={3} lg={3}>
                  <div style={{ position: "relative" }}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="search-pl"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </span>
                  </div>
                </Col> */}
                <Col xs={12} sm={12} md={3} lg={3}>
                  <CustomSearch
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>

                <Col sm={12} md={2} lg={2} className="justify-content-between">
                  <Link to={"/create-brand"}>
                    <Button className="add-product-btn-pl">+ Create</Button>{" "}
                  </Link>
                </Col>

                <Col md={12}>
                  <Box>
                    <Box className="mc-table-responsive">
                      <Table className="mc-table product">
                        <Thead className="mc-table-head">
                          <Tr>
                            <Th>Id</Th>
                            <Th>Name</Th>
                            <Th>IsActive</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody className="mc-table-body even">
                          {currentBrands &&
                            currentBrands.map((brand) => (
                              <Tr key={brand.cd_brand_id}>
                                <Td>{brand.cd_brand_id}</Td>
                                <Td>{brand.name}</Td>
                                <Td
                                  style={{
                                    color: brand.is_active ? "green" : "red",
                                  }}
                                >
                                  {brand.is_active ? "Yes" : "No"}
                                </Td>
                                <Td>
                                  <Box className="d-flex flex-row">
                                    <Box>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        color="#ee3432"
                                        className="px-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleDelete(brand.cd_brand_id);
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Link to={"/create-brand"}>
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() => {
                                            handleEdit(brand.cd_brand_id);
                                          }}
                                        />
                                      </Link>
                                    </Box>
                                  </Box>
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                      <CustomPagination
                        perPage={perPage}
                        totalUsers={filteredBrands.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                    </Box>
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
