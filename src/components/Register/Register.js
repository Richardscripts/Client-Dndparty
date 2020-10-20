import React from 'react';

import TokenService from '../../Helpers/TokenService';
import images from '../../Assets/Groups-image/images';
import authApi from '../../Helpers/ApiHelpers/auth';

import './Register.css';

class Register extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_email, password, user_name } = e.target;
    this.setState({
      error: null,
    });
    this.props.handleLoading();
    authApi
      .registerUser(user_email.value, password.value, user_name.value)
      .then((res) => {
        user_email.value = '';
        password.value = '';
        user_name.value = '';
        TokenService.clearAuthToken();
        TokenService.saveAuthToken(res.authToken);
        this.props.loginUpdateToken();
        const user = TokenService.getUserInfoFromAuthToken();
        this.props.handleUserInfo(user);
        this.props.history.push(`/Player_Profile/${user.user_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleLoading();
      });
  };
  render() {
    return (
      <div className="register-view">
        <div className="welcome-message-style">
          <h2>Welcome to DnD Party!</h2>
        </div>
        <p>Connect with fellow Dnders to Play with!</p>
        <div className="register-form">
          <form onSubmit={(e) => this.handleSubmit(e)} action="#">
            <div className="register-style"> Register</div>
            <br />
            <label htmlFor="user_email">Email:</label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              aria-required="true"
              required
            ></input>
            <br />
            <label htmlFor="user_name">Nickname or Character Name:</label>
            <input
              id="user_name"
              maxLength="30"
              type="text"
              name="user_name"
              aria-required="true"
              required
            ></input>
            <br />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              maxLength="72"
              type="password"
              name="password"
              aria-required="true"
              aria-invalid="true"
              aria-describedby="register-error"
              required
            ></input>
            <br />
            <div className="tip-style">
              {' '}
              Password Must be min. 8 characters.
            </div>
            <br />
            <div className="register-button-wrapper">
              <button
                className="PartyTableButton register-submit"
                type="submit"
              >
                Submit
              </button>
            </div>
            <br />
            {this.state.error && (
              <div className="register-error" id="register-error">
                {this.state.error}
              </div>
            )}
          </form>
        </div>
        <p>
          It's Easy. Register. Create Parties or Join them and Connect with
          Fellow Dnders!
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
              You can Create a Party Table for users to view and join with tons
              of information to find the right roleplayer for your group.
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
      </div>
    );
  }
}

export default Register;
