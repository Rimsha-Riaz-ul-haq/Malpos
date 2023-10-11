import React, { useState } from 'react'
import { Col, Row, Table, Form } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import IconSearchBar from '../../components/elements/IconSearchBar'
import MultiSelectNoLabel from '../../components/fields/MultiSelectNoLabel'
import PageLayout from '../../layouts/PageLayout'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsis, faEdit, faCheck, faSearch, faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Box } from '../../components/elements'
export default function Production() {
    const [open, Close] = useState(false);

    const handleDotBox = () => {
        Close(!open);
    };
    const [state, setState] = useState({
        showOption: false,
        productOpen: false,
        storageOpen: false,
        accountOpen: false,
        typeOpen: false,
        categoryOpen: false,
    });
    const handleStateChange = (key) => {
        setState((prevState) => {
            const newState = {};
            Object.keys(prevState).forEach((k) => {
                newState[k] = k === key ? !prevState[k] : false;
            });
            return newState;
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
                            Production
                    </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={3}>
                                            <IconSearchBar />
                                        </Col>
                                        <Col md={3}>
                                            <Box className={'wraper-production-filter'}>
                                                <Box className="receipt-tab">
                                                    <Box className="filter-box filter-box-mt-0">
                                                        <Box className="filter-box-item">
                                                            <div onClick={() => handleStateChange("productOpen")}>
                                                                <span className="filter-box-span">Product </span>
                                                                <span className="filter-box-span-caret">
                                                                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                                                                </span>
                                                            </div>
                                                            {state.productOpen ? (
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
                                        </Col>
                                        <Col md={6}>
                                            <Link to={''} style={{ float: "right" }} ><button className='acc-create-btn rs-btn-create'><FontAwesomeIcon icon={faPlus} /> Create </button></Link>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Box className={'productionTable-wrap'}>
                                        <Table>
                                            <thead className='thead-dark'>
                                                <tr>
                                                    <th className='th-w10'>Id</th>
                                                    <th className='th-w30'> Product</th>
                                                    <th className='th-w15'>Operated at</th>
                                                    <th className='th-w15'>Process</th>
                                                    <th className='th-w15'>Storage</th>
                                                    <th className='th-w15'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='td-w10'><Link className='link' to={'/production-details'}> 24324</Link></td>
                                                    <td className='td-w30'>TERIYAKI SAUCE SUB(2 kg)</td>
                                                    <td className='td-w15'>Mar 20, 19:23:42</td>
                                                    <td className='td-w15'>
                                                        <span className='span-g-check' >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </span>
                                                    </td>
                                                    <td className='td-w15'>المستودع الرئيسي</td>
                                                    <td className='td-w15'>
                                                        <Box className="dot-content">
                                                            <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                                            {open ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                                        </Box>
                                                                        <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Box>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Box>
                                </Col>
                            </Row>
                        </CardLayout>
                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
