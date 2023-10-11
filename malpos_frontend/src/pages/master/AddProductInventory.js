import React,{useState} from 'react'
import { Col, Row,ListGroup } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'

export default function AddProductInventory() {
    const [items, setItems] = useState([
        { id: 1, label: 'Item 1', checked: false },
        { id: 2, label: 'Item 2', checked: false },
        { id: 3, label: 'Item 3', checked: false },
        { id: 4, label: 'Item 4', checked: false },
      ]);
    
      const handleCheckboxChange = (itemId) => {
        const updatedItems = items.map((item) => {
          if (item.id === itemId) {
            return { ...item, checked: !item.checked };
          }
          return item;
        });
        setItems(updatedItems);
      };
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                        Product
                    </CardLayout>
                </Col>
                <Col md={12}>
                    <CardLayout>
                    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item key={item.id}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <label className="form-check-label">{item.label}</label>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
