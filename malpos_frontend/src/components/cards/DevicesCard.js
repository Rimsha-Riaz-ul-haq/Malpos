import React, { useState } from "react";
import { IconField } from "../fields";
import { DevicesChart, OrdersChart } from "../charts";
import { Box, Button, Heading } from "../elements";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import data from "../../data/master/ecommerce.json";
import { Icon } from "../elements";
import { Pie } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faChartPie } from "@fortawesome/free-solid-svg-icons";
export default function TabsDeviceCard({
  pageTitle,
  title,
  icon,
  option,
  chart,
}) {
  const [activeKey, setActiveKey] = useState("pie");

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  const handleChartButtonClick = () => {
    setActiveKey("chart");
  };

  const handlePieButtonClick = () => {
    setActiveKey("pie");
  };

  return (
    <>
      <Box className="mc-card">
        {/* <Box className=""> */}
        <Tabs activeKey={activeKey} onSelect={handleSelect} className="mb-3">
          <Tab
            eventKey="chart"
            className={activeKey === "chart" ? "active" : ""}
          >
            <Box className="mc-devices-card-head">
              <Heading as="h5">{title}</Heading>
              <div>
                <Button
                  className={"chart-button"}
                  onClick={handlePieButtonClick}
                >
                  {/* <img
                    className="fas fa-user"
                    src="/images/icons/pie-chart.png"
                  /> */}
                  <FontAwesomeIcon icon={faChartPie} color="#ee3432" />
                </Button>
                <Button
                  className={"chart-button"}
                  onClick={handleChartButtonClick}
                >
                  {/* <img className="fas fa-user" src="/images/icons/chart.png" /> */}
                  <FontAwesomeIcon icon={faChartColumn} color="#f29b30" />
                </Button>
              </div>
            </Box>
            <DevicesChart chart={chart} />
          </Tab>
          <Tab eventKey="pie" className={activeKey === "pie" ? "active" : ""}>
            <Box className="mc-devices-card-head">
              <Heading as="h5">{title}</Heading>
              <div>
                <Button
                  className={"chart-button"}
                  onClick={handleChartButtonClick}
                >
                  <FontAwesomeIcon icon={faChartColumn} color="#f29b30" />

                  {/* <img className="fas fa-user" src="/images/icons/chart.png" /> */}
                </Button>
                <Button
                  className={"chart-button"}
                  onClick={handlePieButtonClick}
                >
                  {/* <img
                    className="fas fa-user"
                    src="/images/icons/pie-chart.png"
                  /> */}
                  <FontAwesomeIcon icon={faChartPie} color="#ee3432" />
                </Button>
              </div>
            </Box>
            <OrdersChart chart={data?.orders.items} />
          </Tab>
        </Tabs>
      </Box>
      {/* </Box> */}
    </>
  );
}
