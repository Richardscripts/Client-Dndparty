import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/Groups-image/images';
import ApiHelpers from '../../Helpers/ApiHelpers';

import './Parties.css';

class Parties extends React.Component {
  state = {
    error: null,
    current_parties: [],
  };

  componentDidMount() {
    ApiHelpers.getPartyTables()
      .then((res) => {
        this.setState({
          current_parties: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const DndParties = this.state.current_parties.map((party, idx) => {
      return (
        <div key={idx} className="party-table">
          <div className="party-top-info-bar">
            <div className="info-party-language">{party.language}</div>
            <div className="info-party-online">{party.online_or_not}</div>
            <div className="info-party-id">{party.party_name}</div>
            <div className="info-party-players">
              {party.players_needed < 1 ? '-' : `Pl: ${party.players_needed}`}
            </div>
            <div className="info-party-dm">
              {party.dm_needed ? <span>DM</span> : <span>-</span>}
            </div>
          </div>
          <div className="group-image">
            <img src={images.fullparty} alt="a full party " />
          </div>
          <div className="button-wrapper">
            <Link to={`/party/${party.party_id}`}>
              <button className="join-button">Join</button>
            </Link>
          </div>
        </div>
      );
    });
    return <>{DndParties}</>;
  }
}

export default Parties;
