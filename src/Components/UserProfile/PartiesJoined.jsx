import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/groups-image/images';
import Loading from '../Loading/Loading';
import { useGetUserJoinedParties } from '../../Api/UserProfile';

export const PartiesJoined = ({ user_id }) => {
  const { isUserJoinedPartiesLoading, userJoinedParties } =
    useGetUserJoinedParties(user_id);

  const partiesJoined = userJoinedParties?.map((party, idx) => {
    return (
      <Link key={idx} to={`/Party/${party?.party_id}`}>
        <div className="parties-joined-container" key={idx}>
          <div className="parties-joined-style">
            <span className="parties-joined-user">
              {' '}
              <img
                className="swordsblue-img"
                src={images.swordsblue}
                alt="Swords crossing icon"
              />
              {party?.party_name}
            </span>
          </div>
          <br />
        </div>
      </Link>
    );
  });

  return (
    <div className="fourth-row-profile">
      <div className="profile-parties-joined">
        <div tabIndex="0" className="player-info-style parties-joined-margin">
          <img
            className="chest-img"
            src={images.chest}
            alt="A treasure chest icon"
          />
          Parties Joined:
        </div>
        <div className="parties-joined-container">
          {isUserJoinedPartiesLoading ? <Loading relative /> : partiesJoined}
        </div>
      </div>
    </div>
  );
};
