import React from 'react';
import images from '../../Assets/groups-image/images';
import './Loading.css';

export default function Loading({ relative }) {
  return (
    <>
      <div
        className="loading-background"
        style={relative ? { position: 'relative' } : {}}
      ></div>

      <div
        style={relative ? { position: 'relative' } : {}}
        className="loading-img-wrapper"
      >
        <img
          className="loading-img"
          src={images.loading}
          alt="A shifting geometric shape indicating content loading"
        />
      </div>
    </>
  );
}
