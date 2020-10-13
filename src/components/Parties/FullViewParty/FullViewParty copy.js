import React from 'react';
import ApiHelpers from '../../../Helpers/ApiHelpers';
import Validators from '../../../Helpers/Validators';
import { Link } from 'react-router-dom';

import images from '../../../Assets/Groups-image/images';
import './FullViewParty.css';

// import images from '../../../Assets/Groups-image/images';
// import ApiHelpers from '../../../Helpers/ApiHelpers';

class FullViewParty extends React.Component {
  state = {
    error: null,
    current_party: [{ user_name: '', user_id_creator: '' }],
    current_user_requests: [],
    current_joined_users: [],
  };

  acceptRequester = (user_id, type) => {
    const party_id = this.state.current_party[0].party_id;
    ApiHelpers.acceptPartyJoinRequest(user_id, party_id, type)
      .then(() => {
        window.location.reload();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    const { match } = this.props;
    const party_id = match.params.party_id;
    ApiHelpers.getIndividualParty(party_id)
      .then((res) => {
        this.setState({
          current_party: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
    ApiHelpers.getUserRequests(party_id)
      .then((res) => {
        this.setState({
          current_user_requests: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
    ApiHelpers.getUsersWhoJoinedParty(party_id)
      .then((res) => {
        this.setState({
          current_joined_users: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }
  render() {
    const party = this.state.current_party[0];
    const usersRequestList = this.state.current_user_requests.map(
      (user, idx) => {
        return (
          <div key={idx}>
            <img
              className="fullview-players-img request-img"
              src={images.players}
              alt=""
            />
            <Link to={`/Player_Profile/${user.user_id}`}>
              <span className="username-style">{user.user_name}</span>
            </Link>{' '}
            has requested to join.{' '}
            {Validators.ifCreatorOfParty(party.user_id_creator) && (
              <>
                <span>Accept request:</span>{' '}
                {party.players_needed && (
                  <>
                    <u
                      onClick={() =>
                        this.acceptRequester(user.user_id, 'player')
                      }
                    >
                      (Player)
                    </u>
                  </>
                )}
                {party.dm_needed && (
                  <u onClick={() => this.acceptRequester(user.user_id, 'dm')}>
                    (Dungeon Master)
                  </u>
                )}
              </>
            )}
            <br />
          </div>
        );
      }
    );
    const partyInfo = this.state.current_party.map((party, idx) => {
      return (
        <div className="party-legend" key={idx}>
          <div className="party-name">{party.party_name}</div>
          <br />
          {party.dnd_edition && (
            <>
              <span className="party-style-text">
                Dungeon and Dragons Edition:
              </span>{' '}
              {party.dnd_edition}
              <br />
            </>
          )}
          {party.language && (
            <>
              <span className="party-style-text">(Primary) Language:</span>{' '}
              {party.language}
              <br />
            </>
          )}
          {party.online_or_not && (
            <>
              <span className="party-style-text">Online or In-Person:</span>{' '}
              {party.online_or_not}
              <br />
            </>
          )}
          {party.camera_required && (
            <span className="party-style-text">
              Camera Required
              <br />
            </span>
          )}
          {party.time_of_event && (
            <>
              <span className="party-style-text">Time Of Game:</span>{' '}
              {party.time_of_event}
              <br />
            </>
          )}
          {party.homebrew_rules && (
            <>
              <span className="party-style-text">Homebrew Rules:</span>{' '}
              {party.homebrew_rules}
              <br />
            </>
          )}
          {party.classes_needed && (
            <>
              <span className="party-style-text">Classes Needed:</span>{' '}
              {party.classes_needed}
              <br />
            </>
          )}
          {party.capaign_or_custom && (
            <>
              <span className="party-style-text">Campaign:</span>{' '}
              {party.capaign_or_custom}
              <br />
            </>
          )}
          {party.group_personality && (
            <>
              <span className="party-style-text">Group Personality:</span>{' '}
              {party.group_personality}
              <br />
            </>
          )}
          {party.dm_needed && (
            <span className="party-important-text">
              Dungeon Master Needed
              <br />
            </span>
          )}
          {Number(party.players_needed) ? (
            <>
              <span className="party-important-text">Players Needed:</span>{' '}
              {party.players_needed}
              <br />
            </>
          ) : (
            ''
          )}
          {party.date_created}{' '}
          {party.about && (
            <div className="party-about-section">
              {party.about}
              <br />
            </div>
          )}
        </div>
      );
    });
    const usersJoined = this.state.current_joined_users.map((user, idx) => {
      return (
        <div key={idx}>
          {' '}
          <img className="fullview-players-img" src={images.players} alt="" />
          <Link to={`/Player_Profile/${user.user_id}`}>
            <span className="username-style">{user.user_name}</span>
          </Link>{' '}
          has joined party.
        </div>
      );
    });
    return (
      <div className="full-party-view">
        <div className="full-party-view-left">
          <div className="full-party-view-left-top">
            <div>{partyInfo}</div>
          </div>
          <div className="full-party-view-left-bottom">{usersRequestList}</div>
        </div>

        <div className="full-party-view-right">
          <div className="full-party-view-right-top">
            <span className="party-creator-style">
              Party Creator: {party.user_name}
            </span>
            <br />
            <>{usersJoined}</>
          </div>
          <div className="full-party-view-right-bottom">
            {party.party_complete}
          </div>
        </div>
      </div>
    );
  }
}

export default FullViewParty;
