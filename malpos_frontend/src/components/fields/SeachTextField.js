import React, { useState } from "react";
import { Box, Heading } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCaretDown,
  faMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import LabelField from "./LabelField";
import { Form } from "react-bootstrap";
export default function SeachTextField() {
  const [searchCheckTextOpen, searchCheckTextClose] = useState(false);
  const handleSeachCheckTextField = () => {
    searchCheckTextClose(!searchCheckTextOpen);
  };
  return (
    <div>
      <Box className="seach-check-textfield-main">
        <Heading className="mc-label-field-title">ALLERGIES</Heading>
        <Box className="seach-check-textfield-filter">
          <Box className="seach-check-textfield-filter-items">
            <span className="filter-box-span">Select </span>
            {/* <span className='filter-box-span-count'>0</span> */}
            {/* <span className='filter-box-span-xmart'><FontAwesomeIcon icon={faXmark} /> </span> */}
            <span className="filter-box-span-caret">
              <FontAwesomeIcon
                icon={faAngleDown}
                onClick={handleSeachCheckTextField}
              />{" "}
            </span>
            {searchCheckTextOpen ? (
              <Box className="seach-check-textfield-select-opt">
                <Box className="seach-check-textfield-select-opt-box">
                  {/* <Box ```````````````````````````````````className="filter-box-search">
                    <LabelField
                      type="text"
                      placeholder="Search here ..."
                      fieldSize="w-100 h-md"
                    />
                  </Box>``````````````````````````````````` */}
                  <Box className="filter-box-checkbox-main">
                    <Box className="filter-box-checkbox-div">
                      <Box className="filter-box-checkbox">
                        <Form.Check type="checkbox" label="Egg" />
                        <Form.Check type="checkbox" label="Milk" />
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
    </div>
  );
}
