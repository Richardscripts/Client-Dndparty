import React from 'react';
import './FormDatePicker.css';

export default class FormDatePicker extends React.Component {
  render() {
    return (
      <input
        id="party"
        type="datetime-local"
        name="partydate"
        onChange={this.props.handleDate}
        required={true}
      />
    );
  }
}
