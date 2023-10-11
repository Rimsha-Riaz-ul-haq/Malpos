import React from "react";
import { Col, Row, Table } from "react-bootstrap";

export default function ManageModifierSModiTab({ data }) {
  return (
    <div>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Table>
                <thead className="thead-modifier">
                  <tr>
                    <th>#Modifier</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>297</td>
                    <td>Large</td>
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
