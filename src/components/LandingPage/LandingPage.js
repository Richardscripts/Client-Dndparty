import React from 'react';
import images from '../../Assets/Groups-image/images';
import { Link } from 'react-router-dom';

export default function LandingPage(props) {
  return (
    <>
      <p>
        It's Easy. <Link to="/Register">Register.</Link> <br /> Create Parties,
        Join them and Connect with Fellow Dnders!
        <br />
        Find the right game for you.
      </p>
      <div className="instructions-row">
        <div className="col">
          <h3>Register</h3>
          <img
            className="register-icons"
            src={images.axes}
            alt="Tiny icon of Crossed Axes"
          />
          <p>Sign up and flesh out your profile!</p>
        </div>
        <div className="col">
          <h3>Create Parties</h3>
          <img
            className="register-icons"
            src={images.arrows}
            alt="Tiny icon of Crossed Axes"
          />
          <p>
            You can Create a Party Table for users to view and join with tons of
            information to find the right roleplayer for your group.
          </p>
        </div>
        <div className="col">
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
        </div>
      </div>
    </>
  );
}
