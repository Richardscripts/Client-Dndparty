import React from 'react';

import NoMatch from '../NoMatch/NoMatch';

import { Route, Switch } from 'react-router-dom';

import UserProfile from '../UserProfile/UserProfile';
import FullViewParty from '../FullViewParty/FullViewParty';
import CreateParty from '../CreateParty/CreateParty';
import CreatePartyTopBar from '../CreateParty/CreatePartyTopBar/CreatePartyTopBar';
import CreatePartyButton from '../CreateParty/CreatePartyButton';
import FullViewPartyTopBar from '../FullViewParty/FullViewPartyTopBar';
import Header from '../Header/Header';
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
    user_email: '',
    profile_updated: false,
    toggleLogin: false,
  };

  loginUpdateToken = () => {
    this.setState({ tokenExists: TokenService.hasAuthToken() });
  };

  handleToggleLogin = () => {
    this.setState({ toggleLogin: !this.state.toggleLogin });
  };

  handleProfileLink = () => {
    this.props.history.push(`/Player_Profile/${this.state.user}`);
    this.setState({ profile_updated: true });
  };

  handleProfileUpdate = () => {
    this.setState({ profile_updated: false });
  };

  componentDidMount = () => {
    const user = TokenService.getUserInfoFromAuthToken();
    this.setState({
      user: user.user_id,
      user_name: user.user_name,
      user_email: user.sub,
    });
  };

  handleUserInfo = (user) => {
    this.setState({
      user: user.user_id,
      user_name: user.user_name,
      user_email: user.sub,
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          ifToken={this.state.tokenExists}
          handleToggleLogin={this.handleToggleLogin}
          loginUpdateToken={this.loginUpdateToken}
          handleProfileLink={this.handleProfileLink}
          user_name={this.state.user_name}
        />
        {this.state.tokenExists && (
          <Route exact path="/" component={CreatePartyButton} />
        )}
        {this.state.toggleLogin && (
          <Login
            loginUpdateToken={this.loginUpdateToken}
            handleUserInfo={this.handleUserInfo}
            toggleLogin={this.state.toggleLogin}
            handleToggleLogin={this.handleToggleLogin}
            history={this.props.history}
          />
        )}
        <Route path="/create_party" component={CreatePartyTopBar} />
        <Route path="/Party" component={FullViewPartyTopBar} />
        <main>
          <Switch>
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
            <Route exact path="/" render={(props) => <Parties {...props} />} />
            <Route
              path="/Party/:party_id"
              render={(props) => (
                <FullViewParty
                  {...props}
                  handleRequestToJoinParty={this.handleRequestToJoinParty}
                />
              )}
            />
            <Route
              path="/Player_Profile/:user_id"
              render={(props) => (
                <UserProfile
                  {...props}
                  user_email={this.state.user_email}
                  profile_updated={this.state.profile_updated}
                  handleProfileUpdate={this.handleProfileUpdate}
                />
              )}
            />
            <Route
              path="/Create_Party"
              render={(props) => <CreateParty {...props} />}
            />
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
