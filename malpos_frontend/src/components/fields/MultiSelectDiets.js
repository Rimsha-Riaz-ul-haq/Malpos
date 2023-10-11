import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";
const options = [
  { label: "Halal ", value: "Halal" },
  { label: "Kosher ", value: "Kosher" },
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Spicy ", value: "Spicy" },
];
export default function MultiSelectDiets() {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Box className={"multi-select-opt"}>
        <label>Diets</label>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </Box>
    </>
  );
}
