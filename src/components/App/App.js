import React from 'react';
import { Link, Route } from 'react-router-dom';

import UserProfile from '../UserProfile/UserProfile';
import FullViewParty from '../Parties/FullViewParty/FullViewParty';
import CreateParty from '../CreateParty/CreateParty';
import CreatePartyButton from '../CreateParty/CreatePartyButton';
import Login from '../Login/Login';
import Parties from '../Parties/Parties';
import Register from '../Register/Register';
import './App.css';

import TokenService from '../../Helpers/TokenService';

class App extends React.Component {
  state = {
    tokenExists: TokenService.hasAuthToken(),
    user: 0,
  };
  loginUpdateToken = () => {
    this.setState({ tokenExists: TokenService.hasAuthToken() });
  };

  componentDidMount = () => {
    this.setState({ user: TokenService.getUserIdFromAuthToken() });
  };
  handleUserInfo = (user_id) => {
    this.setState({
      user: user_id,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to DndParty!</h1>
          <nav className="App-nav">
            <Link to="/">Home</Link>
            {!this.state.tokenExists && (
              <span>
                {' '}
                | <Link to="/Register">Register</Link> |{' '}
              </span>
            )}
            {!this.state.tokenExists && (
              <span>
                <Link to="/Login">Login</Link>
              </span>
            )}
            {this.state.tokenExists && (
              <span>
                {' '}
                | <Link to={`/Player_profile/${this.state.user}`}>Profile</Link>
              </span>
            )}
            {this.state.tokenExists && (
              <span>
                {' '}
                |{' '}
                <span
                  onClick={() => {
                    TokenService.clearAuthToken();
                    this.loginUpdateToken();
                  }}
                >
                  Logout
                </span>
              </span>
            )}
          </nav>
        </header>
        {this.state.tokenExists && (
          <Route exact path="/" component={CreatePartyButton} />
        )}
        <main>
          <Route
            path="/Register"
            render={(props) => (
              <Register
                {...props}
                handleUserInfo={this.handleUserInfo}
                loginUpdateToken={this.loginUpdateToken}
              />
            )}
          />
          <Route exact path="/" component={Parties} />
          <Route
            path="/Login"
            render={(props) => (
              <Login
                {...props}
                loginUpdateToken={this.loginUpdateToken}
                handleUserInfo={this.handleUserInfo}
              />
            )}
          />
          <Route
            path="/Create_Party"
            render={(props) => <CreateParty {...props} />}
          />
          <Route
            path="/Party/:party_id"
            render={(props) => <FullViewParty {...props} />}
          />
          <Route
            path="/Player_Profile/:user_id"
            render={(props) => <UserProfile {...props} />}
          />
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
