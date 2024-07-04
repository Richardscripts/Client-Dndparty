import React from 'react';
import './FormDatePicker.css';

export const FormDatePicker = (props) => {
  const getDate = () => {
    const date = new Date(props.date);

    const formattingDate = props.date.split('T')[0];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const hourWithTimezone = hour < 10 ? `0${hour}` : hour;
    const minutes = minute < 10 ? `0${minute}` : minute;

    return `${formattingDate}T${hourWithTimezone}:${minutes}`;
  };

  const options = props?.isEditing && { value: getDate() };

  return (
    <input
      id="party"
      type="datetime-local"
      name="partydate"
      onChange={props.handleDate}
      required={true}
      {...options}
    />
  );
};

export default FormDatePicker;