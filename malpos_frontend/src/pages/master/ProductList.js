import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import "./productlist.css";
import data from "../../data/master/productList.json";
import CategoryOptions from "../../components/fields/CategoryOptions";
import GiftOptions from "../../components/fields/GiftOptions";
import ProductOptions from "../../components/fields/ProductOptions";
import {
  Button,
  Input,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import { toast } from "react-toastify";
import axiosInstance from "../../api/baseUrl";
import CustomPagination from "../../components/CustomPagination";

export default function ProductList() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [section, setSection] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);
  const [searchByProduct, setSearchByProduct] = useState("");
  const [activeLink, setActiveLink] = useState(0);
  const [gift, setGift] = useState([
    { id: 1, value: "Yes" },
    { id: 0, value: "No" },
  ]);
  const [categoryFilter, setCategoryFilter] = useState();
  const [productFilter, setProductFilter] = useState();
  const [giftFilter, setGiftFilter] = useState();
  const [categories, setCategories] = useState();
  const [formData, setFormData] = useState({
    search_by_product: "true",
    search: "",
    product_code: "",
    md_product_category_id: "",
    gift: "",
  });

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/product", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setProducts(response.data.products.data);
      setTotalNumber(response.data.products.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/product_category");
      console.log(response);
      setCategories(response.data.product_category);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearchSubmit = async () => {
    try {
      const updatedFormData = {
        search_by_product: "true",
        search: searchByProduct,
        product_code: productFilter,
        md_product_category_id: categoryFilter,
        gift: giftFilter,
      };
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          `/product_search/`,
          updatedFormData
        );
        setProducts(response.data.products.data);
        setTotalNumber(response.data.products.total);
      } catch (error) {
        console.log(error);
        // Show error message to user here
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating/updating Tax Category", error);
    }
  };

  const updateProductFilter = (product_code) => {
    let filterData = formData;
    filterData[product_code] = product_code;
    setFormData(filterData);
    setProductFilter(product_code);
  };

  const updateGiftFilter = (giftid) => {
    console.log("updateGiftFilter", giftid);
    let filterData = formData;
    filterData[gift] = giftid;
    setFormData(filterData);
    setGiftFilter(giftid);
  };

  const handleNavLinkClick = (index) => {
    console.log(index);
    setActiveLink(index); // Update the active link when it's clicked
  };
  const handleCreateProduct = () => {
    navigate(`/create-product/`, {
      state: {
        action: "createProduct",
      },
    });
  };
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product_delete/${id}`);
      fetchProducts();
      toast.success("Product deleted successfully", {
        autoClose: false,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    console.log("id: " + id);
    navigate(`/create-product/`, {
      state: {
        id: id,
        action: "updateProduct",
      },
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, currentPage]);

  const updateCategoryFilter = (categoryid) => {
    console.log("updateCategoryFilter", categoryid);
    setCategoryFilter(categoryid);
  };

  return (
    <PageLayout>
      <Row className="product-list">
        <Col xl={12}>
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
        </Col>
        {/* <FloatCard numberOfProducts={products?.length} /> */}
        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={3}
                lg={12}
                className="main-category d-flex"
              >
                {" "}
                <Nav>
                  {data?.float.map((item, index) => (
                    <Nav.Item key={index} className="me-2">
                      <Nav.Link
                        onClick={() => handleNavLinkClick(index)}
                        className={`custom-link ${
                          activeLink === index ? "active-link" : "inactive-link"
                        }`}
                      >
                        {item.title}
                        {item.title === "All" && ( // Conditionally render the count badge for the "All" tab
                          <span className="count-badge">{totalNumber}</span>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="search-pl"
                    value={searchByProduct}
                    onChange={(e) => setSearchByProduct(e.target.value)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <button type="submit" onClick={handleSearchSubmit}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </Col>
              <Col xs={12} sm={6} md={2} lg={2} className="col-2-filters">
                <ProductOptions
                  option={products}
                  title={"Products"}
                  labelDir="label-col"
                  fieldSize="field-select  w-100 h-md"
                  callback={updateProductFilter}
                />
              </Col>
              <Col xs={12} sm={6} md={2} lg={2} className="col-2-filters">
                <CategoryOptions
                  option={categories}
                  title={"Category"}
                  labelDir="label-col"
                  fieldSize="field-select  w-100 h-md"
                  callback={updateCategoryFilter}
                />
              </Col>
              <Col xs={12} sm={6} md={2} lg={2} className="col-2-filters">
                <GiftOptions
                  option={gift}
                  title={"Gift"}
                  labelDir="label-col"
                  fieldSize="field-select  w-100 h-md"
                  callback={updateGiftFilter}
                />
              </Col>
              <Col sm={12} md={2} lg={2}>
                {/* <Link to={"/create-product"}> */}
                <Button className="add-product-btn-pl" onClick={handleShow}>
                  + Create
                </Button>
                {/* </Link> */}
              </Col>

              <Modal
                show={show}
                onHide={handleClose}
                className="manage-m-dialog-box custom-modal"
                centered
              >
                <Modal.Header closeButton className="custom-modal-header">
                  <Modal.Title className="custom-modal-title">
                    Select the type of product
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="custom-modal-content">
                    <Row>
                      <Col md={12}>
                        <Row className="custom-row">
                          <Col md={2} className="col-2 custom-col-2">
                            <div className="faDish-img custom-faDish-img">
                              <img src="/images/product/pizza.jpg" alt="img" />
                            </div>
                          </Col>
                          <Col md={8}>
                            <h6 className="custom-h6">Dish</h6>
                            <p>Add products with composition to menu</p>
                          </Col>
                          <Col md={2} className="col-2 custom-col-2">
                            {/* <Link to="/create-product/"> */}
                            <FontAwesomeIcon
                              className="faPlus custom-faPlus"
                              icon={faPlus}
                              onClick={handleCreateProduct}
                            />
                            {/* </Link> */}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Row className="custom-row">
                          <Col md={2} className="col-2 custom-col-2">
                            <div className="faDish-img custom-faDish-img">
                              <img src="/images/product/drink.jpg" alt="img" />
                            </div>
                          </Col>
                          <Col md={8}>
                            <h6 className="custom-h6">Ready Items </h6>
                            <p>Add ready items to menu</p>
                          </Col>
                          <Col md={2} className="col-2 custom-col-2">
                            <Link to="/constructure-product">
                              <FontAwesomeIcon
                                className="faPlus custom-faPlus"
                                icon={faPlus}
                              />
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>

              <Col xl={12}>
                <Box className="mc-table-responsive">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head">
                      <Tr>
                        <Th>
                          <Box className="mc-table-check">
                            {/* <Input
                  type="checkbox"
                  name="allCheck"
                  checked={
                    data?.filter((item) => item.isChecked !== true).length < 1
                  }
                  onChange={handleCheckbox}
                /> */}
                            <Text>Id</Text>
                          </Box>
                        </Th>
                        <Th>Name</Th>
                        <Th>Visibility</Th>
                        <Th>Gift</Th>
                        <Th>Type</Th>
                        {/* <Th>Category</Th> */}
                        <Th>Cook Time</Th>
                        <Th>Cost</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">
                      {products &&
                        products?.map((item, i) => (
                          <Tr key={item.md_product_id}>
                            <Td>
                              <Box className="mc-table-check">
                                {/* <Input
                    type="checkbox"
                    name={item.name}
                    checked={item?.isChecked || false}
                    onChange={handleCheckbox}
                  /> */}
                                <Text>{item.md_product_id}</Text>
                              </Box>
                            </Td>
                            <Td>
                              <Box className="mc-table-product md">
                                <Image
                                  src={item.product_image}
                                  alt={item.product_image}
                                />
                                <Box className="mc-table-group">
                                  {/* <Link to="/product-view" state={{ id: `${item.id}` }}> */}
                                  <Heading as="h6">{item.product_name}</Heading>
                                  {/* </Link> */}

                                  {/* <Text>{item.descrip}</Text> */}
                                </Box>
                              </Box>
                            </Td>
                            <Td>{item.is_active === 1 ? "✅" : "❌"}</Td>

                            <Td>{item.is_active === 1 ? "✅" : "❌"}</Td>
                            <Td>Dish</Td>
                            <Td>{item.cooking_time}</Td>
                            {/* <Td>
                <Box className="mc-table-price">
                  {/* <del>{item.price.previous}</del> */}
                            {/* <Text>{item.type}</Text>
                </Box>
              </Td>  */}
                            {/* <Td>{item.category}</Td> */}

                            <Td>{item.product_price}</Td>
                            <Td>{item.sale_price}</Td>
                            {/* <Td>{item.markup}</Td> */}

                            <Td>
                              <Box className="mc-table-action">
                                {/* <Link
                    to="/product-view"
                    state={{ id: `${item.id}` }}
                    title="View"
                    className="material-icons view"
                  >
                    {item.action.view}
                  </Link> */}
                                <Button
                                  // to="/product-view"
                                  // state={{ id: `${item.id}` }}
                                  // href="/product-upload"
                                  title="Edit"
                                  className="material-icons edit"
                                  onClick={() => handleEdit(item.md_product_id)}
                                >
                                  edit
                                </Button>
                                <Button
                                  title="Delete"
                                  className="material-icons delete"
                                  onClick={() =>
                                    handleDelete(item.md_product_id)
                                  }
                                >
                                  delete
                                </Button>
                              </Box>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Box>
                <CustomPagination
                  perPage={perPage}
                  totalUsers={totalNumber}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
