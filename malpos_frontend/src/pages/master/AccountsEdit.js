import React from 'react'
import { Col,Row } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSave } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"

import { LabelField } from '../../components/fields'
export default function AccountsEdit() {
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                        <Row>
                <Col md={12}>                 
                        Accounts / Edit
                </Col>
                            <Col md={11}>
                                <Row>
                                    <Col md={6}>
                                    <LabelField
                label="Name"
                type="text"
                placeholder="Name"
                fieldSize="w-100 h-md"
              />
                            </Col>
                            <Col md={6}>
                            <LabelField
                label="Type"
                type="text"
                placeholder="Type"
                fieldSize="w-100 h-md"
              />
                            </Col>
                            <Col md={6}>
                            <LabelField
                label="Amount"
                type="number"
                placeholder="0"
                fieldSize="w-100 h-md"
                disabled
              />
                                    </Col>
                                </Row>
                 
                        </Col>                
                        <Link to={"/accounts"}>
                      <button className="acc-create-btn">
                        <FontAwesomeIcon icon={faSave} /> {" "}Save
                      </button>
                    </Link>
                    
                        </Row>
                    </CardLayout>
                </Col>

            </Row>
        </PageLayout>
    </div>
  )
}
