import React from 'react';
import { Link, Route } from 'react-router-dom';

import UserProfile from '../UserProfile/UserProfile';
import FullViewParty from '../Parties/FullViewParty/FullViewParty';
import CreateParty from '../CreateParty/CreateParty';
import CreatePartyTopBar from '../CreateParty/CreatePartyTopBar';
import CreatePartyButton from '../CreateParty/CreatePartyButton';
import FullViewPartyTopBar from '../Parties/FullViewParty/FullViewPartyTopBar';

import Login from '../Login/Login';
import Parties from '../Parties/Parties';
import Register from '../Register/Register';
import './App.css';

import TokenService from '../../Helpers/TokenService';

class App extends React.Component {
  state = {
    tokenExists: TokenService.hasAuthToken(),
    user: 0,
    user_name: '',
  };

  loginUpdateToken = () => {
    this.setState({ tokenExists: TokenService.hasAuthToken() });
  };

  componentDidMount = () => {
    const user = TokenService.getUserInfoFromAuthToken();
    this.setState({
      user: user.user_id,
      user_name: user.user_name,
    });
  };

  handleUserInfo = (user) => {
    this.setState({
      user: user.user_id,
      user_name: user.user_name,
    });
  };

  render() {
    const ifToken = this.state.tokenExists;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to DndParty!</h1>
          <nav className="App-nav">
            <Link to="/">Home</Link>
            {!ifToken && (
              <span>
                {' '}
                | <Link to="/Register">Register</Link> |{' '}
              </span>
            )}
            {!ifToken && (
              <span>
                <Link to="/Login">Login</Link>
              </span>
            )}
            {ifToken && (
              <span>
                {' '}
                | <Link to={`/Player_profile/${this.state.user}`}>Profile</Link>
              </span>
            )}
            {ifToken && (
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
            {ifToken && (
              <>
                <br />
                <span>Logged in as {this.state.user_name}</span>
              </>
            )}
          </nav>
        </header>
        {this.state.tokenExists && (
          <Route exact path="/" component={CreatePartyButton} />
        )}
        <Route path="/create_party" component={CreatePartyTopBar} />
        <Route path="/Party" component={FullViewPartyTopBar} />
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
            path="/Party/:party_id"
            render={(props) => <FullViewParty {...props} />}
          />
          <Route
            path="/Player_Profile/:user_id"
            render={(props) => <UserProfile {...props} />}
          />

          <Route
            path="/Create_Party"
            render={(props) => <CreateParty {...props} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
