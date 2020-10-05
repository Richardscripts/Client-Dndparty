import React from 'react';
import images from '../../assets/groups-image/images';

import './Parties.css';

function Parties(props) {
  return (
    <>
      <div className="party-table">
        <div className="party-top-info-bar">
          <div className="info-party-language">En</div>
          <div className="info-party-online">On</div>
          <div className="info-party-id">Party 1</div>
          <div className="info-party-players">Pl: 1</div>
          <div className="info-party-dm">Dm</div>
        </div>
        <div className="group-image">
          <img src={images.fullparty} alt="a full party " />
        </div>
        <div className="button-wrapper">
          <button className="join-button">Join</button>
        </div>
      </div>
      <div className="party-table">
        <div className="party-top-info-bar">
          <div className="info-party-language">En</div>
          <div className="info-party-online">On</div>
          <div className="info-party-id">Party 2</div>
          <div className="info-party-players">Pl: 4</div>
          <div className="info-party-dm">Dm</div>
        </div>
        <div className="group-image">
          <img src={images.fullparty} alt="a full party " />
        </div>
        <div className="button-wrapper">
          <button className="join-button">Join</button>
        </div>
      </div>
    </>
  );
}

export default Parties;
