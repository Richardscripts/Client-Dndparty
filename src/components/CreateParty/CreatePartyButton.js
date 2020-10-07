import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatePartyButton(props) {
  return (
    <div className="create-table-bar">
      <Link to="/Create_Party">
        <button className="create-table-button">Create Party Table</button>
      </Link>
    </div>
  );
}
