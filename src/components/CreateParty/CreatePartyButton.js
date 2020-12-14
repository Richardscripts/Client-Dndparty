import React from 'react';
import { Link } from 'react-router-dom';
import PartiesFilter from '../PartiesFilter/PartiesFilter';

export default class CreatePartyButton extends React.Component {
  state = {
    toggleFilter: false,
  };

  togglePartyFilter = () => {
    this.setState({ toggleFilter: !this.state.toggleFilter });
  };

  render() {
    return (
      <div>
        <div className="create-party-bar">
          <Link to="/Create_Party">
            <div className="PartyTableButton">Create Party</div>
          </Link>
          <div
            onClick={() => this.togglePartyFilter()}
            className="PartyTableButton"
          >
            Filter Parties
          </div>
        </div>
        {this.state.toggleFilter && (
          <PartiesFilter
            handlePartyFilters={this.props.handlePartyFilters}
            togglePartyFilter={this.togglePartyFilter}
          />
        )}
      </div>
    );
  }
}
