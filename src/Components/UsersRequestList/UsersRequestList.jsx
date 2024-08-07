import React from 'react';
import images from '../../Assets/groups-image/images';
import Validators from '../../Helpers/Validators';
import { Link } from 'react-router-dom';

export default function UsersRequestList({
  party,
  current_user_requests,
  acceptPartyJoinRequest,
}) {
  const usersRequestList = current_user_requests.map((user) => (
    <div key={user.user_id}>
      <img
        className="fullview-players-img request-img"
        src={images.players}
        alt=""
      />
      <Link
        style={{ cursor: 'pointer' }}
        to={`/Player_Profile/${user.user_id}`}
      >
        <span className="username-style">
          {user.user_name}
          <span className="visuallyhidden">Requests to Join Party</span>
        </span>{' '}
        <img
          style={{ maxWidth: '18px', verticalAlign: 'baseline' }}
          alt="link out icon"
          src={images.linkOut}
        />
      </Link>{' '}
      has requested to join.{' '}
      {Validators.isCreatorOfParty(party?.user_id_creator) &&
        !Validators.isPartyComplete(party?.party_complete) && (
          <div className="request-list-style">
            <span tabIndex="0" className="request-style">
              Accept request as:
            </span>{' '}
            {party?.players_needed !== '' && (
              <div
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  acceptPartyJoinRequest({
                    user_id: user.user_id,
                    type: 'player',
                    user_name: user.user_name,
                  })
                }
              >
                <img
                  className="fullview-players-img request-img"
                  src={images.players}
                  alt="Player Icon"
                />
                <u tabIndex="0">Player</u>
              </div>
            )}
            {party?.dm_needed && (
              <div
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  acceptPartyJoinRequest({
                    user_id: user.user_id,
                    type: 'dm',
                    user_name: user.user_name,
                  })
                }
              >
                <img
                  className="fullview-players-img request-img"
                  src={images.dm}
                  alt="Player Icon"
                />
                <u tabIndex="0">Dungeon Master</u>
              </div>
            )}
          </div>
        )}
      <br />
    </div>
  ));

  return <>{usersRequestList}</>;
}
