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
        <Link to={`/Player_Profile/${user.user_id}`}>
          <span className="username-style">
            {user.user_name}
            <span className="visuallyhidden">Requests to Join Party</span>
          </span>
        </Link>{' '}
        has requested to join.{' '}
        {Validators.ifCreatorOfParty(party.user_id_creator) &&
          !Validators.partyComplete(party.party_complete) && (
            <div className="request-list-style">
              <span tabIndex="0" className="request-style">
                Accept request as:
              </span>{' '}
              {props.party.players_needed !== '' && (
                <>
                  <img
                    className="fullview-players-img request-img"
                    src={images.players}
                    alt="Player Icon"
                  />
                  <u
                    tabIndex="0"
                    onClick={() =>
                      props.acceptRequester(user.user_id, 'player')
                    }
                  >
                    (Player)
                  </u>
                </>
              )}
              {props.party.dm_needed && (
                <>
                  <img
                    className="fullview-players-img request-img"
                    src={images.dm}
                    alt="Player Icon"
                  />
                  <u
                    tabIndex="0"
                    onClick={() => props.acceptRequester(user.user_id, 'dm')}
                  >
                    (Dungeon Master)
                  </u>
                </>
              )}
            </div>
          )}
        <br />
      </div>
    );
  });
  return <>{usersRequestList}</>;
}
