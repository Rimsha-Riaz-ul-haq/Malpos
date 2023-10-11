import React, { useState, useEffect } from "react";

import { Row, Col, Form } from "react-bootstrap";
import data from "../../../data/productCategory.json";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Breadcrumb } from "../../../components/";
import CustomPagination from "../../CustomPagination";
import CustomSearch from "../../CustomSearch";
import { CardLayout } from "../../cards";
import PageLayout from "../../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../../elements";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../../api/baseUrl";

export default function ProductCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);

  const fetchCategories = async () => {
    const response = await axiosInstance.get("/product_category");
    console.log(response.data.product_category);
    setCategories(response.data.product_category);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product_category_delete/${id}`);
      fetchCategories();
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
      toast.success("Category deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/create-category/`, {
      state: {
        id: id,
      },
    });
    console.log("handle", id);
  };
  //   Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredCategories = categories.filter((category) =>
    category.product_category_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const currentCategories = filteredCategories.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <PageLayout>
      <CardLayout>
        <Breadcrumb title={data?.pageTitle}>
          {data?.breadcrumb.map((item, index) => (
            <li key={index} className="mc-breadcrumb-item">
              {item.path ? (
                <Anchor className="mc-breadcrumb-link" href={item.path}>
                  {item.text}
                </Anchor>
              ) : (
                item.text
              )}
            </li>
          ))}
        </Breadcrumb>
      </CardLayout>

      <CardLayout>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3}>
            <CustomSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col sm={12} md={2} lg={2} className="justify-content-between">
            <Link to={"/create-category"}>
              <Button className="add-product-btn-pl">+ Create</Button>{" "}
            </Link>
          </Col>
          <Box className="mc-table-responsive">
            <Table className="mc-table product">
              <Thead className="mc-table-head">
                <Tr>
                  <Th>
                    <Box className="mc-table-check">
                      <Text>Id</Text>
                    </Box>
                  </Th>
                  {data.product.thead.map((item, i) => (
                    <Th key={i}>{item}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody className="mc-table-body even">
                {currentCategories &&
                  currentCategories?.map((category) => (
                    <Tr key={category.md_product_category_id}>
                      <Td>
                        <Box className="mc-table-check">
                          <Text>{category.md_product_category_id}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box className="mc-table-product md">
                          <Image
                            src={category.product_category_image}
                            alt={category.product_category_name}
                          />
                          <Box className="mc-table-group">
                            <Link to="/product-view">
                              <Heading as="h6">
                                {category.product_category_name}
                              </Heading>
                            </Link>

                            {/* <Text>{item.descrip}</Text> */}
                          </Box>
                        </Box>
                      </Td>
                      <Td>{category.client.name}</Td>
                      <Td>{category.brand.name}</Td>
                      <Td>{category.branch.name}</Td>
                      <Td>{category.product_category_code}</Td>
                      <Td>
                        <Box>
                          <Text>{category.product_category_description}</Text>
                        </Box>
                      </Td>

                      <Td>
                        <Box
                          className={
                            " client-action-icons d-flex justify-content-between"
                          }
                        >
                          <Box style={{ cursor: "pointer" }}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              color="#ee3432"
                              onClick={() =>
                                handleDelete(category.md_product_category_id)
                              }
                            />
                          </Box>
                          <Box>
                            <FontAwesomeIcon
                              icon={faEdit}
                              color="#f29b30"
                              onClick={() =>
                                handleEdit(category.md_product_category_id)
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
              totalUsers={filteredCategories.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Box>
        </Row>
      </CardLayout>
    </PageLayout>
  );
}
