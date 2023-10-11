import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { CardLayout } from '../../components/cards';
import { LabelField } from '../../components/fields';
import PageLayout from '../../layouts/PageLayout';
import axiosInstance from '../../api/baseUrl';
import { toast } from 'react-toastify';
import { useProduct } from "../../components/createProduct/productContext";
import { Link } from 'react-router-dom';

export default function StorageCreate() {
    const {
        form
      } = useProduct();
      const [newStorage, setNewStorage] = useState({
        name: '',
        is_active: 1,
        cd_client_id: form.cd_client_id,
        cd_brand_id: form.cd_brand_id, // Add the cd_brand_id field
        cd_branch_id: form.cd_branch_id, // Add the cd_branch_id field
      });
    
  const handleCreateStorage = () => {
    // Validate the data, if needed

    axiosInstance
      .post('/md_storage', newStorage) // Use POST for creating a new storage
      .then((response) => {
        toast.success('Storage created successfully', {
          position: 'top-right',
          autoClose: 3000,
        });

        console.log('Storage created successfully', response.data);
        // You can handle success, e.g., show a success message or navigate to another page.
      })
      .catch((error) => {
        toast.error('Error creating storage', {
          position: 'top-right',
          autoClose: 3000,
        });

        console.error('Error creating storage', error);
        // Handle the error, e.g., show an error message.
      });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
          <Col md={12}>
            Storage Create
          </Col>
                <Col md={6}>
                  <LabelField
                    type="text"
                    style={{marginBottom:'1rem' }}
                    label={'Name'}
                    value={newStorage.name}
                    onChange={(e) => setNewStorage({ ...newStorage, name: e.target.value })}
                    placeholder={'Name'}
                  />
                  <Form.Check
                  style={{marginBottom:'1rem' }}
                    type="switch"
                    label="Status"
                    checked={newStorage.is_active === 1}
                    onChange={() => setNewStorage({ ...newStorage, is_active: newStorage.is_active === 1 ? 0 : 1 })}
                  />
                  <Link to={"/Storage"}>
                  <Button variant="primary" onClick={handleCreateStorage}>
                    Create
                  </Button></Link>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
