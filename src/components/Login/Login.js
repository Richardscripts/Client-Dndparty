import React from 'react';
import api_helpers from '../../helpers/api_helpers';
import TokenService from '../../helpers/token-service';

class Login extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, password } = e.target;
    this.setState({
      error: null,
    });
    api_helpers
      .loginUser(user_name.value, password.value)
      .then((res) => {
        user_name.value = '';
        password.value = '';
        TokenService.clearAuthToken();
        TokenService.saveAuthToken(res.authToken);
        this.props.history.push('/');
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
          <label>Username:</label>
          <input name="user_name" required></input>
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
