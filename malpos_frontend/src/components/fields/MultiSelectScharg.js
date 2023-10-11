import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";
const options = [
  { label: "Default service charge ", value: "Default service charge" },
  { label: "0 ", value: "0" },
  { label: "1 ", value: "1" },
  { label: "2 ", value: "2" },
];
export default function MultiSelectScharge() {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Box className={"multi-select-opt"}>
        <label>Service Charge %</label>
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
