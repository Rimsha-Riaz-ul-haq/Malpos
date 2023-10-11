import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";

export default function MultiSelectField({
  title,
  action,
  options,
  value,
  onChange,
  required,
}) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Ensure that value is an array
    const selectedIds = Array.isArray(value) ? value : [value];

    // Filter options based on the provided IDs (selectedIds)
    const preselectedOptions = options.filter((option) =>
      selectedIds.includes(option.value)
    );
    setSelected(preselectedOptions);
  }, [options, value]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
    onChange(selectedIds);
  };

  return (
    <Box className="multi-select-opt">
      <label>
        {title}
        {required && <span style={{ color: "red" }}>*</span>}{" "}
        {/* Conditionally render red asterisk */}
      </label>
      {title === "Client" && action == "updateProduct" ? (
        <MultiSelect
          className="disabled-multi"
          disabled
          options={options}
          value={selected}
          onChange={handleChange}
          labelledBy="Select"
          hasSelectAll={false}
        />
      ) : (
        <MultiSelect
          options={options}
          value={selected}
          onChange={handleChange}
          labelledBy="Select"
          hasSelectAll={false}
        />
      )}
    </Box>
  );
}
