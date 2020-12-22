import React from 'react';
import images from '../../assets/groups-image/images';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(props) {
  return (
    <>
      <p>
        It's Easy.
        <Link to="/Register">
          <span style={{ color: '#ff5833' }}> Register.</span>
        </Link>{' '}
        <br /> Create Parties, Join them and Connect with Fellow Dnders!
        <br />
        Find the right game for you.
      </p>
      <div className="instructions-row">
        <div className="col">
          <Link to="/Register">
            <h3>Register</h3>
            <img
              className="register-icons"
              src={images.axes}
              alt="Tiny icon of Crossed Axes"
            />
            <p>Sign up and flesh out your profile!</p>
          </Link>
        </div>
        <div className="col">
          <Link to="/Register">
            <h3>Create Parties</h3>
            <img
              className="register-icons"
              src={images.arrows}
              alt="Tiny icon of Crossed Axes"
            />
            <p>
              You can Create a Party Table for users to view and join with tons
              of information to find the right roleplayer for your group.
            </p>
          </Link>
        </div>
        <div className="col">
          <Link to="/Register">
            <h3>Join Parties</h3>
            <img
              className="register-icons"
              src={images.crossedswords}
              alt="Tiny icon of Crossed Axes"
            />
            <p>
              Join Parties created by other users and be invited to play the
              greatest roleplaying game of all time! That's it.
            </p>
          </Link>
        </div>
      </div>
      <div className="legend">
        <img src={images.dm} alt="an icon of a wizard" /> Dungeon Master Needed
        <img src={images.players} alt="an icon of several people" /> Players
        Needed
        <img src={images.book} alt="an icon of a tiny book" /> DnD Edition
        <img src={images.online} alt="an icon of a tiny globee" /> Online or In
        Person
      </div>
    </>
  );
}
