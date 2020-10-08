import React from 'react';
import ApiHelpers from '../../../Helpers/ApiHelpers';
import TokenService from '../../../Helpers/TokenService';
import Validators from '../../../Helpers/Validators';

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

  acceptRequester = (user_id) => {
    const party_id = this.state.current_party[0].party_id;
    ApiHelpers.acceptPartyJoinRequest(user_id, party_id)
      .then(() => {
        window.location.reload(false);
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
    const usersRequestList = this.state.current_user_requests.map(
      (user, idx) => {
        return (
          <div key={idx}>
            Player: {user.user_name} has requested to join.{' '}
            {Validators.ifCreatorOfParty(
              this.state.current_party[0].user_id_creator
            ) && (
              <u onClick={() => this.acceptRequester(user.user_id)}>
                Accept request?
              </u>
            )}
            <br />
          </div>
        );
      }
    );
    const partyInfo = this.state.current_party.map((party, idx) => {
      return (
        <div key={idx}>
          {party.party_name}
          <br />
          Dungeon and Dragons Edition: {party.dnd_edition}
          <br />
          (Primary) Language: {party.language}
          <br />
          Online or In-Person: {party.online_or_not}
          <br />
          Players needed: {party.players_needed}
          <br />
          {party.date_created}
          <br />
          <br />
        </div>
      );
    });
    const usersJoined = this.state.current_joined_users.map((user, idx) => {
      return <div key={idx}>{user.user_name} has joined.</div>;
    });
    return (
      <div className="full-party-view">
        <div className="left">
          <div className="left-top">
            <div>{partyInfo}</div>
            <>{usersJoined}</>
          </div>
          <div className="left-bottom">{usersRequestList}</div>
        </div>

        <div className="right">
          <div className="right-top">
            Party Creator: <>{this.state.current_party[0].user_name}</>
          </div>
          <div className="right-bottom"></div>
        </div>
      </div>
    );
  }
}

export default FullViewParty;
