import React, { useState } from "react";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";

import { Tabs, Tab } from "react-bootstrap";

import ConDishDetailsTab from "../../components/Tabs/ConDishDetailsTab";
import ConDishEmenuTaab from "../../components/Tabs/ConDishEmenuTab";
import ConDishModifier from "../../components/Tabs/ConDishModifier";
import ConDishRecipeTab from "../../components/Tabs/ConDishRecipeTab";
import { Link, useLocation } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModiferProduct() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
                  <Box className="construction-edit">
                    <Box className="construction-edit-h5">
                      <h5>{`Create (Dish -- Expresso)`}</h5>
                    </Box>
                    <Box className="construction-edit-icons">
                      {/* <Box className="edit-icons">
                        <Link to="/manage-modifier" className="addproduct-btn ">
                          Save
                        </Link>

                        <Link to="/manage-modifier" className="addproduct-btn ">
                          Save and Create
                        </Link>
                      </Box> */}
                      <Box className="head-sec-rearrange-right icon-constructure-right">
                        <Box className="rearrange-right">
                          <button className="head-sec-rearrange-btn">
                            <FontAwesomeIcon icon={faCheck} />
                            &nbsp; Save
                          </button>
                          <button className="head-sec-rearrange-btn">
                            <FontAwesomeIcon icon={faCheck} />
                            &nbsp; Save and Create
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="tab1" title="Details">
                  <div className="tabContent additiona-infoTab">
                    <ConDishDetailsTab />
                  </div>
                </Tab>

                <Tab eventKey="tab2" title="Recipe">
                  <div className="tabContent additiona-infoTab">
                    <ConDishRecipeTab />
                  </div>
                </Tab>
                <Tab eventKey="tab3" title="Modifier">
                  <div className="tabContent additiona-infoTab">
                    <ConDishModifier />
                  </div>
                </Tab>
                <Tab eventKey="tab4" title="eMenu">
                  <div className="tabContent additiona-infoTab">
                    <ConDishEmenuTaab />
                  </div>
                </Tab>
              </Tabs>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
