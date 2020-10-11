import React from 'react';
import ApiHelpers from '../../Helpers/ApiHelpers';
import TokenService from '../../Helpers/TokenService';

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
      <div>
        {' '}
        <form onSubmit={(e) => this.handleSubmit(e)} action="#">
          <label>Email:</label>
          <input type="email" name="user_email" required></input>
          <br />
          <label>Nickname or Character Name:</label>
          <input type="text" name="user_name" required></input>
          <br />
          <label>Password:</label>
          <input type="password" name="password" required></input>
          <br />
          Password Must be min. 8 characters.
          <br />
          <button type="submit">Submit</button>
          <br />
          {this.state.error && <span>{this.state.error}</span>}
        </form>
      </div>
    );
  }
}

export default Register;
