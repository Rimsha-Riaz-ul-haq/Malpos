import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../cards";
import { Box } from "../elements";
import { LabelField } from "../fields";
import data from "../../data/master/categoriesList.json";
import { ProductsTable } from "../tables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CategoryTable from "../tables/CategoryTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconSearchBar from "../elements/IconSearchBar";
export default function MenuCateTab() {
  return (
    <div>
      <Row>
        <Col md={4}>
          <IconSearchBar placeholder={"Search"} />
        </Col>
        <Col md={8} lg={8}>
          <Row className="cat-btn">
            {data?.menuCategory.filter.map((item, index) => (
              <Col xs={12} sm={12} md={3} lg={3} key={index} className="">
                <LabelField
                  type={item.type}
                  // label={item.label}
                  option={item.option}
                  placeholder={item.placeholder}
                  labelDir="label-col"
                  fieldSize="field-select w-100 h-md cate-select "
                />
              </Col>
            ))}

            <Col md={3} lg={2}>
              <Link to="/create-menus">
                <button className="cateMenu-btn">
                  <FontAwesomeIcon icon={faPlus} /> Create
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Box className="mc-table-responsive">
        <Col md={12}>
          <CategoryTable
            thead={data?.menuCategory.thead}
            tbody={data?.menuCategory.tbody}
          />
        </Col>
      </Box>
    </div>
  );
}
