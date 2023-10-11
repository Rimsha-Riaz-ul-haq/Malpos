import React from "react";
import { Form } from "react-bootstrap";

export default function SelectField({
  label,
  name,
  type,
  placeholder,
  options,
  value, // The value you want to preselect
  onChange,
  ...props
}) {

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        type={type}
        value={value} // Set the value to preselect
        onChange={onChange}
        {...props}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
