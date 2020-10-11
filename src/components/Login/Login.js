import React from 'react';
import ApiHelpers from '../../Helpers/ApiHelpers';
import TokenService from '../../Helpers/TokenService';

class Login extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_email, password } = e.target;
    this.setState({
      error: null,
    });
    ApiHelpers.loginUser(user_email.value, password.value)
      .then((res) => {
        user_email.value = '';
        password.value = '';
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
      <div>
        {' '}
        <form onSubmit={(e) => this.handleSubmit(e)} action="#">
          <label>Email:</label>
          <input type="email" name="user_email" required></input>
          <br />
          <label>Password:</label>
          <input type="password" name="password" required></input>
          <br />
          <button type="submit">Submit</button>
          <br />
          {this.state.error && <span>{this.state.error}</span>}
        </form>
      </div>
    );
  }
}

export default Login;
