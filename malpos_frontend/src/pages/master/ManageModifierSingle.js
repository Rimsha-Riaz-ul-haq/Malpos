import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Tabs, Tab } from "react-bootstrap";
import ManageModifierSProTab from "../../components/Tabs/ManageModifierSProTab";
import ManageModifierSModiTab from "./ManageModifierSModiTab";
import { useLocation } from "react-router-dom";
import data from "../../data/master/stations.json";
import { Link } from "react-router-dom";
import { Box } from "../../components/elements";

export default function ManageModifierSingle() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;
  return (
    <div>
      {data?.stations.tbody
        .filter((item) => {
          return item.id === id;
        })
        .map((item, i) => (
          <PageLayout key={i}>
            <Row>
              <Col md={12}>
                <CardLayout>
                  #{item.item} الحجم-145-428
                  <Box className="construction-edit-icons">
                    <Box className="edit-icons">
                      <Link to="/manage-modifier" className="addproduct-btn ">
                        <img
                          className="fas fa-user"
                          src="/images/icons/close1.png"
                          alt="Close"
                        />
                      </Link>
                    </Box>
                  </Box>
                </CardLayout>
              </Col>
              <Col md={12}>
                <CardLayout>
                  <Tabs
                    id="my-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="tab1" title="Product (2)">
                      <div className="tabContent">
                        <ManageModifierSProTab data={item} />
                      </div>
                    </Tab>

                    <Tab eventKey="tab2" title="Modifier (0)">
                      <div className="tabContent">
                        <ManageModifierSModiTab data={item} />
                      </div>
                    </Tab>
                  </Tabs>
                </CardLayout>
              </Col>
            </Row>
          </PageLayout>
        ))}
    </div>
  );
}
