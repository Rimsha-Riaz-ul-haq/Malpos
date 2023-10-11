import React from "react";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Box, Image } from "../../components/elements";
import { Dropdown } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuSelectCard from "../../components/newComponents/MenuSelectCard/MenuSelectCard";
import {
  faGripVertical,
  faCaretRight,
  faCaretDown,
  faMagnifyingGlass,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBars,
  faPlus,
  faFile,
  faBoxOpen,
  faCheck,
  faArrowRotateLeft,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { Anchor, Heading, Text, Icon, Button } from "../../components/elements";
export default function Constructure() {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [toggleArrowIcon, setToggleArrowIcon] = useState(true);
  const [open, setIsOpen] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleArrowToggle = () => {
    setToggleArrowIcon(!toggleArrowIcon);
  };

  const handleWindow = () => {
    setIsOpen(!open);
  };

  const handleMenuItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prevItems) => prevItems.filter((i) => i !== item));
    } else {
      setSelectedItems((prevItems) => [...prevItems, item].sort());
    }
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "500px" }}>Menu Constructor</h3>
                </Box>
                <Box className="head-sec-rearrange-right icon-constructure-right">
                  <Box className="rearrange-right">
                    <button className="head-sec-rearrange-btn">
                      <FontAwesomeIcon icon={faCheck} />
                      &nbsp; Save
                    </button>
                  </Box>
                </Box>
              </Box>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Box className="cardLayout-padding">
                <Row>
                  <Col md={4} lg={3}>
                    <Box className="constructure-menu-list">
                      <h6>Menu</h6>
                      <Box className="constructure-menu">
                        <span
                          className="constructure-menu-dots"
                          id="constructure-menu-dots"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faGripVertical} />
                        </span>
                        <span
                          className="constructure-menu-arrow"
                          onClick={handleArrowToggle}
                        >
                          {toggleArrowIcon ? (
                            <FontAwesomeIcon icon={faCaretRight} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )}
                        </span>
                        <span
                          className="constructure-menu-text"
                          onClick={handleArrowToggle}
                        >
                          {" "}
                          <span onClick={() => handleMenuItemClick("Espresso")}>
                            Expresso
                          </span>
                        </span>
                      </Box>
                      {toggleArrowIcon ? (
                        ""
                      ) : (
                        <>
                          <Box className="constructure-menu-list-items">
                            <span
                              className="constructure-menu-list-item-dots"
                              id="constructure-menu-dots"
                            >
                              {" "}
                              <FontAwesomeIcon icon={faGripVertical} />
                            </span>
                            <span
                              className="constructure-menu-list-item-text"
                              onClick={() => handleMenuItemClick("Macchiato")}
                            >
                              {" "}
                              Macchiato
                            </span>
                          </Box>
                          <Box className="constructure-menu-list-items">
                            <span className="constructure-menu-list-item-dots">
                              {" "}
                              <FontAwesomeIcon icon={faGripVertical} />
                            </span>
                            <span
                              className="constructure-menu-list-item-text"
                              onClick={() => handleMenuItemClick("Flat White")}
                            >
                              {" "}
                              Flat White
                            </span>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Col>
                  <Col md={8} lg={7}>
                    <Row>
                      <Col md={12}>
                        <Box className="searchBar-constructure">
                          <span className="searchBar-constructure-icon-search">
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              type="submit"
                            />
                          </span>
                          <input type="search" placeholder="search ...." />
                        </Box>
                      </Col>
                      <Col md={12}>
                        {/* <Box className="searchBar-constructure-details-p">
                          <Box className="searchBar-constructure-details">
                            <Box className="searchBar-constructure-details-left">
                              <span className="constructure-details-icon">
                                <FontAwesomeIcon icon={faGripVertical} />
                              </span>
                              <span className="constructure-details-image">
                                <img
                                  src="/images/product/expresso.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="constructure-details-icon-dot">
                                <FontAwesomeIcon icon={faCircleDot} />
                              </span>
                            </Box>
                            <Box className="searchBar-constructure-details-center">
                              {selectedItems.map((item) => (
                                <span
                                  className="constructure-details-text"
                                  key={item}
                                >
                                  {item}
                                </span>
                              ))}
                            </Box>

                            <Box className="searchBar-constructure-details-right">
                              <span className="constructure-details-options">
                                <Link to={"/constructure-edit"}>
                                  {" "}
                                  <span>
                                    <FontAwesomeIcon icon={faPenToSquare} />{" "}
                                  </span>
                                </Link>
                                <span className="constructure-details-options-edit">
                                  <FontAwesomeIcon
                                    onClick={handleWindow}
                                    icon={faPlus}
                                  />
                                  {open ? (
                                    <Box className="dotsmenu">
                                      <Box className="dotsmenu-inner">
                                        <Link to={"/constructure-product"}>
                                          <Box className="dotsmenu-items">
                                            <FontAwesomeIcon icon={faFile} />{" "}
                                            &nbsp;Product
                                          </Box>
                                        </Link>
                                        <Link to={"/constructure-dish"}>
                                          <Box className="dotsmenu-items">
                                            <FontAwesomeIcon icon={faFile} />{" "}
                                            &nbsp;Dish
                                          </Box>
                                        </Link>
                                      </Box>
                                    </Box>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span onClick={() => setAlertModal(true)}>
                                  <FontAwesomeIcon icon={faTrash} />{" "}
                                </span>
                              </span>
                            </Box> */}
                        <Modal
                          show={alertModal}
                          onHide={() => setAlertModal(false)}
                        >
                          <Box className="mc-alert-modal">
                            <Icon type="new_releases" />
                            <Heading as="h3">are your sure!</Heading>
                            <Text as="p">Want to delete this product?</Text>
                            <Modal.Footer>
                              <Button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setAlertModal(false)}
                              >
                                nop, close
                              </Button>
                              <Button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setAlertModal(false)}
                              >
                                yes, delete
                              </Button>
                            </Modal.Footer>
                          </Box>
                        </Modal>
                        {/* </Box>
                        </Box>  */}
                        {selectedItems.map((item) => (
                          <MenuSelectCard
                            key={item}
                            item={item}
                            open={open}
                            alertModal={alertModal}
                            handleWindow={handleWindow}
                            setAlertModal={setAlertModal}
                          />
                        ))}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Box>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
