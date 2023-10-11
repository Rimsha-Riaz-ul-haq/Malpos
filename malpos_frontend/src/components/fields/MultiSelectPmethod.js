import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";
const options = [
  { label: "Cash ", value: "Cash" },
  { label: "Card ", value: "Card" },
  { label: "Customer Balance", value: "Customer Balance" },
];
export default function MultiSelectPmethod() {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Box className={"multi-select-opt"}>
        <label>Payment method</label>
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
