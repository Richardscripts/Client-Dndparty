import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './FormDatePicker.css';

export default function FormDatePicker() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} />
    </div>
  );
}
