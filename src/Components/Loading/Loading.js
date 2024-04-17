import React from 'react';
import images from '../../Assets/groups-image/images';
import './Loading.css';

export default function Loading(props) {
  return (
    <>
      <div className="loading-background animate__animated animate__fadeIn"></div>
      <div className="loading-img-wrapper animate__animated animate__fadeIn">
        <img
          className="loading-img"
          src={images.loading}
          alt="A shifting geometric shape indicating content loading"
        />
      </div>
    </>
  );
}
