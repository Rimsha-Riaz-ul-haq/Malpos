import React, { useState, useEffect } from "react";

import { Row, Col, Form } from "react-bootstrap";
import data from "../../../data/productGroup.json";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../elements/Table";
import { Pagination, Breadcrumb } from "../../../components/";
import { CardLayout } from "../../cards";
import PageLayout from "../../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
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
export default function ProductGroups() {
  const [items, setItems] = useState(data.product.tbody);

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
          <Col sm={12} md={2} lg={2} className="justify-content-between">
            <Link to={"/create-group"}>
              <Button className="add-product-btn-pl">+ Create</Button>{" "}
            </Link>
          </Col>
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
                  {data.product.thead.map((item, i) => (
                    <Th key={i}>{item}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody className="mc-table-body even">
                {items?.map((item, i) => (
                  <Tr key={i}>
                    <Td>
                      <Box className="mc-table-check">
                        <Text>{item.item}</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box className="mc-table-product md">
                        <Image src={item.src} alt={item.alt} />
                        <Box className="mc-table-group">
                          <Link to="/product-view" state={{ id: `${item.id}` }}>
                            <Heading as="h6">{item.heading}</Heading>
                          </Link>

                          {/* <Text>{item.descrip}</Text> */}
                        </Box>
                      </Box>
                    </Td>
                    <Td>{item.client}</Td>
                    <Td>{item.brand}</Td>
                    <Td>{item.branch}</Td>
                    <Td>
                      <Box>
                        <Text>{item.desc}</Text>
                      </Box>
                    </Td>

                    <Td>
                      <Box className="mc-table-action">
                        <Link
                          to="/create-group"
                          state={{ id: `${item.id}` }}
                          title="View"
                          className="material-icons view"
                        >
                          {item.action.view}
                        </Link>
                        <Link
                          to="/product-view"
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
                        >
                          {item.action.delete}
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination />
          </Box>
        </Row>
      </CardLayout>
    </PageLayout>
  );
}
