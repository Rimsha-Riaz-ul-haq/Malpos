import React,{useState} from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTrash, faPlus, faEdit, faCheck, faEllipsis, faMinus,faAngleDown, faCopy, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Box } from '../../components/elements'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MultiSelectNoLabel from '../../components/fields/MultiSelectNoLabel'

export default function InventoryCheck() {
    const [openDot, CloseDot] = useState(false);

  const handleDotBox = () => {
    CloseDot(!openDot);
  };
    const[open,setClose]= useState(false)
    const handleStateChange = () =>
    {
        setClose(!open)
    }
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
                        <CardLayout>
                            Inventory check 3
                        </CardLayout>
                    </Col>
                    <Col md={12}>
                        <CardLayout>
                            <Row>
                                <Col md={12}>
                                   
                                    <Row>
                                    <Col md={3}>
                                        <div style={{ position: "relative" }}>
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                className="search-pl"
                                            />
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "10px",
                                                    transform: "translateY(-50%)",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <button type="submit">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </button>
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md={7} className='h-checkBox-acc-col-7'>
                                       
                                            <Box className={'wraper-production-filter'}>
                                            <Box className="receipt-tab">
                                                <Box className="filter-box filter-box-mt-0">
                                                    <Box className="filter-box-item">
                                                        <div onClick={handleStateChange}>
                                                            <span className="filter-box-span">Product </span>
                                                            <span className="filter-box-span-caret">
                                                                <FontAwesomeIcon icon={faAngleDown} />{" "}
                                                            </span>
                                                        </div>
                                                        {open ? (
                                                            <Box className="filter-box-select-opt">
                                                                <Box className="filter-box-select-opt-box">
                                                                    <Box className="filter-box-search">
                                                                        <div
                                                                            style={{
                                                                                position: "relative",
                                                                                height: "34px",
                                                                            }}
                                                                        >
                                                                            <Form.Control
                                                                                type="search"
                                                                                placeholder="Search"
                                                                                className="search-pl"
                                                                            />
                                                                            <span
                                                                                style={{
                                                                                    position: "absolute",
                                                                                    top: "50%",
                                                                                    right: "10px",
                                                                                    transform: "translateY(-50%)",
                                                                                    fontSize: "11px",
                                                                                }}
                                                                            >
                                                                                <button type="submit">
                                                                                    <FontAwesomeIcon icon={faSearch} />
                                                                                </button>
                                                                            </span>
                                                                        </div>
                                                                    </Box>
                                                                    <Box className="filter-box-checkbox-main">
                                                                        <Box className="filter-box-checkbox-div">
                                                                            <Box className="filter-box-checkbox">
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    label="3rd Planet"
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="filter-box-checkbox-div">
                                                                            <Box className="filter-box-checkbox">
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    label="Ethiopoa"
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="filter-box-checkbox-div">
                                                                            <Box className="filter-box-checkbox">
                                                                                <Form.Check type="checkbox" label="Kenya" />
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="filter-box-checkbox-div">
                                                                            <Box className="filter-box-checkbox">
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    label="Familia Chacon"
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className="filter-box-checkbox-div">
                                                                            <Box className="filter-box-checkbox">
                                                                                <Form.Check type="checkbox" label="Kenya" />
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>                     
                                            </Box> 
                                            <Box className={'h-checkBox-acc'}>
                                            <Form.Check
                                            type="checkbox"
                                            label="Show Deleted Accounts"
                                        />
                                        </Box>
                                            {/* <Col md={6} className='h-checkBox-acc-col-6'>
                                                <Box className={'h-checkBox-acc'}>
                                            <Form.Check
                                            type="checkbox"
                                            label="Show Deleted Accounts"
                                        />
                                        </Box>
                                            </Col> */}
                                      
                                    
                                    
                                    </Col>
                                    <Col md={2}>
                                        <Box className={'acc-create-btn-box'}>
                                    <Link to={'/inventory-create'}><button className='acc-create-btn'><FontAwesomeIcon icon={faPlus}/> Create </button></Link>
                                    </Box>
                                    </Col>
                                
                                    <Col md={12}>
                                        <Box className={'inventory-check-table-wrap'}>
                                            <Table className='inventory-table'>
                                                <thead className='thead-dark'>
                                                    <tr>
                                                    <th className='th-w50'>Id</th>
                                                    <th className='th-w120'>Storage</th>
                                                    <th className='th-w120'>Created at</th>
                                                        <th className='th-w120'>Operation time</th>
                                                        <th className='th-w120'>Run time </th>
                                                        <th className='th-w120'>Differnece</th>
                                                        <th className='th-w120'>Inventory Cost</th>
                                                        <th className='th-w100'>Status</th>
                                                        <th className='th-w200'></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    <td className='th-w50'>182</td>
                                                    <td className='th-w120'>مستودع الفرع الرئيسي</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>0.00 SAR</td>
                                                        <td className='th-w120'>0.00 SAR</td>
                                                        <td className='th-w100'>
                                                            <span>
                                                                Approved
                                                            </span>
                                                        </td>
                                                        <td className='th-w200'>
                                                        
                                                            <Box className={'td-left view-dis'}>
                                                            <Box>
                                                            View
                                                            </Box>
                                                                  <Box className="dot-content">
                                                                    
                                                            <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                                            {openDot ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faCopy} /> Duplicate
                                                                        </Box>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faTrash} /> Remove
                                                                        </Box>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faCircleXmark} /> Cannel
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Box>
                                                            </Box>
                                                        </td>
                                                      
                                                    </tr>
                                                    <tr>
                                                    <td className='th-w50'>122</td>
                                                    <td className='th-w120'>المستودع الرئيسي</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>Mar 01, 15:55:54</td>
                                                        <td className='th-w120'>Mar 01, 15:55:54</td>
                                                        <td className='th-w120'>0.00 SAR</td>
                                                        <td className='th-w120'>0.00 SAR</td>
                                                        <td className='th-w100'>
                                                            <span>
                                                                Approved
                                                            </span>
                                                        </td>
                                                        <td className='th-w200'>
                                                            <Box className={'td-left'}>
                                                                View <span><FontAwesomeIcon icon={faEllipsis}/> </span>
                                                            </Box>
                                                        </td>
                                                      
                                                    </tr>
                                                    <tr>
                                                    <td className='th-w50'>182</td>
                                                    <td className='th-w120'>المستودع الرئيسي</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>Mar 19, 15:55:54</td>
                                                        <td className='th-w120'>0.00 SAR</td>
                                                        <td className='th-w120'>0.00 SAR</td>
                                                        <td className='th-w100'>
                                                            <span>
                                                                Approved
                                                            </span>
                                                        </td>
                                                        <td className='th-w200'>
                                                            <Box className={'td-left'}>
                                                                View <span><FontAwesomeIcon icon={faEllipsis}/> </span>
                                                            </Box>
                                                        </td>
                                                      
                                                    </tr>
                                                    
                                                </tbody>
                                            </Table>
                                        </Box>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardLayout>

                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
