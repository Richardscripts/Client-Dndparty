import React, { useState, useEffect } from 'react';
import UsersJoined from '../UsersJoined/UsersJoined';
import PartyInfo from '../PartyInfo/PartyInfo';
import UserRequestList from '../UsersRequestList/UsersRequestList';
import Validators from '../../Helpers/Validators';
import Chatbox from '../Chatbox/Chatbox';
import EditPartyInfo from '../EditPartyInfo/EditPartyInfo';

import './FullViewParty.css';
import partiesApi from '../../Helpers/ApiHelpers/Parties';

const FullViewParty = (props) => {
  const [error, setError] = useState(null);
  const [currentParty, setCurrentParty] = useState([
    { user_name: '', user_id_creator: '' },
  ]);
  const [currentRequests, setCurrentRequests] = useState([]);
  const [currentJoinedUsers, setCurrentJoinedUsers] = useState([]);
  const [toggleDeleteWarning, setToggleDeleteWarning] = useState(false);
  const [toggleEditParty, setToggleEditParty] = useState(false);

  const updateToggleEditParty = () => {
    setToggleEditParty(!toggleEditParty);
  };

  const updateEditParty = () => {
    const { match } = props;
    const party_id = match.params.party_id;
    props.handleStartLoading();
    partiesApi
      .getIndividualParty(props.timezone, party_id)
      .then((res) => {
        setCurrentParty([...res]);
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
  };

  const acceptRequester = (user_id, type) => {
    props.handleStartLoading();
    const party_id = currentParty[0].party_id;
    partiesApi
      .acceptPartyJoinRequest(user_id, party_id, type)
      .then(() => {
        fullviewPartyApiCalls();
      })
      .catch((res) => {
        props.handleEndLoading();
        setError(res.error);
      });
  };

  const handleRequestToJoinParty = (party_id) => {
    props.handleStartLoading();
    partiesApi
      .requestTojoinParty(party_id)
      .then(() => {
        fullviewPartyApiCalls();
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
  };

  const handleDeleteParty = (party_id) => {
    props.handleStartLoading();
    partiesApi
      .deleteParty(party_id)
      .then(() => {
        props.getPartiesApi();
        props.history.push('/');
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
  };

  const fullviewPartyApiCalls = () => {
    const { match } = props;
    const party_id = match.params.party_id;
    partiesApi
      .getIndividualParty(props.timezone, party_id)
      .then((res) => {
        setCurrentParty([...res]);
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
    props.handleStartLoading();
    partiesApi
      .getUserRequests(party_id)
      .then((res) => {
        setCurrentRequests([...res]);
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
    props.handleStartLoading();
    partiesApi
      .getUsersWhoJoinedParty(party_id)
      .then((res) => {
        setCurrentJoinedUsers([...res]);
      })
      .catch((res) => {
        setError(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
  };

  useEffect(() => {
    props.handleStartLoading();
    fullviewPartyApiCalls();
  }, []);

  const isRequesterOrJoiner = Validators.ifPartyJoinerOrRequester(
    currentJoinedUsers,
    currentRequests
  );
  const party = currentParty[0];
  const creatorOfParty = Validators.ifCreatorOfParty(party.user_id_creator);
  const existsJoiners = currentJoinedUsers.length !== 0;
  const existsRequests = currentRequests.length !== 0;

  return (
    <>
      <div
        id="full-party-view"
        className="full-party-view animate__animated animate__fadeIn"
      >
        {toggleEditParty ? (
          <EditPartyInfo
            toggleEditParty={updateToggleEditParty}
            current_party={currentParty}
            updateEditParty={updateEditParty}
            handleStartLoading={props.handleStartLoading}
            handleEndLoading={props.handleEndLoading}
            party_id={props.match.params.party_id}
          />
        ) : (
          <PartyInfo current_party={currentParty} />
        )}
        {existsJoiners && (
          <div className="third-row-party">
            <div className="party-users-joined">
              <UsersJoined current_joined_users={currentJoinedUsers} />
            </div>
          </div>
        )}
        {existsRequests && (
          <div className="fourth-row-party">
            <div className="party-users-requests">
              <UserRequestList
                acceptRequester={acceptRequester}
                party={currentParty[0]}
                current_user_requests={currentRequests}
              />
            </div>
          </div>
        )}
        <div className="fullview-bottom-bar"></div>
        <Chatbox
          party_id={currentParty[0].party_id}
          match={props.match}
          handleEndLoading={props.handleEndLoading}
          handleStartLoading={props.handleStartLoading}
        />
      </div>
      {toggleDeleteWarning && (
        <>
          <div className="fadeBackground"></div>
          <div className="deleteWarningModal">
            Are you sure you want to delete this Party?
            <br />
            <br />
            <button
              className="defaultButton"
              onClick={() => setToggleDeleteWarning(false)}
            >
              Cancel
            </button>{' '}
            <button
              className="defaultButton"
              onClick={() => handleDeleteParty(party.party_id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
      {Validators.ifCreatorOfParty(party.user_id_creator) &&
        !toggleEditParty && (
          <div className="JoinButton-wrapper">
            <button
              type="button"
              onClick={() => setToggleEditParty(!toggleEditParty)}
              className="PartyTableJoinButton "
            >
              Edit Party
            </button>
            <button
              type="button"
              onClick={() => setToggleDeleteWarning(true)}
              className="PartyTableJoinButton "
            >
              Delete Party
            </button>
          </div>
        )}

      {!creatorOfParty &&
        !isRequesterOrJoiner &&
        !Validators.partyComplete(party.party_complete) && (
          <button
            type="button"
            onClick={() => handleRequestToJoinParty(party.party_id)}
            className="PartyTableJoinButton "
          >
            Join Party
          </button>
        )}
    </>
  );
};

export default FullViewParty;
