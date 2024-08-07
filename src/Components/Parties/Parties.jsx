import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/groups-image/images';
import partiesApiHelpers from '../../Helpers/ApiHelpers/PartiesHelpers';
import Validators from '../../Helpers/Validators';
import DynamicPartiesImage from './DynamicPartiesImage/DynamicPartiesImage';
import Loading from '../Loading/Loading';
import './Parties.css';

class Parties extends React.Component {
  state = {
    error: null,
  };

  handleRequestToJoinParty = (party_id) => {
    partiesApiHelpers
      .requestTojoinParty(party_id)
      .then(() => {
        this.props.history.push(`/Party/${party_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    if (this.props.isPartyTableDataLoading) {
      return <Loading relative />;
    }

    const isLoggedIn = Validators.isPartyJoinerOrRequester();
    const DndParties = this.props.filtered_parties.map((party, idx) => {
      const isPartyComplete = Validators.isPartyComplete(party.party_complete);
      return (
        <div
          key={idx}
          className="party-table animate__animated animate__fadeIn"
        >
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
          {isPartyComplete && (
            <img
              src={images.checked}
              alt="checked icon"
              className="checked-image"
            />
          )}
          <Link to={`/Party/${party.party_id}`}>
            <DynamicPartiesImage
              players_needed={party.players_needed}
              dm_needed={party.dm_needed}
              party_complete={party.party_complete}
            />
          </Link>
          <div className="party-name">{party.party_name}</div>
          <div className="button-wrapper">
            <Link to={`/Party/${party.party_id}`}>
              <div className="view-button PartyTableButton">
                View
                <span className="visuallyhidden">
                  {`, Party ${party.party_id}, Party Name: ${party.party_name}, ${party.dnd_edition}, Players Needed: ${party.players_needed}, DM needed`}
                  {party.dm_needed ? 'Yes,' : 'No,'}
                </span>
              </div>{' '}
            </Link>
            {!Validators.isCreatorOfParty(party.user_id_creator) &&
              !isLoggedIn &&
              !isPartyComplete && (
                <button
                  onClick={() => this.handleRequestToJoinParty(party.party_id)}
                  className="join-button PartyTableButton"
                >
                  Join
                  <span className="visuallyhidden">{`Party ${party.party_id}`}</span>
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
