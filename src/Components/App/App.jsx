import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
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
import Register from '../Register/Register';
import { UserProfileLayout } from '../UserProfile/UserProfileLayout';
import PrivateRoute from '../../Helpers/PrivateRoute';
import TokenService from '../../Helpers/TokenService';
import { useGetPartyTables } from '../../Api/App/AppApi';
import { filterParties } from '../../Helpers/ApiHelpers/Utility';
import './App.css';

export const App = () => {
  const history = useHistory();
  const [isAuthToken, setIsAuthToken] = useState(TokenService.hasAuthToken());
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    user_name: '',
    userEmail: '',
  });
  const { user_id, user_name, sub } = TokenService.getUserInfoFromAuthToken();
  const [toggleLogin, setToggleLogin] = useState(false);
  const {
    partyTablesData,
    isPartyTablesDataLoading,
    refreshPartyTables,
    refetchPartyTables,
  } = useGetPartyTables();
  const [filteredParties, setFilteredParties] = useState([]);

  const updateLoginToken = () => {
    setIsAuthToken(TokenService.hasAuthToken());
    history.push('/');
  };

  useEffect(() => {
    if (partyTablesData) {
      setFilteredParties(partyTablesData);
    }
  }, [partyTablesData]);

  const handlePartyFilters = (filters) => {
    const filteredParties = filterParties(partyTablesData, filters);
    setFilteredParties(filteredParties);
  };

  useEffect(() => {
    setUserInfo({ user_id, user_name, sub });
    refreshPartyTables();
  }, []);

  return (
    <div className="App">
      <Header
        isAuthToken={isAuthToken}
        handleToggleLogin={() => setToggleLogin(!toggleLogin)}
        updateLoginToken={updateLoginToken}
        userInfo={userInfo}
        history={history}
      />
      {isAuthToken && (
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
            updateLoginToken={updateLoginToken}
            handleUserInfo={() => setUserInfo({ user_id, user_name, sub })}
            handleToggleLogin={() => setToggleLogin(!toggleLogin)}
            history={history}
          />
        </>
      )}
      <Route path="/create_party" component={CreatePartyTopBar} />
      <Route path="/Party" component={FullViewPartyTopBar} />
      {!isAuthToken && <Route exact path="/" component={LandingPage} />}
      {!!partyTablesData && window.location.pathname === '/' && (
        <div className="party-tables-bar">Party Tables:</div>
      )}
      <main>
        <Switch>
          <Route
            path="/Register"
            render={(props) => (
              <Register
                {...props}
                handleUserInfo={() => setUserInfo({ user_id, user_name, sub })}
                updateLoginToken={updateLoginToken}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Parties
                {...props}
                filtered_parties={filteredParties}
                isPartyTableDataLoading={isPartyTablesDataLoading}
              />
            )}
          />
          <Route
            path="/Party/:party_id"
            render={(props) => (
              <FullViewParty
                {...props}
                refetchPartyTables={refetchPartyTables}
              />
            )}
          />
          <PrivateRoute
            path="/Player_Profile/:user_id"
            component={UserProfileLayout}
            user_email={userInfo.userEmail}
          />

          <Route
            path="/Create_Party"
            render={(props) => (
              <CreateParty {...props} refetchPartyTables={refetchPartyTables} />
            )}
          />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </main>
      <footer>© 2024 - DndParty. All Rights Reserved.</footer>
    </div>
  );
};
