import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as usertz from 'user-timezone';

import CreateParty from '../CreateParty/CreateParty';
import CreatePartyButton from '../CreateParty/CreatePartyButton';
import CreatePartyTopBar from '../CreateParty/CreatePartyTopBar/CreatePartyTopBar';
import FullViewParty from '../FullViewParty/FullViewParty';
import FullViewPartyTopBar from '../FullViewParty/FullViewPartyTopBar';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';
import NoMatch from '../NoMatch/NoMatch';
import Parties from '../Parties/Parties';
import PartiesTablesBar from '../Parties/Parties-tables-bar/PartiesTablesBar';
import Register from '../Register/Register';
import { UserProfileLayout } from '../UserProfile/UserProfileLayout';
import partiesApiHelpers from '../../Helpers/ApiHelpers/PartiesHelpers';
import PrivateRoute from '../../Helpers/PrivateRoute';
import TokenService from '../../Helpers/TokenService';
import './App.css';

const timezone = usertz.getTimeZone();

export const App = ({ isAppLoading, setIsAppLoading }) => {
  const history = useHistory();
  const [tokenExists, setTokenExists] = useState(TokenService.hasAuthToken());
  const [user, setUser] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [currentParties, setCurrentParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);

  const loginUpdateToken = () => {
    setTokenExists(TokenService.hasAuthToken());
  };

  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  };

  const handleProfileLink = () => {
    history.push(`/Player_Profile/${user}`);
    setProfileUpdated(true);
  };

  const handleProfileUpdate = () => {
    setProfileUpdated(false);
  };

  const handleUserInfo = (user) => {
    setUser(user.user_id);
    setUserName(user.user_name);
    setUserEmail(user.sub);
  };

  const handleStartLoading = () => {
    setIsAppLoading(true);
  };

  const handleEndLoading = () => {
    setIsAppLoading(false);
  };

  const handlePartyFilters = (
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
    let filteredParties = currentParties;
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
    setFilteredParties(filteredParties);
  };

  const getPartiesApiHelper = () => {
    const user = TokenService.getUserInfoFromAuthToken();
    setUser(user.user_id);
    setUserName(user.user_name);
    setUserEmail(user.sub);
    setIsAppLoading(true);
    partiesApiHelpers
      .getPartyTables(timezone)
      .then((res) => {
        setCurrentParties([...res]);
        setFilteredParties([...res]);
      })
      .catch((res) => {
        console.error(res.error);
      })
      .finally(() => {
        handleEndLoading();
      });

    if (window.location.pathname === '/') {
      setTimeout(getPartiesApiHelper, 15000);
    }
  };

  useEffect(() => {
    getPartiesApiHelper();
  }, []);

  return (
    <div className="App">
      <Header
        ifToken={tokenExists}
        handleToggleLogin={handleToggleLogin}
        loginUpdateToken={loginUpdateToken}
        handleProfileLink={handleProfileLink}
        user_name={userName}
      />
      {tokenExists && (
        <Route
          exact
          path="/"
          render={(props) => (
            <CreatePartyButton
              {...props}
              handlePartyFilters={handlePartyFilters}
            />
          )}
        />
      )}
      {toggleLogin && (
        <>
          <div className="fadeBackground"></div>
          <Login
            loginUpdateToken={loginUpdateToken}
            handleUserInfo={handleUserInfo}
            handleToggleLogin={handleToggleLogin}
            history={history}
            handleStartLoading={handleStartLoading}
            handleEndLoading={handleEndLoading}
          />
        </>
      )}
      <Route path="/create_party" component={CreatePartyTopBar} />
      <Route path="/Party" component={FullViewPartyTopBar} />
      {!tokenExists && <Route exact path="/" component={LandingPage} />}
      {currentParties.length !== 0 && (
        <Route exact path="/" component={PartiesTablesBar} />
      )}
      <main>
        <Switch>
          <Route
            path="/Register"
            render={(props) => (
              <Register
                {...props}
                handleUserInfo={handleUserInfo}
                loginUpdateToken={loginUpdateToken}
                handleStartLoading={handleStartLoading}
                handleEndLoading={handleEndLoading}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Parties
                {...props}
                handleStartLoading={handleStartLoading}
                handleEndLoading={handleEndLoading}
                filtered_parties={filteredParties}
                isAppLoading={isAppLoading}
              />
            )}
          />
          <Route
            path="/Party/:party_id"
            render={(props) => (
              <FullViewParty
                {...props}
                handleStartLoading={handleStartLoading}
                handleEndLoading={handleEndLoading}
                getPartiesApiHelper={getPartiesApiHelper}
                loading={isAppLoading}
                timezone={timezone}
              />
            )}
          />
          <PrivateRoute
            path="/Player_Profile/:user_id"
            component={UserProfileLayout}
            user_email={userEmail}
            profile_updated={profileUpdated}
            handleProfileUpdate={handleProfileUpdate}
            handleStartLoading={handleStartLoading}
            handleEndLoading={handleEndLoading}
          />

          <Route
            path="/Create_Party"
            render={(props) => (
              <CreateParty
                {...props}
                handleStartLoading={handleStartLoading}
                handleEndLoading={handleEndLoading}
                getPartiesApiHelper={getPartiesApiHelper}
              />
            )}
          />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </main>
      <footer>© 2023 - DndParty. All Rights Reserved.</footer>
    </div>
  );
};
