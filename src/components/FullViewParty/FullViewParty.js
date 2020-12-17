import React from 'react';
import UsersJoined from '../UsersJoined/UsersJoined';
import PartyInfo from '../PartyInfo/PartyInfo';
import UserRequestList from '../UsersRequestList/UsersRequestList';
import Validators from '../../Helpers/Validators';
import Chatbox from '../Chatbox/Chatbox';
import EditPartyInfo from '../EditPartyInfo/EditPartyInfo';

import './FullViewParty.css';
import partiesApi from '../../Helpers/ApiHelpers/parties';

class FullViewParty extends React.Component {
  state = {
    error: null,
    current_party: [{ user_name: '', user_id_creator: '' }],
    current_user_requests: [],
    current_joined_users: [],
    party_updated: false,
    toggleDeleteWarning: false,
    toggleEditParty: false,
  };

  toggleEditParty = () => {
    this.setState({ toggleEditParty: !this.state.toggleEditParty });
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    this.props.handleStartLoading();
    const {
      party_name,
      players_needed,
      dnd_edition,
      about,
      language,
      online_or_not,
      homebrew_rules,
      classes_needed,
      group_personality,
      campaign_or_custom,
    } = e.target;
    if (!players_needed.value && !this.state.dm_checked) {
      this.setState({
        error: 'Must need atleast 1 Player or a Dungeon Master',
      });
      return;
    }
    const partyInfo = {
      party_name: party_name.value,
      players_needed: parseInt(players_needed.value),
      dm_needed: this.state.dm_checked,
      dnd_edition: dnd_edition.value,
      about: about.value,
      language: language.value,
      online_or_not: online_or_not.value,
      homebrew_rules: homebrew_rules.value,
      time_of_event: this.state.completeDate,
      classes_needed: classes_needed.value,
      group_personality: group_personality.value,
      campaign_or_custom: campaign_or_custom.value,
      camera_required: this.state.camera_checked,
    };
    this.setState({
      error: null,
    });

    partiesApi
      .createPartyTable(partyInfo)
      .then((res) => {
        this.props.getPartiesApi();
        this.props.history.push(`/Party/${res.party_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
        Validators.refreshLoginToken(res.error);
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
  };

  acceptRequester = (user_id, type) => {
    this.props.handleStartLoading();
    const party_id = this.state.current_party[0].party_id;
    partiesApi
      .acceptPartyJoinRequest(user_id, party_id, type)
      .then(() => {
        this.fullviewPartyApiCalls();
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

  handleDeleteParty = (party_id) => {
    this.props.handleStartLoading();
    partiesApi
      .deleteParty(party_id)
      .then(() => {
        this.props.getPartiesApi();
        this.props.history.push('/');
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
    const CreatorOfParty = Validators.ifCreatorOfParty(party.user_id_creator);
    const existsJoiners = this.state.current_joined_users.length !== 0;
    const existsRequests = this.state.current_user_requests.length !== 0;
    return (
      <>
        <div className="full-party-view animate__animated animate__fadeIn">
          {this.state.toggleEditParty ? (
            <EditPartyInfo
              toggleEditParty={this.toggleEditParty}
              current_party={this.state.current_party}
              handleEditSubmit={this.handleEditSubmit}
            />
          ) : (
            <PartyInfo current_party={this.state.current_party} />
          )}
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
        {this.state.toggleDeleteWarning && (
          <>
            <div className="loading-background animate__animated animate__fadeIn animate__delay-1.2s"></div>
            <div className="deleteWarningModal">
              Are you sure you want to delete this Party?
              <br />
              <br />
              <button
                className="defaultButton"
                onClick={() => this.setState({ toggleDeleteWarning: false })}
              >
                Cancel
              </button>{' '}
              <button
                className="defaultButton"
                onClick={() => this.handleDeleteParty(party.party_id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
        {Validators.ifCreatorOfParty(party.user_id_creator) &&
          !this.state.toggleEditParty && (
            <button
              type="button"
              onClick={() =>
                this.setState({ toggleEditParty: !this.state.toggleEditParty })
              }
              className="PartyTableJoinButton "
            >
              Edit Party
            </button>
          )}
        {Validators.ifCreatorOfParty(party.user_id_creator) &&
          !this.state.toggleEditParty && (
            <button
              type="button"
              onClick={() => this.setState({ toggleDeleteWarning: true })}
              className="PartyTableJoinButton "
            >
              Delete Party
            </button>
          )}
        {!CreatorOfParty &&
          !isRequesterOrJoiner &&
          !Validators.partyComplete(party.party_complete) && (
            <button
              type="button"
              onClick={() => this.handleRequestToJoinParty(party.party_id)}
              className="PartyTableJoinButton "
            >
              Join Party
            </button>
          )}
      </>
    );
  }
}

export default FullViewParty;
