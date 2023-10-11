import React, {useState, useEffect, useRef} from 'react'
import { Col,Row, Form } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSave } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function AccountCategoryedit  () {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleNameBlur() {
    setNameTouched(true);
  }

  return (
    <div>
   <PageLayout>
            <Row>
                <Col md={12}>
                    <CardLayout>
                <Col md={12} style={{marginBottom:"2rem"}} >
                   
                        Chart of Account / Edit
      
                </Col>
                        <Row>
                            <Col md={12}>
                                <Row>
                                <Col md={4} >
                      <LabelFieldS
                        label=" code"
                        type="number"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        className="m-0"
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        isInvalid={nameTouched && name.trim() === ""}
                        ref={nameInputRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        Must not be empty
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={4}  >
                      <LabelFieldS
                        label=" Type"
                        option={[
                          { label: "Assets", value: null },
                          { label: "Libility", value: null },
                          { label: "Owner", value: null },
                          { label: "Equity", value: null },
                          { label: "Expense", value: null },
                          { label: "Revenue", value: null },
                          
                        ]}
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}  >
                      <LabelFieldS
                      type="text"
                        label=" Parent_Account"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}  >
                      <LabelFieldS
                        label=" Seqno"
                        type="number"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}  >
                      <LabelFieldS
                        label=" Summary"
                        fieldSize="w-100 h-md"
                        option={[
                          { label: "Yes", value: null },
                          { label: "No", value: null },
                          
                        ]}
                    />
                    </Col>                        
                      </Row>               
                        </Col>                
                        <Link to={"/account-categories"}>
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

 
