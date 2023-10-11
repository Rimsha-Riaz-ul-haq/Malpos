import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import data from "../../data/master/EmenuList.json";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function EmenuTable() {
  const [alertModal, setAlertModal] = useState(false);
  const [items, setItems] = useState(data.product.tbody);
  const [idToDelete, setIdToDelete] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDeleteClick = (itemId) => {
    setIdToDelete(itemId);
    setAlertModal(true);
  };

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
    setAlertModal(false);
  }
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table product">
        <Thead className="mc-table-head dark">
          <Tr>
            {data.product.thead.map((item, i) => (
              <Th key={i}>
                {item === "name" || item === "type" ? (
                  <div>
                    {item}
                    <button
                      className="sorting-icon"
                      style={{ marginLeft: "10px" }}
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </div>
                ) : (
                  item
                )}
              </Th>
            ))}
            <th>---</th>
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {items?.map((item, i) => (
            <Tr key={i}>
              <Td>
                <Box className="mc-table-product md">
                  <Image src={item.src} alt={item.alt} />
                  {/* <Box className="mc-table-group">
                    <Link to="/product-view" state={{ id: `${item.id}` }}>
                    <Heading as="h6">{item.heading}</Heading>
                    </Link>

                    <Text>{item.descrip}</Text>
                  </Box> */}
                </Box>
              </Td>
              <Td>{item.heading}</Td>
              <Td>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label=""
                  defaultChecked
                  //   checked={item.show}
                />
              </Td>

              <Td>{item.category}</Td>
              <Td>
                <Box className="mc-table-price">
                  <Text>{item.category}</Text>
                </Box>
              </Td>
              <Td>{item.heading}</Td>
              <Td>
                <Box className="mc-table-rating">
                  <Text>{item.description}</Text>
                </Box>
              </Td>
              <Td>{item.description}</Td>
              <Td>{item.type}</Td>

              <Td>
                <Box className="mc-table-action">
                  <Link
                    to="/constructure-dish"
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
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    {item.action.delete}
                  </Button>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Modal show={alertModal} onHide={() => setAlertModal(false)}>
          <Box className="mc-alert-modal">
            <Icon type="new_releases" />
            <Heading as="h3">are your sure!</Heading>
            <Text as="p">Want to delete this product?</Text>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => setAlertModal(false)}
              >
                nop, close
              </Button>
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(idToDelete)}
              >
                yes, delete
              </Button>
            </Modal.Footer>
          </Box>
        </Modal>
      </Table>
    </Box>
  );
}
