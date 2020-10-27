import React from 'react';
import UsersJoined from '../UsersJoined/UsersJoined';
import PartyInfo from '../PartyInfo/PartyInfo';
import UserRequestList from '../UsersRequestList/UsersRequestList';
import Validators from '../../Helpers/Validators';
import Chatbox from '../Chatbox/Chatbox';

import './FullViewParty.css';
import partiesApi from '../../Helpers/ApiHelpers/parties';

class FullViewParty extends React.Component {
  state = {
    error: null,
    current_party: [{ user_name: '', user_id_creator: '' }],
    current_user_requests: [],
    current_joined_users: [],
    party_updated: false,
  };

  acceptRequester = (user_id, type) => {
    this.props.handleStartLoading();
    const party_id = this.state.current_party[0].party_id;
    partiesApi
      .acceptPartyJoinRequest(user_id, party_id, type)
      .then(() => {
        window.location.reload();
      })
      .catch((res) => {
        this.props.handleEndLoading();
        this.setState({ error: res.error });
      });
  };

  handleRequestToJoinParty = (party_id) => {
    this.props.handleStartLoading();
    partiesApi
      .requestTojoinParty(party_id)
      .then(() => {
        this.fullviewPartyApiCalls();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
  };

  fullviewPartyApiCalls = () => {
    const { match } = this.props;
    const party_id = match.params.party_id;
    this.props.handleStartLoading();
    partiesApi
      .getIndividualParty(party_id)
      .then((res) => {
        this.setState({
          current_party: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
    this.props.handleStartLoading();
    partiesApi
      .getUserRequests(party_id)
      .then((res) => {
        this.setState({
          current_user_requests: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
    this.props.handleStartLoading();
    partiesApi
      .getUsersWhoJoinedParty(party_id)
      .then((res) => {
        this.setState({
          current_joined_users: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
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
          <Chatbox
            party_id={this.state.current_party[0].party_id}
            match={this.props.match}
            handleEndLoading={this.props.handleEndLoading}
            handleStartLoading={this.props.handleStartLoading}
          />
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
