import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import data from "../../../data/productDetails.json";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Breadcrumb } from "../../../components/";
import CustomPagination from "../../CustomPagination";
import CustomSearch from "../../CustomSearch";
import { CardLayout } from "../../cards";
import PageLayout from "../../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../../../api/baseUrl";

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);

  const fetchProducts = async () => {
    const response = await axiosInstance.get("/product");
    setProducts(response.data.product);
    console.log(response);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product_delete/${id}`);
      fetchProducts();
      const updatedProducts = products.filter((category) => category.id !== id);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/create-product/`, {
      state: {
        id: id,
      },
    });
  };

  //   Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentProducts = filteredProducts.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchProducts();
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
            <Link to={"/create-product"}>
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
                {currentProducts?.map((product) => (
                  <Tr key={product.md_product_id}>
                    <Td>
                      <Box className="mc-table-check">
                        <Text>{product.md_product_id}</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box className="mc-table-product md">
                        <Image
                          src={product.product_image}
                          alt={product.product_name}
                        />
                        <Box className="mc-table-group">
                          <Link to="/product-view">
                            <Heading as="h6">{product.product_name}</Heading>
                          </Link>

                          {/* <Text>{item.descrip}</Text> */}
                        </Box>
                      </Box>
                    </Td>
                    <Td>{product.client.name}</Td>
                    <Td>{product.brand.name}</Td>
                    <Td>{product.branch.name}</Td>
                    <Td>{product.product_code}</Td>
                    <Td>
                      <Box className="mc-table-price">
                        <Text>{product.product_price}</Text>
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
                            onClick={() => handleDelete(product.md_product_id)}
                          />
                        </Box>
                        <Box>
                          <FontAwesomeIcon
                            icon={faEdit}
                            color="#f29b30"
                            onClick={() => handleEdit(product.md_product_id)}
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
              totalUsers={filteredProducts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Box>
        </Row>
      </CardLayout>
    </PageLayout>
  );
}
