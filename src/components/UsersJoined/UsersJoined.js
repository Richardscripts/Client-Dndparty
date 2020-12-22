import React from 'react';

import { Link } from 'react-router-dom';
import images from '../../assets/groups-image/images';

export default function UsersJoined(props) {
  const usersJoined = props.current_joined_users.map((user, idx) => {
    return (
      <div key={idx}>
        {' '}
        <img className="fullview-players-img" src={images.players} alt="" />
        <Link to={`/Player_Profile/${user.user_id}`}>
          <span className="username-style">
            {user.user_name}
            <span className="visuallyhidden">has Joined Party</span>
          </span>
        </Link>{' '}
        has joined party.
      </div>
    );
  });
  return <>{usersJoined}</>;
}
