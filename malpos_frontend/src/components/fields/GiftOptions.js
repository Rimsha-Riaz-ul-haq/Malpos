import React, { useState } from "react";
import { Box, Select } from "../elements";

export default function GiftOptions({
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

  const getOptionLabel = (item, title) => {
    switch (title) {
      case "Category":
        return item.product_category_name;
      case "Product":
        return item.product_name;
      case "Gift":
        return item.value;
      default:
        return "";
    }
  };

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
            <option key={index} value={item.id}>
              {item.value}
            </option>
          ))}
      </Select>
    </Box>
  );
}
