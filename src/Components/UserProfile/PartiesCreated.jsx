import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/groups-image/images';
import Validators from '../../Helpers/Validators';
import Loading from '../Loading/Loading';

export const PartiesCreated = ({
  userCreatedParties,
  isUserCreatedPartiesLoading,
}) => {
  const partiesCreated = userCreatedParties?.map((party, idx) => {
    const requesters = party?.requesters?.map((requesters) => {
      return requesters?.map((requester, idx) => {
        return (
          <a key={idx} href={`/Player_Profile/${requester?.user_id}`}>
            <span className="requester-name">{requester?.user_name} </span>
          </a>
        );
      });
    });
    return (
      <div key={idx} className="party-tables-created">
        <Link to={`/Party/${party.party_id}`}>
          {' '}
          <h2>{party.party_name}</h2> <br />
          <img src={images.table} alt="A small crafting table" />{' '}
        </Link>
        <br />
        <div>
          {requesters?.length === 0 ? '' : <>Party Requests: {requesters}</>}
          <br />
          <span className="created-text-style">
            Created: {Validators.getNewDate(party.date_created)}{' '}
          </span>
        </div>
        <br />
        <Link to={`/Party/${party.party_id}`}>
          <div className="view-button PartyTableButton">View</div>{' '}
        </Link>
      </div>
    );
  });
  return (
    <div className="fifth-row-profile">
      <div className="profile-parties-created">
        <span tabIndex="0" className="player-info-style">
          Party Tables Created:
        </span>
        <div className="parties-created-container">
          {isUserCreatedPartiesLoading ? <Loading relative /> : partiesCreated}
        </div>
      </div>
    </div>
  );
};
