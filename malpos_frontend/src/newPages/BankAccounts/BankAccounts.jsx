import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
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

const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);

  const getBankAccounts = async () => {
    try {
      const response = await api.get("/bank_account");
      setBankAccounts(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredTaxCategories = bankAccounts?.filter((account) =>
    Object.values(account).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentBankAccounts = filteredTaxCategories.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getBankAccounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bank-account_delete/${id}`);
      getBankAccounts();
      const updatedBankAccounts = bankAccounts.filter(
        (account) => account.id !== id
      );
      setBankAccounts(updatedBankAccounts);
      toast.success("Bank Account deleted successfully", {
        autoClose: true,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("bankAccountId", id);
  };

  return (
    <>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <h3>Bank Accounts</h3>
            </CardLayout>
          </Col>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <CustomSearch
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col sm={12} md={2} lg={2} className="justify-content-between">
              <Link to={"/create-bank-account"}>
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
                        <Th>Description</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">
                      {currentBankAccounts &&
                        currentBankAccounts.length > 0 &&
                        currentBankAccounts.map((account) => (
                          <Tr
                            className="tbody"
                            key={account.md_bank_account_id}
                          >
                            <Td>{account.md_bank_account_id}</Td>
                            <Td>{account.tender_type}</Td>
                            <Td>{account.description}</Td>
                            <Td>
                              <Box className="d-flex flex-row">
                                <Box>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#ee3432"
                                    className="px-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleDelete(account.md_bank_account_id);
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <Link to={"/create-bank"}>
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      color="#f29b30"
                                      onClick={() => {
                                        handleEdit(account.md_bank_account_id);
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
                    totalUsers={filteredTaxCategories.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </Box>
              </Box>
            </Col>
          </Row>
        </Row>
      </PageLayout>
    </>
  );
};

export default BankAccounts;
