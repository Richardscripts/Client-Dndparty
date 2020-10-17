import React from 'react';
import { Link } from 'react-router-dom';
// import PartiesFilter from '../PartiesFilter/PartiesFilter';

export default function CreatePartyButton(props) {
  return (
    <div className="create-party-bar">
      <Link to="/Create_Party">
        <button className="PartyTableButton">Create Party Table</button>
      </Link>
      {/* <PartiesFilter /> Stretch Goal */}
    </div>
  );
}
