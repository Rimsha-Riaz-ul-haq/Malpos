import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/preparationList.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomPagination from "../../components/CustomPagination";
import {
  faPlus,
  faSearch,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Input,
  Box,
  Label,
  Heading,
  Text,
} from "../../components/elements";
import PreparationTable from "../../components/tables/PreparationTable";
import instance from "../../api/baseUrl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Preparation() {
  const [prepartions, setPreparations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchAllPreparations = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/preparation", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setPreparations(response.data.data);
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
      const response = await instance.delete(`/preparation_delete/${id}`);
      fetchAllPreparations();
      toast.success("Preparation deleted successfully", { autoClose: 5000 });
    } catch (error) {
      toast.error("Error deleting preparation");
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    navigate("/create-preparation", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    fetchAllPreparations();
  }, [searchTerm, currentPage]);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="Preparation"></Breadcrumb>
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
                    value={searchTerm}
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
              </Col>
              <Col md={7}>
                <Row className="product-filter-pl">
                  {data?.preparation.filter.map((item, index) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={2}
                      lg={3}
                      key={index}
                      className="col-2-filters"
                    >
                      <LabelField
                        type={item.type}
                        // label={item.label}
                        option={item.option}
                        placeholder={item.placeholder}
                        labelDir="label-col"
                        fieldSize="field-select  w-sm h-md "
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col sm={12} md={2} lg={2}>
                <Link to="/create-preparation">
                  <Button className="add-product-btn-pl">
                    <FontAwesomeIcon icon={faPlus} /> Create
                  </Button>
                </Link>
              </Col>

              <Col xl={12}>
                <Box className="mc-table-responsive">
                  <Table className="mc-table preparation text-center">
                    <Thead className="mc-table-head text-center">
                      <Tr>
                        <Th className="text-center">Name</Th>
                        <Th>Unit</Th>
                        <Th>Write Off Method</Th>
                        <Th>BASE UNIT WEIGHT,KG</Th>
                        <Th>Cost Price</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="text-center">
                      {prepartions &&
                        prepartions.map((item, i) => (
                          <Tr>
                            <Th>{item.name}</Th>
                            <Th>{item.recipe_output}</Th>
                            <Th>{item.deleting_method}</Th>
                            <Th>{item.recipe_output}</Th>
                            <Th>{item.total_cost}</Th>
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
                                      handleDelete(item.md_preparation_id)
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
                                      handleEdit(item.md_preparation_id)
                                    }
                                  />
                                </Box>
                              </Box>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                    {/* <Tbody className="mc-table-body even">
          {prepartions && prepartions.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Box className="mc-table-group  ">
                  <Link to="/preparation-view" state={{ id: `${item.id}` }}>
                    <Heading as="h6">Preparations</Heading>
                  </Link>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-price">
                  <Text>{item.unit}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-price">
                  <Text>{item.method}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-rating">
                  <Text>{item.weight}</Text>
                </Box>
              </Td>
              <Td>{item.costPrice}</Td>

              <Td>
                <Box className="mc-table-action">
                  <Link
                    to="/preparation-view"
                    state={{ id: `${item.id}` }}
                    title="View"
                    className="material-icons view"
                  >
                    {item.action.view}
                  </Link>
                  <Link
                    to="/preparation-view"
                    state={{ id: `${item.id}` }}
                    // href="/product-upload"
                    title="Edit"
                    className="material-icons edit"
                  >
                    {item.action.edit}
                  </Link>
                  <Button
                    title="Delete"
                    className="material-icons delete"
                    onClick={() => setAlertModal(true)}
                  >
                    {item.action.delete}
                  </Button>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody> */}
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
