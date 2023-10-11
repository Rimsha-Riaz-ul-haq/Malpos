import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "../elements";

export default function CalenderField({ label }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00 PM");
  return (
    <div>
      <label className="date-picker-label">{label}</label>
      <Box className={"date-picker"} style={{ backgroundColor: "#f0f0f0" }}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </Box>
    </div>
  );
}
