import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box, Label } from "../elements";
// const options = [
//   { label: "Cash ", value: "Cash" },
//   { label: "Card ", value: "Card" },
//   { label: "Bank ", value: "Bank" },
// ];
export default function MultiSelectNoLabel({ options, label }) {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Box className={"multi-select-opt-no-lab "}>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          disableSearch={false}
          hasSelectAll={true}
          overrideStrings={{
            selectSomeItems: `${label}`,
            // allItemsAreSelected: "All items are selected",
          }}
        />
      </Box>
    </>
  );
}
