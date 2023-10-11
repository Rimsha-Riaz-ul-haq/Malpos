import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import CustomPagination from "../../components/CustomPagination";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ingredients.json";
import { Link, useNavigate } from "react-router-dom";

import IngredientsTable from "../../components/tables/IngredientsTable";
import instance from "../../api/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchIngredients = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/ingredient", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setIngredients(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/ingredient_delete/${id}`);
      toast.success("Ingredient deleted successfully", { autoClose: 5000 });
      fetchIngredients();
    } catch (error) {
      toast.error("Error deleting Ingredient", { autoClose: 5000 });
    }
  };

  const handleEdit = async (id) => {
    navigate("/create-ingredient", {
      state: {
        id: id,
      },
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchIngredients();
  }, [searchTerm, currentPage]);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="Ingredient"></Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row className="justify-content-between">
              <Col xs={12} sm={12} md={2} lg={2} xl={2}>
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
              </Col>
              <Col md={7}>
                <Row className="product-filter-pl">
                  {data?.ingredients.filter.slice(0, 4).map((item, index) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={2}
                      lg={3}
                      xl={3}
                      key={index}
                      className="col-2-filters"
                      fieldSize="field-select  "
                    >
                      <LabelField
                        type={item.type}
                        option={item.option}
                        placeholder={item.placeholder}
                        labelDir="label-col"
                        fieldSize="field-select  w-sm h-md "
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                className="ingredients-left-btns"
              ></Col>
              <Row>
                {data?.ingredients.filter.slice(-1).map((item, index) => (
                  <Col md={10} sm={12} className="w-60">
                    <LabelField
                      type={item.type}
                      option={item.option}
                      placeholder={item.placeholder}
                      labelDir="label-col"
                      fieldSize="field-select w-200 h-md"
                    />
                  </Col>
                ))}

                <Col md={2} sm={12} className="ingre-btn-w">
                  <div>
                    {/* <button className="add-product-btn-pre">
                        + Bulk create
                      </button> */}
                    <Link to="/create-ingredient">
                      <button className="pm-create-btn w-100">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </div>
                </Col>
              </Row>

              <Col xl={12}>
                <Box className="mc-table-responsive">
                  <Table className="mc-table preparation">
                    <Thead className="mc-table-head">
                      <Tr>
                        <Th>Name</Th>
                        <Th>Unit</Th>
                        <Th>Category</Th>
                        <Th>Cost Price</Th>
                        <Th>Base Unit Weight, Kg</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">
                      {ingredients &&
                        ingredients?.map((item, index) => (
                          <Tr key={index}>
                            {/* <Td>
                              <Box className="mc-table-group  ">
                                <Link
                                  to="/ingredient-details"
                                  state={{ id: `${item.id}` }}
                                >
                                  <Heading as="h6">Ingredient</Heading>
                                </Link>
                              </Box>
                            </Td> */}
                            <Td>{item.name}</Td>
                            <Td>
                              <Box className="mc-table-price">
                                <Text>{item.unit}</Text>
                              </Box>
                            </Td>
                            <Td>
                              <Box className="mc-table-rating">
                                <Text>{item.md_ingredient_id}</Text>
                              </Box>
                            </Td>
                            <Td>{item.cost_price}</Td>
                            <Td>{item.base_unit}</Td>
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
                                      handleDelete(item.md_ingredient_id)
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
                                      handleEdit(item.md_ingredient_id)
                                    }
                                  />
                                </Box>
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
