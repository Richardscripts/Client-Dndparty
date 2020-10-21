import React from 'react';
import { Link } from 'react-router-dom';
import PartiesFilter from '../PartiesFilter/PartiesFilter';

export default function CreatePartyButton(props) {
  return (
    <div className="create-party-bar">
      <Link to="/Create_Party">
        <div className="PartyTableButton">Create Party Table</div>
      </Link>
      <PartiesFilter handlePartyFilters={props.handlePartyFilters} />
    </div>
  );
}
