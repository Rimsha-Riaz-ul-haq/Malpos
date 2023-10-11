import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/EmenuList.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import EmenuTable from "../../components/tables/EmenuTable";
import { Heading } from "../../components/elements";

export default function EmenuList() {
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            {/* <Breadcrumb title={data?.pageTitle}>
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
            </Breadcrumb> */}
            <Heading>
              {data.pageTitle} &nbsp;&nbsp;
              {data.product.tbody.length}
            </Heading>
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
                <Col md={3}>
                  <MultiSelectNoLabel
                    label="Category"
                    options={[
                      { label: "Espresso ", value: "Espresso" },
                      {
                        label: "filter Coffee ",
                        value: "filter Coffee",
                      },
                      {
                        label: "Organic Tea ",
                        value: "Organic Tea",
                      },
                    ]}
                  />
                </Col>
              </Col>
              <Col sm={12} md={2} lg={2}>
                <LabelField
                  option={["Bulk actions", "Edit"]}
                  fieldSize="w-100 h-md"
                  style={{ backgroundSize: "15px" }}
                />
              </Col>

              <Col xl={12}>
                <EmenuTable />
                <Pagination />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
