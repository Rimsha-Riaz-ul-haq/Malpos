import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxOpen,
  faCheck,
  faArrowRotateLeft,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CardLayout } from "../../components/cards";
import { Tabs, Tab } from "react-bootstrap";
import ManageModifierGenTab from "../../components/Tabs/ManageModifierGenTab";
import ManageModifierEmenuTab from "../../components/Tabs/ManageModifierEmenuTab";
import { useLocation } from "react-router-dom";
import data from "../../data/master/stations.json";
export default function ManageModifierEdit() {
  const [key, setKey] = useState("tab1");
  const location = useLocation();
  const { id } = location.state;

  return (
    <div>
      {data?.stations.tbody
        .filter((item) => {
          return item.id == id;
        })
        .map((item, i) => (
          <PageLayout>
            <Row>
              <Col md={12}>
                <CardLayout>
                  <Box className="head-sec-rearrange">
                    <Box className="head-sec-rearrange-left">
                      <h3>
                        {item.heading} ({item.item})
                      </h3>
                    </Box>
                    <Box className="head-sec-rearrange-right">
                      <Box className="rearrange-right">
                        <button className="head-sec-rearrange-btn">
                          <FontAwesomeIcon icon={faCheck} />
                          &nbsp; Save
                        </button>
                      </Box>
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
                    <Tab eventKey="tab1" title="General">
                      <div className="tabContent additiona-infoTab">
                        <ManageModifierGenTab data={item} />
                      </div>
                    </Tab>

                    <Tab eventKey="tab5" title="eMenu">
                      <div className="tabContent additiona-infoTab">
                        <ManageModifierEmenuTab data={item} />
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
