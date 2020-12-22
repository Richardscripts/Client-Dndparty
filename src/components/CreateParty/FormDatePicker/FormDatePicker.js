import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import './FormDatePicker.css';

export default class FormDatePicker extends React.Component {
  render() {
    return (
      <DateTimePicker
        onChange={this.props.handleDate}
        value={this.props.date}
        required={true}
      />
    );
  }
}
