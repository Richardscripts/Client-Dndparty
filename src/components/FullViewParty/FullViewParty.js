import React from 'react';
import ApiHelpers from '../../Helpers/ApiHelpers';
import UsersJoined from '../UsersJoined/UsersJoined';
import PartyInfo from '../PartyInfo/PartyInfo';
import UserRequestList from '../UsersRequestList/UsersRequestList';
import Validators from '../../Helpers/Validators';

import './FullViewParty.css';

class FullViewParty extends React.Component {
  state = {
    error: null,
    current_party: [{ user_name: '', user_id_creator: '' }],
    current_user_requests: [],
    current_joined_users: [],
    party_updated: false,
  };

  acceptRequester = (user_id, type) => {
    this.props.handleLoading();
    const party_id = this.state.current_party[0].party_id;
    ApiHelpers.acceptPartyJoinRequest(user_id, party_id, type)
      .then(() => {
        this.props.handleLoading();
        window.location.reload();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
  };

  handleRequestToJoinParty = (party_id) => {
    this.props.handleLoading();
    ApiHelpers.requestTojoinParty(party_id)
      .then(() => {
        this.props.handleLoading();
        this.fullviewPartyApiCalls();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
  };

  fullviewPartyApiCalls = () => {
    const { match } = this.props;
    const party_id = match.params.party_id;
    this.props.handleLoading();
    ApiHelpers.getIndividualParty(party_id)
      .then((res) => {
        this.setState({
          current_party: [...res],
        });
        this.props.handleLoading();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
    this.props.handleLoading();
    ApiHelpers.getUserRequests(party_id)
      .then((res) => {
        this.setState({
          current_user_requests: [...res],
        });
        this.props.handleLoading();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
    this.props.handleLoading();
    ApiHelpers.getUsersWhoJoinedParty(party_id)
      .then((res) => {
        this.setState({
          current_joined_users: [...res],
        });
        this.props.handleLoading();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
  };

  componentDidMount() {
    this.fullviewPartyApiCalls();
  }

  render() {
    const isRequesterOrJoiner = Validators.ifPartyJoinerOrRequester(
      this.state.current_joined_users,
      this.state.current_user_requests
    );
    const party = this.state.current_party[0];
    const existsJoiners = this.state.current_joined_users.length !== 0;
    const existsRequests = this.state.current_user_requests.length !== 0;
    return (
      <>
        <div className="full-party-view animate__animated animate__fadeIn">
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
                  acceptRequester={this.acceptRequester}
                  party={this.state.current_party[0]}
                  current_user_requests={this.state.current_user_requests}
                />
              </div>
            </div>
          )}
          <div className="fullview-bottom-bar"></div>
        </div>

        {!Validators.ifCreatorOfParty(party.user_id_creator) &&
          !isRequesterOrJoiner &&
          !Validators.partyComplete(party.party_complete) && (
            <button
              type="button"
              onClick={() => this.handleRequestToJoinParty(party.party_id)}
              className="PartyTableJoinButton "
            >
              Join
            </button>
          )}
      </>
    );
  }
}

export default FullViewParty;
