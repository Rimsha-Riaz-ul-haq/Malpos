import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "../../components/elements/Table";
import { Box } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import IconSearchBar from "../../components/elements/IconSearchBar";
import axiosInstance from "../../api/baseUrl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 


// import "./ManageModifers.css";
import CustomPagination from "../../components/CustomPagination";

export default function ModifiersTable() {
  const [modifiers, setModifiers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);
  const [formData, setFormData] = useState({
    cd_client_id: "1",
    cd_brand_id: "1",
    cd_branch_id: "1",
    is_active: "1",
    name: "",
    min_select: "",
    max_select: "",
    modifier_type: "",
    created_by: "1",
    updated_by: "1",
    submodifierData: [],
  });

  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleRadioChange = (e) => setSelectedOption(e.target.value);

  const fetchModifiers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/modifier", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      console.log(response);
      setModifiers(response.data.modifier.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate("/modifier-update", {
      state: {
        id: id,
      },
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/modifier_delete/${id}`);
      toast.success("Modifier deleted successfully", { autoClose: 5000 });
      console.log(response);
      fetchModifiers();
    } catch (error) {
      toast.error("Error deleting modifier", { autoClose: 500 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`modifier_store`, formData);
      toast.success("Modifier created successfully");
      fetchModifiers();
    } catch (error) {
      toast.error("Error creating modifier");
    }
    console.log(formData);
  };

  useEffect(() => {
    fetchModifiers();
  }, [searchTerm, currentPage]);

  useEffect(() => {
    setFormData({
      ...formData,
      name: name,
      min_select: minNumber,
      max_select: maxNumber,
      modifier_type: selectedOption,
    });
  }, [name, minNumber, maxNumber, selectedOption]);
  return (
    <>
      <Row>
        <Col md={12}>
          <CardLayout>
            <Row>
              <Col md={12}>
                <h3>Manage modifiers</h3>
              </Col>
            </Row>
          </CardLayout>
        </Col>
        <Col md={12}>
          <CardLayout>
            <Row>
              <Col md={9} lg={10}>
                <Row>
                  <Col md={4} lg={3}>
                    <IconSearchBar placeholder={"Search"} />
                  </Col>
                </Row>
              </Col>
              <Col md={3} lg={2}>
                <Row>
                  <Col md={12}>
                    <Col md={6} sm={12}>
                      {" "}
                      <div onClick={handleOpenModal}>
                        <button className="pm-create-btn w-100">
                          <FontAwesomeIcon icon={faPlus} /> Create
                        </button>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <Box className="table-menuCat">
                    <Col md={12}>
                      <Box className="mc-table-responsive">
                        <Col md={12}>
                          <Row>
                            <Col md={12}>
                              <Table className="mc-table product">
                                <Thead className="mc-table-head">
                                  <Tr>
                                    <Th className="text-center">Id</Th>
                                    <Th className="text-center">Name </Th>
                                    <Th className="text-center">Max Select</Th>
                                    <Th className="text-center">Min Select</Th>
                                    {/* <Th className="text-center">Count</Th> */}
                                    <Th className="text-center">Active</Th>
                                    {/* <Th className="text-center">Station Reminder</Th> */}
                                    <Th className="text-center">Actions</Th>
                                  </Tr>
                                </Thead>
                                <Tbody className="mc-table-body even text-center">
                                  {modifiers &&
                                    modifiers.map((item, i) => (
                                      <Tr key={i + 1}>
                                        <Td>{i}</Td>
                                        <Td className="td-left">{item.name}</Td>
                                        <Td>{item.max_select}</Td>
                                        <Td>{item.min_select}</Td>
                                        <Td>
                                          {item.is_active === 1 ? (
                                            <span style={{ color: "green" }}>
                                              &#10004;
                                            </span>
                                          ) : (
                                            <span style={{ color: "red" }}>
                                              &#10008;
                                            </span>
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
                                                    item.md_modifier_id
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
                                                    item.md_modifier_id
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
                  </Box>
                </Col>
              </Row>
            </Col>
          </CardLayout>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Modifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <p className="min-description">
                  How many modifiers can be chosen <br /> at the same time:{" "}
                </p>
              </label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="One"
                  name="One"
                  value="One"
                  checked={selectedOption === "One"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="option1">
                  One
                  <p className="radio-description">
                    Choose one option from several. For example, pizza diameter.
                  </p>
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="several"
                  name="several"
                  value="several"
                  checked={selectedOption === "several"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="several">
                  Several
                  <p className="radio-description">
                    Any number in the given range. For example, toppings on a
                    pizza.
                  </p>
                </label>
              </div>
            </div>

            {selectedOption === "several" && (
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="minInput" className="form-label">
                    Min
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="minInput"
                    value={minNumber}
                    onChange={(e) => setMinNumber(e.target.value)}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="maxInput" className="form-label">
                    Max
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="maxInput"
                    value={maxNumber}
                    onChange={(e) => setMaxNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
