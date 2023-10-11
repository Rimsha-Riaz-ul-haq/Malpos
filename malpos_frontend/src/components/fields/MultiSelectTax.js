import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";
const options = [
  { label: "Tobacco Tax ", value: "Tobacco Tax" },
  { label: "VAT %15(%15) ", value: "VAT %15(%15)" },
];
export default function MultiSelectTax() {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Box className={"multi-select-opt"}>
        <label>Taxes</label>
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
