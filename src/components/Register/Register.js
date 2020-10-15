import React from 'react';
import ApiHelpers from '../../Helpers/ApiHelpers';
import TokenService from '../../Helpers/TokenService';
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
    ApiHelpers.registerUser(user_email.value, password.value, user_name.value)
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
      });
  };
  render() {
    return (
      <div className="register-view">
        <div className="welcome-message-style">
          <h2>Welcome to D&D Party!</h2>
        </div>
        <p>Connect with fellow Dnders to Play with!</p>
        <div className="register-form">
          <form onSubmit={(e) => this.handleSubmit(e)} action="#">
            <div className="register-style"> Register</div>
            <br />
            <label>Email:</label>
            <input type="email" name="user_email" required></input>
            <br />
            <label>Nickname or Character Name:</label>
            <input maxLength="30" type="text" name="user_name" required></input>
            <br />
            <label>Password:</label>
            <input
              maxLength="72"
              type="password"
              name="password"
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
              <div className="register-error">{this.state.error}</div>
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
            <p>Sign up and flesh out your profile!</p>
          </div>
          <div className="col">
            <h3>Create Parties</h3>
            <p>
              You can Create a Party Table for users to view and join with tons
              of information to find the right roleplayer for your group.
            </p>
          </div>
          <div className="col">
            <h3>Join Parties</h3>
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
