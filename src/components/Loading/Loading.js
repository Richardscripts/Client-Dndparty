import React from 'react';
import images from '../../Assets/Groups-image/images';
import './Loading.css';

export default function Loading(props) {
  return (
    <div className="loading-img-wrapper animate__animated animate__fadeIn animate__delay-1s">
      <img
        className="loading-img"
        src={images.loading}
        alt="A shifting geometric shape indictating content loading"
      />
    </div>
  );
}
