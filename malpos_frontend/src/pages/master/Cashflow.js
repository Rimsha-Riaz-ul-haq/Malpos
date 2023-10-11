import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Form, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import MultiSelectField from "../../components/fields/MultiSelectField";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import PageLayout from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
export default function Cashflow() {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState([]);
  const data = [
    {
      id: "Expence",
      name: "0.000 SAR",
      age: "0.000 SAR",
      children: [{ id: "Bonus", name: "0.000 SAR", age: "0.000 SAR" }],
    },
    { id: "Fund", name: "0.000 SAR", age: "0.000 SAR", children: [] },
    {
      id: "Out fund",
      name: "0.000 SAR",
      age: "0.000 SAR",
      children: [
        { id: "Other Expeence", name: "0.000 SAR", age: "0.000 SAR" },
        { id: "Material", name: "0.000 SAR", age: "0.000 SAR" },
      ],
    },
  ];

  const handleRowClick = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };
  useEffect(() => {
    // Extract the IDs from the data array
    const rowIds = data.map((row) => row.id);
    // Set the expandedRows state to the array of IDs
    setExpandedRows(rowIds);
  }, []);
  const handleCell = () => {
    navigate("/cashflow-transactions");
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
            <Col >
             <div   className="d-flex justify-content-between align-items-center" style={{marginBottom:" 1rem"}}>
                <h5 >Cashflow</h5>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>{" "}
              </div></Col>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={2}>
                      <LabelField
                        option={["Balance", "Cash", "Card", "Bank"]}
                        fieldSize="w-100 h-md"
                      />
                    </Col>

                    <Col md={2}>
                      <LabelField
                        option={["Day", "Month", "Year"]}
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={8} className="col-md-8-checkbox-cashflow">
                      <Box className={"h-checkBox-cashflow"}>
                        <Form.Check
                        style={{fontSize:" 0.7rem"}}
                          type="checkbox"
                          label="Hide Empty Reports"
                        />
                      </Box>
                      <Box className={"h-checkBox-cashflow"}>
                        <Form.Check type="checkbox" label="Hide Transfer"  style={{fontSize:" 0.7rem"}}/>
                      </Box>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={12} lg={6}>
                      <Table className="cashflow-Table" bordered>
                        <thead className="" style={{backgroundColor:'#F07632'}} >
                          <tr>
                            <th className="th-w50">Category</th>
                            <th className="th-w25 text-end">February</th>
                            <th className="th-w25 text-end">March</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map(({ id, name, age, children }) => (
                            <React.Fragment key={id}>
                              <tr className="p-tr-cf">
                                <td className="td-w60">{id}</td>
                                <td
                                  className="td-w20 text-end"
                                  onDoubleClick={handleCell}
                                >
                                  {name}
                                  <span>
                                    <FontAwesomeIcon icon={faCaretDown} />{" "}
                                  </span>
                                </td>
                                <td
                                  className="td-w20 text-end"
                                  onDoubleClick={handleCell}
                                >
                                  {age}
                                  <span>
                                    <FontAwesomeIcon icon={faCaretDown} />{" "}
                                  </span>
                                </td>
                              </tr>
                              {expandedRows.includes(id) &&
                                children.length > 0 && (
                                  <>
                                    {children.map(({ id, name, age }) => (
                                      <tr key={id}>
                                        <td>
                                          <Box className={"child-td-box"}>
                                            {id}
                                          </Box>
                                        </td>
                                        <td
                                          className="text-end"
                                          onDoubleClick={handleCell}
                                        >
                                          {name}
                                          <span>
                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />{" "}
                                          </span>
                                        </td>
                                        <td
                                          className="text-end"
                                          onDoubleClick={handleCell}
                                        >
                                          {age}
                                          <span>
                                            <FontAwesomeIcon
                                              icon={faCaretDown}
                                            />{" "}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </>
                                )}
                              <tr>
                                <td>Total Expense</td>
                                <td className="text-end">0.00 SAR</td>
                                <td
                                  className="text-end"
                                  style={{ color: "#f29b30" }}
                                >
                                  0.00 SAR
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
