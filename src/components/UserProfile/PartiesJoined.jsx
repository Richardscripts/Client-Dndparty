import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/groups-image/images';

export default function PartiesJoined({ joined_parties }) {
  const partiesJoined = joined_parties?.map((party, idx) => {
    return (
      <Link key={idx} to={`/Party/${party.party_id}`}>
        <div className="parties-joined-container" key={idx}>
          <div className="parties-joined-style">
            <span className="parties-joined-user">
              {' '}
              <img
                className="swordsblue-img"
                src={images.swordsblue}
                alt="Swords crossing icon"
              />
              {party.party_name}
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
        <div className="parties-joined-container">{partiesJoined}</div>
      </div>
    </div>
  );
}
