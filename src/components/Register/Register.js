import React from 'react';
import api_helpers from '../../helpers/api_helpers';

class Register extends React.Component {
  state = {
    form: [{ user_name: '' }, { password: '' }],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, password } = e.target;
    this.setState({
      form: [{ user_name: user_name.value }, { password: password.value }],
    });
    api_helpers.registerUser(user_name.value, password.value).then((res) => {
      user_name.value = '';
      password.value = '';
    });
  };
  render() {
    return (
      <div>
        {' '}
        <form onSubmit={(e) => this.handleSubmit(e)} action="#">
          <label>Username:</label>
          <input name="user_name"></input>
          <br />
          <label>Password:</label>
          <input type="password" name="password"></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
