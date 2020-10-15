import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/Groups-image/images';
import ApiHelpers from '../../Helpers/ApiHelpers';
import Validators from '../../Helpers/Validators';

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

  handleRequestToJoinParty = (party_id) => {
    ApiHelpers.requestTojoinParty(party_id)
      .then(() => {
        this.props.history.push(`/Party/${party_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const DndParties = this.state.current_parties.map((party, idx) => {
      const partyComplete = party.party_complete === 'Complete Party!';
      return (
        <div key={idx} className="party-table">
          <div className="party-top-info-bar">
            <div className="info-party-edition">
              <span className="edition-font">
                {party.dnd_edition.substring(0, 3)}
              </span>
              <img
                className="book-img"
                src={images.book}
                alt="A tiny spellbook"
              />
            </div>
            <div className="info-party-online">
              {party.online_or_not === 'Online' ? (
                <img
                  className="online-img"
                  src={images.online}
                  alt="A tiny globe icon"
                />
              ) : (
                '-'
              )}
            </div>
            <div className="info-party-id">Party {party.party_id}</div>
            <div className="info-party-players">
              {party.players_needed < 1 ? (
                '-'
              ) : (
                <>
                  <img
                    className="parties-icons"
                    src={images.players}
                    alt="An icon representing multiple users"
                  />{' '}
                  {party.players_needed}
                </>
              )}
            </div>
            <div className="info-party-dm">
              {party.dm_needed ? (
                <img
                  className="parties-icons parties-dm-image"
                  src={images.dm}
                  alt="A small icon of a wizard."
                />
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
          <Link to={`/Party/${party.party_id}`}>
            <div className="group-image">
              <img
                src={images.fullparty}
                alt="A full party of players playing a table top game."
              />
            </div>
          </Link>
          <div className="party-name">{party.party_name}</div>
          <div className="button-wrapper">
            <Link to={`/Party/${party.party_id}`}>
              <button className="view-button PartyTableButton">View</button>{' '}
            </Link>
            {!Validators.ifCreatorOfParty(party.user_id_creator) &&
              !partyComplete && (
                <button
                  onClick={() => this.handleRequestToJoinParty(party.party_id)}
                  className="join-button PartyTableButton"
                >
                  Join
                </button>
              )}
          </div>
        </div>
      );
    });
    return <>{DndParties}</>;
  }
}

export default Parties;
