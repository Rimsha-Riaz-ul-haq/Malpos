import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";
import { divide } from "lodash";

export default function MultiSelectFieldCustom({
  title,
  error,
  options,
  value,
  onChange,
  required,
}) {
  const [selected, setSelected] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
    onChange(selectedOptions);
  };

  return (
    <div style={{ borderColor: error ? "red" : "default" }}>
      <Box className="multi-select-opt">
        <label>
          {title}
          {required && <span style={{ color: "red" }}>*</span>}{" "}
          {/* Conditionally render red asterisk */}
        </label>
        <MultiSelect
          options={options}
          value={selected}
          onChange={handleChange}
          labelledBy="Select"
          hasSelectAll={false}
        />
      </Box>
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
}
