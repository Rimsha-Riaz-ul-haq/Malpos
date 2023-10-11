import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { faSearch, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
import CustomSearch from "../../components/CustomSearch";
import { Box, Text, Button } from "../../components/elements";
import { LabelField } from "../../components/fields";
import api from "../../api/baseUrl";

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);

  const getBranches = async () => {
    try {
      const response = await api.get("/cdbranch");
      setBranches(response.data);
      console.log(response);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentBranches = filteredBranches.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  //   const currentBranches = branches.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getBranches();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cdbranch_delete/${id}`);
      getBranches();
      const updatedBranches = branches.filter((branch) => branch.id !== id);
      setBranches(updatedBranches);
      toast.success("Branch deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    localStorage.setItem("branchId", id);
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Branches</h3>
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
                {/* <Col xs={12} sm={12} md={3} lg={3}>
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
                      }}
                    >
                      <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </span>
                  </div>
                </Col> */}
                <Col sm={12} md={2} lg={2} className="justify-content-between">
                  <Link to={"/create-branch"}>
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
                          {currentBranches &&
                            currentBranches.map((branch) => (
                              <Tr className="tbody" key={branch.cd_branch_id}>
                                <Td>{branch.cd_branch_id}</Td>
                                <Td>{branch.name}</Td>
                                <Td
                                  style={{
                                    color: branch.is_active ? "green" : "red",
                                  }}
                                >
                                  {branch.is_active ? "Yes" : "No"}
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
                                          handleDelete(branch.cd_branch_id);
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Link to={"/create-branch"}>
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() => {
                                            handleEdit(branch.cd_branch_id);
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
                        totalUsers={filteredBranches.length}
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
