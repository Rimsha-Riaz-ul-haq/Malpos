import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AccCategories() {
    const [expandedRows, setExpandedRows] = useState([]);

  const data = [
    { id: 1, name: 'John', age: 28, children: [{ id: 4, name: 'Sara', age: 4 }] },
    { id: 2, name: 'Amy', age: 25, children: [] },
    { id: 3, name: 'Bob', age: 42, children: [{ id: 5, name: 'Tom', age: 7 }, { id: 6, name: 'Kate', age: 3 }] },
  ];

  const handleRowClick = (id) => {
    const isRowExpanded = expandedRows.includes(id);
    setExpandedRows(isRowExpanded ? expandedRows.filter(rowId => rowId !== id) : [...expandedRows, id]);
  };
  return (
    <div>
 <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, age, children }) => (
          <React.Fragment key={id}>
            <tr onClick={() => handleRowClick(id)}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
            </tr>
            {expandedRows.includes(id) && children.length > 0 && (
              <tr>
                <td colSpan={3}>
                  <Table>
                    {/* <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {children.map(({ id, name, age }) => (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{name}</td>
                          <td>{age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
    </div>
  )
}
