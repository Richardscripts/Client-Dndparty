import React from 'react';
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
import Loading from '../Loading/Loading';
import NoMatch from '../NoMatch/NoMatch';
import TokenService from '../../Helpers/TokenService';
import PrivateRoute from '../../Helpers/PrivateRoute';
import * as usertz from 'user-timezone';
import partiesApi from '../../Helpers/ApiHelpers/parties';

import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import PartiesTablesBar from '../Parties/Parties-tables-bar/PartiesTablesBar';

const timezone = usertz.getTimeZone();

class App extends React.Component {
  state = {
    tokenExists: TokenService.hasAuthToken(),
    user: 0,
    user_name: '',
    user_email: '',
    profile_updated: false,
    toggleLogin: false,
    loading: false,
    current_parties: [],
    filtered_parties: [],
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

  handleUserInfo = (user) => {
    this.setState({
      user: user.user_id,
      user_name: user.user_name,
      user_email: user.sub,
    });
  };

  handleStartLoading = () => {
    this.setState({ loading: true });
  };

  handleEndLoading = () => {
    this.setState({ loading: false });
  };

  handlePartyFilters = (
    party_complete,
    language,
    dnd_edition,
    dm_needed,
    players_needed,
    day,
    month,
    year,
    date,
    hour,
    am
  ) => {
    const filters = [
      party_complete,
      language,
      dnd_edition,
      dm_needed,
      players_needed,
      day,
      month,
      year,
      date,
      hour,
      am,
    ];
    if (filters[4].players_needed === '0') {
      filters[4].players_needed = false;
    }
    let filteredParties = this.state.current_parties;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][Object.keys(filters[i])]) {
        filteredParties = filteredParties.filter((party) => {
          return (
            party[Object.keys(filters[i])] ===
            filters[i][Object.keys(filters[i])]
          );
        });
      }
    }
    this.setState({ filtered_parties: filteredParties });
  };

  getPartiesApi = () => {
    const user = TokenService.getUserInfoFromAuthToken();
    this.setState({
      user: user.user_id,
      user_name: user.user_name,
      user_email: user.sub,
      loading: true,
    });
    partiesApi
      .getPartyTables(timezone)
      .then((res) => {
        this.setState({
          current_parties: [...res],
          filtered_parties: [...res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      })
      .finally(() => {
        this.handleEndLoading();
      });
  };

  componentDidMount = () => {
    this.getPartiesApi();
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
          <Route
            exact
            path="/"
            render={(props) => (
              <CreatePartyButton
                {...props}
                handlePartyFilters={this.handlePartyFilters}
              />
            )}
          />
        )}
        {this.state.toggleLogin && (
          <>
            <div className="fadeBackground"></div>
            <Login
              loginUpdateToken={this.loginUpdateToken}
              handleUserInfo={this.handleUserInfo}
              handleToggleLogin={this.handleToggleLogin}
              history={this.props.history}
              handleStartLoading={this.handleStartLoading}
              handleEndLoading={this.handleEndLoading}
            />
          </>
        )}
        <Route path="/create_party" component={CreatePartyTopBar} />
        <Route path="/Party" component={FullViewPartyTopBar} />
        {!this.state.tokenExists && (
          <Route exact path="/" component={LandingPage} />
        )}
        {this.state.current_parties.length !== 0 && (
          <Route exact path="/" component={PartiesTablesBar} />
        )}
        <main>
          {this.state.loading && <Loading />}
          <Switch>
            <Route
              path="/Register"
              render={(props) => (
                <Register
                  {...props}
                  handleUserInfo={this.handleUserInfo}
                  loginUpdateToken={this.loginUpdateToken}
                  handleStartLoading={this.handleStartLoading}
                  handleEndLoading={this.handleEndLoading}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <Parties
                  {...props}
                  handleStartLoading={this.handleStartLoading}
                  handleEndLoading={this.handleEndLoading}
                  filtered_parties={this.state.filtered_parties}
                />
              )}
            />
            <Route
              path="/Party/:party_id"
              render={(props) => (
                <FullViewParty
                  {...props}
                  handleStartLoading={this.handleStartLoading}
                  handleEndLoading={this.handleEndLoading}
                  getPartiesApi={this.getPartiesApi}
                  loading={this.state.loading}
                  timezone={timezone}
                />
              )}
            />
            <PrivateRoute
              path="/Player_Profile/:user_id"
              component={UserProfile}
              user_email={this.state.user_email}
              profile_updated={this.state.profile_updated}
              handleProfileUpdate={this.handleProfileUpdate}
              handleStartLoading={this.handleStartLoading}
              handleEndLoading={this.handleEndLoading}
            />

            <Route
              path="/Create_Party"
              render={(props) => (
                <CreateParty
                  {...props}
                  handleStartLoading={this.handleStartLoading}
                  handleEndLoading={this.handleEndLoading}
                  getPartiesApi={this.getPartiesApi}
                />
              )}
            />
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </main>
        <footer>© 2020 - DndParty. All Rights Reserved.</footer>
      </div>
    );
  }
}

export default App;
