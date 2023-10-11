import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import { Table } from "../elements/Table";
import { Col, Row, Table } from "react-bootstrap";
import data from "../../data/master/stations.json";
import { faEdit, faTrash, faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Box, Text, Icon, Button } from "../elements";
import { Link } from "react-router-dom";

export default function ModifierTable() {
  const [alertModal, setAlertModal] = useState(false);
  const [items, setItems] = useState(data.stations.tbody);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItem, setSelectedItem] = useState(null);
  const [idToDelete, setIdToDelete] = useState();

  const handleCloseModal = () => {
    setAlertModal(false);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleWindow = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const handleDeleteClick = (itemId) => {
    setIdToDelete(itemId);
    setAlertModal(true);
  };

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
    setAlertModal(false);
  }

  return (
    <Box className="tabContent station-table-sc">
      <Col md={12}>
        <Row>
          <Col md={12}>
            <Table responsive>
              <thead className="mc-table-head dark">
                <tr>
                  <th>ID</th>
                  <th>
                    Name{" "}
                    <button className="sorting-icon" onClick={toggleSortOrder}>
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </th>
                  <th >
                    Max select
                    <button className="sorting-icon" onClick={toggleSortOrder}>
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </th>
                  <th >
                    Min select
                    <button className="sorting-icon" onClick={toggleSortOrder}>
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </th>
                  <th >
                    Several
                    <button className="sorting-icon" onClick={toggleSortOrder}>
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </th>
                  <th >...</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.item}</td>
                    <td className="td-left modifier-head">
                      <Link
                        to="/manage-modifier-product"
                        state={{ id: `${item.id}` }}
                      >
                        {item.heading}
                      </Link>
                    </td>
                    {/* <td>{item.count}</td> */}
                    <td>{item.max}</td>
                    <td>{item.min}</td>
                    <td>{item.several}</td>
                    <td className="text-end-td ">
                      <button
                        onClick={() => handleWindow(item)}
                        className="accounts-Tab-dot-box Tab-dot-box"
                      >
                        {selectedItem === item && (
                          <Box
                            className="dot-box-details"
                            style={{ height: "85px" }}
                          >
                            <Box className="inner-dot-box-details">
                              <Box className="inner-dot-box-item">
                                <Link
                                  to="/manage-modifier-edit"
                                  state={{ id: `${item.id}` }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                  Edit
                                </Link>
                              </Box>
                              <Box className="inner-dot-box-item dot-box-item-border">
                                <Link
                                  to="/manage-modifier-duplicate"
                                  state={{ id: `${item.id}` }}
                                >
                                  {" "}
                                  <FontAwesomeIcon icon={faClone} />
                                  Duplicate
                                </Link>
                              </Box>
                              <Box className="inner-dot-box-item">
                                <Button
                                  onClick={() => handleDeleteClick(item.id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  Remove
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        ...
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Box className="mc-alert-modal">
                  <Icon type="new_releases" />
                  <Heading as="h3">are your sure!</Heading>
                  <Text as="p">Want to delete this product?</Text>
                  <Modal.Footer>
                    <Button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      nop, close
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(idToDelete)}

                      // onClick={handleCloseModal}
                    >
                      yes, delete
                    </Button>
                  </Modal.Footer>
                </Box>
              </Modal>
            </Table>
          </Col>
        </Row>
      </Col>
    </Box>
  );
}
