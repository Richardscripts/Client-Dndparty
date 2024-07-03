import React from 'react';
import TokenService from '../../Helpers/TokenService';
import authApiHelpers from '../../Helpers/ApiHelpers/AuthHelpers';
import images from '../../Assets/groups-image/images';
import './Login.css';

class Login extends React.Component {
  state = {
    error: null,
    isLoading: false,
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

    authApiHelpers
      .loginUser(user_email.value, password.value)
      .then((res) => {
        user_email.value = '';
        password.value = '';
        TokenService.clearAuthToken();
        TokenService.saveAuthToken(res.authToken);
        this.props.updateLoginToken();
        const user = TokenService.getUserInfoFromAuthToken();
        this.props.handleUserInfo(user);
        this.props.handleToggleLogin();
        this.setState((prevState) => ({ ...prevState, isLoading: false }));
        this.props.history.push(`/Player_Profile/${user.user_id}`);
      })
      .catch((res) => {
        this.setState((prevState) => ({ ...prevState, error: res.error }));
      })
      .finally((res) => {
        this.setState((prevState) => ({ ...prevState, isLoading: false }));
      });
  };
  render() {
    return (
      <>
        {this.state.isLoading && (
          <div style={{ textAlign: 'center' }}>
            <img
              className="loading-img"
              src={images.loading}
              alt="A shifting geometric shape indicating content loading"
            />
          </div>
        )}
        {!this.state.isLoading && (
          <div className="login-form">
            {' '}
            <form
              onSubmit={(e) => {
                this.setState((prevState) => ({
                  ...prevState,
                  isLoading: true,
                }));
                this.handleSubmit(e);
              }}
              action="#"
            >
              <div className=" cancel-button-wrapper">
                <button
                  style={{ cursor: 'pointer' }}
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
                Test Account: user1@email.com <br />
                Password: password
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
        )}
      </>
    );
  }
}

export default Login;
