import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
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
import IngredientsDetails from "../Tabs/IngredientsDetails";

export default function IngredientsTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table preparation">
        <Thead className="mc-table-head">
          <Tr>
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Box className="mc-table-group  ">
                  <Link to="/ingredient-details" state={{ id: `${item.id}` }}>
                    <Heading as="h6">{item.heading}</Heading>
                  </Link>
                </Box>
              </Td>
              <Td>{item.unit}</Td>
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
                    to="/ingredient-details"
                    state={{ id: `${item.id}` }}
                    title="View"
                    className="material-icons view"
                  >
                    {item.action.view}
                  </Link>
                  <Link
                    to="/ingredient-details"
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
        </Tbody>
      </Table>

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
              onClick={() => setAlertModal(false)}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
