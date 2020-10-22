import React from 'react';
import TokenService from '../../Helpers/TokenService';
import authApi from '../../Helpers/ApiHelpers/auth';

import './Login.css';

class Login extends React.Component {
  state = {
    error: null,
  };

  handleCancelButton = () => {
    this.props.handleToggleLogin();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_email, password } = e.target;
    this.setState({
      error: null,
    });
    this.props.handleStartLoading();
    authApi
      .loginUser(user_email.value, password.value)
      .then((res) => {
        user_email.value = '';
        password.value = '';
        TokenService.clearAuthToken();
        TokenService.saveAuthToken(res.authToken);
        this.props.loginUpdateToken();
        const user = TokenService.getUserInfoFromAuthToken();
        this.props.handleUserInfo(user);
        this.props.handleToggleLogin();
        this.props.history.push(`/Player_Profile/${user.user_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
  };
  render() {
    return (
      <div className="login-form">
        {' '}
        <form onSubmit={(e) => this.handleSubmit(e)} action="#">
          <div className=" cancel-button-wrapper">
            <button
              type="button"
              onClick={() => this.handleCancelButton()}
              className="cancel-button"
            >
              X
            </button>
          </div>
          <label htmlFor="user_email">Email:</label>
          <input
            id="user_email"
            aria-required="true"
            type="email"
            name="user_email"
            aria-invalid="true"
            aria-describedby="register-error"
            required
          ></input>
          <br />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            aria-required="true"
            type="password"
            name="password"
            required
            aria-invalid="true"
            aria-describedby="register-error"
          ></input>
          <span className="register-error">
            Test account: user1@email.com <br />
            Pw: password
          </span>
          <br />
          <button className="PartyTableButton login-submit" type="submit">
            Submit
          </button>
          <br />
          {this.state.error && (
            <span className="register-error" id="register-error">
              {this.state.error}
            </span>
          )}
        </form>
      </div>
    );
  }
}

export default Login;
