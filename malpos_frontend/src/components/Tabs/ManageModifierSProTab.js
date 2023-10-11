import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ManageModifierSProTab({ data }) {
  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Table>
                <thead className="thead-modifier">
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="modifier-head">
                      <Link to="/modifier-product" state={{ id: `${data.id}` }}>
                        {data.heading}
                      </Link>
                    </td>
                    <td>dish</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
