import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Box } from "../elements";

export default function ReceiptEditReturnTab() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Box className="product-return-table-wrap">
            <Table>
              <thead className="thead-modifier">
                <tr>
                  <th>Id</th>
                  <th>Waiter</th>
                  <th>Amount</th>
                  <th>Operated at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>41</td>
                  <td>TIS Software</td>
                  <td>15.00</td>
                  <td>2023-03-16T11:41:35.000000Z</td>
                </tr>
              </tbody>
              {/* table body remaning */}
            </Table>
          </Box>
        </Col>
      </Row>
    </div>
  );
}
