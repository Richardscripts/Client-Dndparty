import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatePartyButton(props) {
  return (
    <div className="create-party-bar">
      <Link to="/Create_Party">
        <button className="create-party-button">Create Party Table</button>
      </Link>
    </div>
  );
}
