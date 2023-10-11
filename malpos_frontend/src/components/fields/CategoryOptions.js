import React, { useState } from "react";
import { Box, Select } from "../elements";

export default function CategoryOptions({
  title,
  product,
  id,
  labelDir = "label-col",
  fieldSize = "w-md h-sm",
  option,
  callback,
  ...rest
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const [newObj, setNewObj] = useState({});

  const handleOptionChange = (event, title) => {
    const selectedValue = event.target.value;
    // let tempData = { [title]: selectedValue };
    setSelectedOption(event.target.value);
    callback(selectedValue);
  };

  return (
    <Box className={`mc-label-field-group d-flk ${title ? labelDir : ""}`}>
      <Select
        className={`mc-label-field-select ${fieldSize} px-3`}
        {...rest}
        value={selectedOption}
        onChange={(e) => handleOptionChange(e, title)}
      >
        <option value="">{title}</option>
        {option &&
          option.map((item, index) => (
            <option key={index} value={item.md_product_category_id}>
              {item.product_category_name}
            </option>
          ))}
      </Select>
    </Box>
  );
}
