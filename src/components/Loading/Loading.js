import React from 'react';
import images from '../../assets/groups-image/images';
import './Loading.css';

export default function Loading(props) {
  return (
    <>
      <div className="loading-background animate__animated animate__fadeIn animate__delay-1.2s"></div>
      <div className="loading-img-wrapper animate__animated animate__fadeIn animate__delay-1.2s">
        <img
          className="loading-img"
          src={images.loading}
          alt="A shifting geometric shape indictating content loading"
        />
      </div>
    </>
  );
}
