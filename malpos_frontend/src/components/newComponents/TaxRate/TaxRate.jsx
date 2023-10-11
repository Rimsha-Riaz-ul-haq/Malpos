import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { faSearch, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../../components/elements/Table";
import { CardLayout } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import CustomPagination from "../../../components/CustomPagination";
import CustomSearch from "../../../components/CustomSearch";
import { Box, Text, Button } from "../../../components/elements";
import { LabelField } from "../../../components/fields";
import api from "../../../api/baseUrl";

const TaxRate = () => {
  const [taxRates, setTaxRates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);

  const getTaxRates = async () => {
    try {
      const response = await api.get("/tax_rate");
      setTaxRates(response.data.tax_rate);
      console.log(response);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredTaxRates = taxRates.filter((rate) =>
    Object.values(rate).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentTaxRates = filteredTaxRates.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  //   const currentBranches = branches.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getTaxRates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tax_rate_delete/${id}`);
      getTaxRates();
      const updatedTaxRates = taxRates.filter((rate) => rate.id !== id);
      setTaxRates(updatedTaxRates);
      toast.success("Tax Rate deleted successfully", {
        autoClose: true,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    localStorage.setItem("taxRateId", id);
  };

  return (
    <>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Tax Rates</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col xs={12} sm={12} md={3} lg={3}>
                  <CustomSearch
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col sm={12} md={2} lg={2} className="justify-content-between">
                  <Link to={"/create-tax-rate"}>
                    <Button className="add-product-btn-pl">+ Create</Button>
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
                            <Th>Tax Type</Th>
                            <Th>Tax Rate</Th>
                            <Th>Description</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody className="mc-table-body even">
                          {currentTaxRates &&
                            currentTaxRates.length > 0 &&
                            currentTaxRates.map((rate) => (
                              <Tr className="tbody" key={rate.td_tax_rate_id}>
                                <Td>{rate.td_tax_rate_id}</Td>
                                <Td>{rate.name}</Td>
                                <Td>{rate.type}</Td>
                                <Td>{rate.rate} %</Td>
                                <Td>{rate.description}</Td>
                                <Td>
                                  <Box className="d-flex flex-row">
                                    <Box>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        color="#ee3432"
                                        className="px-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleDelete(rate.td_tax_rate_id);
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Link to={"/create-tax-rate"}>
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() => {
                                            handleEdit(rate.td_tax_rate_id);
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
                        totalUsers={filteredTaxRates.length}
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
    </>
  );
};

export default TaxRate;
