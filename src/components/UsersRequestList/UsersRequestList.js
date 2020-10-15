import React from 'react';
import images from '../../Assets/Groups-image/images';
import Validators from '../../Helpers/Validators';
import { Link } from 'react-router-dom';

export default function UsersRequestList(props) {
  const usersRequestList = props.current_user_requests.map((user, idx) => {
    return (
      <div key={idx}>
        <img
          className="fullview-players-img request-img"
          src={images.players}
          alt=""
        />
        <Link to={`/Player_Profile/${user.user_id}`}>
          <span className="username-style">{user.user_name}</span>
        </Link>{' '}
        has requested to join.{' '}
        {Validators.ifCreatorOfParty(props.party.user_id_creator) && (
          <>
            <span>Accept request:</span>{' '}
            {props.party.players_needed && (
              <>
                <u onClick={() => this.acceptRequester(user.user_id, 'player')}>
                  (Player)
                </u>
              </>
            )}
            {props.party.dm_needed && (
              <u onClick={() => this.acceptRequester(user.user_id, 'dm')}>
                (Dungeon Master)
              </u>
            )}
          </>
        )}
        <br />
      </div>
    );
  });
  return <>{usersRequestList}</>;
}
