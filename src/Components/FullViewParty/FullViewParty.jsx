import React, { useState } from 'react';
import UsersJoined from '../UsersJoined/UsersJoined';
import PartyInfo from '../PartyInfo/PartyInfo';
import UserRequestList from '../UsersRequestList/UsersRequestList';
import Validators from '../../Helpers/Validators';
import Chatbox from '../Chatbox/Chatbox';
import EditPartyInfo from '../EditPartyInfo/EditPartyInfo';
import {
  useGetIndividualParty,
  useAcceptPartyJoinRequest,
  useRequestToJoinParty,
  useDeleteParty,
  useGetUserRequests,
  useGetUsersWhoJoinedParty,
} from '../../Api/FullPartyView';
import Loading from '../Loading/Loading';
import { getAllRequesters } from '../../Helpers/ApiHelpers/Utility';

import './FullViewParty.css';

const FullViewParty = ({
  match: {
    params: { party_id },
  },
  history,
}) => {
  const [toggleDeleteWarning, setToggleDeleteWarning] = useState(false);
  const [toggleEditParty, setToggleEditParty] = useState(false);
  const {
    individualPartyData,
    refetchIndividualParty,
    isIndividualPartyDataLoading,
  } = useGetIndividualParty(party_id);
  const {
    isAcceptPartyJoinRequestLoading,
    acceptPartyJoinRequest,
    acceptedPartyJoinRequests,
  } = useAcceptPartyJoinRequest(party_id);
  const { requestToJoinParty, updatedUserRequests } =
    useRequestToJoinParty(party_id);
  const { deleteParty, isDeletePartyLoading } = useDeleteParty(
    party_id,
    history,
  );
  const { userRequests, isUserRequestsLoading } = useGetUserRequests(party_id);
  const { usersWhoJoinedParty } = useGetUsersWhoJoinedParty(party_id);
  const allUsersWhoJoinedParty = [
    ...usersWhoJoinedParty,
    ...acceptedPartyJoinRequests,
  ];
  const allUserRequests = getAllRequesters(
    [...userRequests, ...updatedUserRequests],
    allUsersWhoJoinedParty,
  );

  const isRequesterOrJoiner = Validators.isPartyJoinerOrRequester(
    allUsersWhoJoinedParty,
    allUserRequests,
  );

  const isCreatorOfParty = Validators.isCreatorOfParty(
    individualPartyData?.user_id_creator,
  );
  const hasJoiners = !!allUsersWhoJoinedParty?.length;
  const hasRequests = !!allUserRequests?.length;

  return (
    <>
      {isIndividualPartyDataLoading ? (
        <Loading />
      ) : (
        <>
          {(isAcceptPartyJoinRequestLoading || isUserRequestsLoading) && (
            <Loading />
          )}
          <div
            id="full-party-view"
            className="full-party-view animate__animated animate__fadeIn"
          >
            {toggleEditParty ? (
              <EditPartyInfo
                toggleEditParty={() => setToggleEditParty(!toggleEditParty)}
                current_party={individualPartyData}
                updateEditParty={refetchIndividualParty}
                party_id={party_id}
              />
            ) : (
              <PartyInfo current_party={individualPartyData} />
            )}
            {hasJoiners && (
              <div className="third-row-party">
                <div className="party-users-joined">
                  <UsersJoined current_joined_users={allUsersWhoJoinedParty} />
                </div>
              </div>
            )}
            {hasRequests && (
              <div className="fourth-row-party">
                <div className="party-users-requests">
                  <UserRequestList
                    party={individualPartyData}
                    current_user_requests={allUserRequests}
                    acceptPartyJoinRequest={acceptPartyJoinRequest}
                  />
                </div>
              </div>
            )}
            <div className="fullview-bottom-bar"></div>
            <Chatbox party_id={party_id} />
          </div>
          {toggleDeleteWarning && (
            <>
              <div className="fadeBackground"></div>
              <div className="deleteWarningModal">
                {isDeletePartyLoading && <Loading relative />}
                Are you sure you want to delete this Party?
                <br />
                <br />
                <button
                  className="defaultButton"
                  onClick={() => setToggleDeleteWarning(false)}
                  disabled={isDeletePartyLoading}
                >
                  Cancel
                </button>{' '}
                <button
                  disabled={isDeletePartyLoading}
                  className="defaultButton"
                  onClick={deleteParty}
                >
                  Delete
                </button>
              </div>
            </>
          )}
          {Validators.isCreatorOfParty(individualPartyData?.user_id_creator) &&
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

          {!isCreatorOfParty &&
            !isRequesterOrJoiner &&
            !Validators.isPartyComplete(
              individualPartyData?.party_complete,
            ) && (
              <button
                type="button"
                onClick={requestToJoinParty}
                className="PartyTableJoinButton "
              >
                Join Party
              </button>
            )}
        </>
      )}
    </>
  );
};

export default FullViewParty;
