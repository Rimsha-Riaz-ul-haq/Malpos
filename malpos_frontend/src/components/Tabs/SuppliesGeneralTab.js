import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import IconSearchBar from "../elements/IconSearchBar";
import MultiSelectNoLabel from "../fields/MultiSelectNoLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faEdit,
  faArrowTurnRight,
  faEllipsis,
  faCopy,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box } from "../elements";
import axiosInstance from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SkeletonCell from "../Skeleton";

export default function SuppliesGeneralTab(props) {
  const { activeTab } = props;
  const [openDot, setOpenDot] = useState({}); // Maintain dot box state for each row
  const [supplyData, setSupplyData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const toggleDotBox = (id) => {
    setOpenDot({ ...openDot, [id]: !openDot[id] }); // Toggle dot box state for the clicked row
  };

  useEffect(() => {
    fetchSupplies()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching supply data", error);
      });
  }, []);

  const fetchSupplies = async () => {
    await axiosInstance
      .get("/md_supplies")
      .then((response) => {
        console.log(response.data.data, "success");
        setSupplyData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching supply data", error);
      });
  };
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];
  const handleSuppliesCreate = () => {
    navigate(`/supplies-edit/`, {
      state: {
        action: "createSupplies",
      },
    });
  };
  const handleSuppliesEdit = (id) => {
    console.log("id: " + id);
    navigate(`/supplies-edit/`, {
      state: {
        id: id,
        action: "updateSupplies",
      },
    });
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={10}>
              <Row>
                <Col md={3}>
                  <IconSearchBar />
                </Col>
                <Col md={2}>
                  <MultiSelectNoLabel options={options} />
                </Col>
                {/* Add more MultiSelectNoLabel components as needed */}
              </Row>
            </Col>
            <Col md={2}>
              <button className="acc-create-btn rs-btn-create">
                <FontAwesomeIcon onClick={handleSuppliesCreate} icon={faPlus} />{" "}
                Create
              </button>
            </Col>
            <Col md={12}>
              <Box className={"cus-ptb"}>
                <Box className={"supplies-gen-table-wrap"}>
                  <Table style={{ width: "1200px" }}>
                    <thead
                      className="thead-dark"
                      style={{ backgroundColor: "#F07632" }}
                    >
                      <tr className="f-12">
                        <th className="th-w50">ID</th>
                        <th className="th-w150">Products</th>
                        <th className="th-w130" title="Operation Time">
                          Operation time
                        </th>
                        <th className="th-w100">Supplier</th>
                        <th className="th-w100">Storage</th>
                        <th className="th-w100">
                          Amount
                          <br />
                          <span style={{ color: "black" }}>9742003 SAR</span>
                        </th>
                        <th className="th-w100">Account</th>
                        <th className="th-w130">Invoice#</th>
                        <th className="th-w100" title="Description">
                          Description
                        </th>
                        <th className="th-w100">Process</th>
                        <th className="th-w100">Status</th>
                        <th className="th-w50"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? // Render skeletons while loading
                          Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td> 
                              <td>
                                <SkeletonCell />
                              </td>
                              
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td> 
                              <td>
                                <SkeletonCell />
                              </td>
                              
                              <td>
                                <SkeletonCell/>
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td> 
                              <td>
                                <SkeletonCell />
                              </td>
                              
                              <td>
                                <SkeletonCell/>
                              </td>
                            </tr>
                          ))
                        : supplyData != undefined &&
                          supplyData.map((supply) => (
                            <tr className="f-13" key={supply.id}>
                              <td className="td-w50">{supply.id}</td>
                              <td className="td-w150">
                                {
                                  supply?.supplies_lines[0]?.product
                                    ?.product_name
                                }
                              </td>
                              <td
                                className="td-w130"
                                title={supply.operation_time}
                              >{`${supply.operation_time.substring(
                                0,
                                10
                              )}...`}</td>
                              <td className="td-w100">
                                {supply?.supplier?.supplier_name}
                              </td>
                              <td className="td-w100">
                                {supply?.storage?.name}
                              </td>
                              <td className="td-w100">{supply?.balance}</td>
                              <td className="td-w100">
                                <span className="unpaid"> Unpaid</span>
                              </td>
                              <td className="td-w130">{supply?.invoice_no}</td>
                              <td
                                className="td-w100"
                                title={supply?.description}
                              >
                                {supply?.description?.length > 8
                                  ? `${supply?.description.substring(0, 8)}...`
                                  : supply?.description}
                              </td>
                              <td className="td-w100">
                                <span className="check">
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    color="#fff"
                                  />{" "}
                                </span>
                              </td>
                              <td className="td-w100">
                                <span className="approved">
                                  {supply.status || "Approved"}
                                </span>
                              </td>
                              <td className="td-w50">
                                <Box className="dot-content">
                                  <div onClick={() => toggleDotBox(supply.id)}>
                                    <FontAwesomeIcon icon={faEllipsis} />{" "}
                                  </div>
                                  {openDot[supply.id] ? (
                                    <Box className="DotBox-main-wrapper">
                                      <Box className="DotBox-inner">
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon
                                            onClick={() =>
                                              handleSuppliesEdit(supply.id)
                                            }
                                            icon={faEdit}
                                          />{" "}
                                          Edit
                                        </Box>
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon
                                            icon={faArrowTurnRight}
                                          />{" "}
                                          Product Return
                                        </Box>
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon icon={faCopy} />{" "}
                                          Duplicate
                                        </Box>
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon icon={faTrash} />{" "}
                                          Remove
                                        </Box>
                                        <Box className="DotBox-p-con">
                                          <FontAwesomeIcon icon={faDownload} />{" "}
                                          Export
                                        </Box>
                                      </Box>
                                    </Box>
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </Table>
                </Box>
              </Box>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
