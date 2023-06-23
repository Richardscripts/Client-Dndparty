import React from 'react';
import images from '../../assets/groups-image/images';
import Validators from '../../Helpers/Validators';
import { Link } from 'react-router-dom';

export default function UsersRequestList(props) {
  const party = props.party;
  const usersRequestList = props.current_user_requests.map((user, idx) => {
    return (
      <div key={idx}>
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
        {Validators.ifCreatorOfParty(party.user_id_creator) &&
          !Validators.partyComplete(party.party_complete) && (
            <div className="request-list-style">
              <span tabIndex="0" className="request-style">
                Accept request as:
              </span>{' '}
              {props.party.players_needed !== '' && (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => props.acceptRequester(user.user_id, 'player')}
                >
                  <img
                    className="fullview-players-img request-img"
                    src={images.players}
                    alt="Player Icon"
                  />
                  <u tabIndex="0">Player</u>
                </div>
              )}
              {props.party.dm_needed && (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => props.acceptRequester(user.user_id, 'dm')}
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
    );
  });
  return <>{usersRequestList}</>;
}
