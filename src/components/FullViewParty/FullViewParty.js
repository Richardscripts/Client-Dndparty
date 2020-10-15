import React from 'react';
import ApiHelpers from '../../Helpers/ApiHelpers';
import UsersJoined from '../UsersJoined/UsersJoined';
import PartyInfo from '../PartyInfo/PartyInfo';
import UserRequestList from '../UsersRequestList/UsersRequestList';

import './FullViewParty.css';

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
    const existsJoiners = this.state.current_joined_users.length !== 0;
    const existsRequests = this.state.current_user_requests.length !== 0;
    return (
      <div className="full-party-view">
        <PartyInfo current_party={this.state.current_party} />
        {existsJoiners && (
          <div className="third-row-party">
            <div className="party-users-joined">
              <UsersJoined
                current_joined_users={this.state.current_joined_users}
              />
            </div>
          </div>
        )}
        {existsRequests && (
          <div className="fourth-row-party">
            <div className="party-users-requests">
              <UserRequestList
                party={this.state.current_party[0]}
                current_user_requests={this.state.current_user_requests}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FullViewParty;
