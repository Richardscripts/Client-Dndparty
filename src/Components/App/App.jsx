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
import PartiesTablesBar from '../Parties/Parties-tables-bar/PartiesTablesBar';
import Register from '../Register/Register';
import { UserProfileLayout } from '../UserProfile/UserProfileLayout';
import PrivateRoute from '../../Helpers/PrivateRoute';
import TokenService from '../../Helpers/TokenService';
import { useGetPartyTables } from '../../Api/App';
import './App.css';

export const App = () => {
  const history = useHistory();
  const [isAuthToken, setIsAuthToken] = useState(TokenService.hasAuthToken());
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    user_name: '',
    userEmail: '',
  });
  const [toggleLogin, setToggleLogin] = useState(false);
  const { partyTablesData, isPartyTablesDataLoading, refetchPartyTables } =
    useGetPartyTables();
  const [filteredParties, setFilteredParties] = useState([]);

  const loginUpdateToken = () => {
    setIsAuthToken(TokenService.hasAuthToken());
  };

  const handleToggleLogin = () => {
    setToggleLogin(!toggleLogin);
  };

  const handleUserInfo = ({ user_id, user_name, sub }) => {
    setUserInfo({ user_id, user_name, sub });
  };

  useEffect(() => {
    if (partyTablesData) {
      setFilteredParties(partyTablesData);
    }
  }, [partyTablesData]);

  // const { user_id, user_name, sub } = TokenService.getUserInfoFromAuthToken();
  // setUserInfo({ user_id, user_name, sub });
  // setIsAppLoading(true);
  // partiesApiHelpers
  //   .getPartyTables(timezone)
  //   .then((res) => {
  //     setCurrentParties([...res]);
  //     setFilteredParties([...res]);
  //   })
  //   .catch((res) => {
  //     console.error(res.error);
  //   })
  //   .finally(() => {
  //     handleEndLoading();
  //   });

  // if (window.location.pathname === '/') {
  //   setTimeout(getPartiesApiHelper, 15000);
  // }

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
    let filteredParties = partyTablesData;
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

  useEffect(() => {
    const { user_id, user_name, sub } = TokenService.getUserInfoFromAuthToken();
    setUserInfo({ user_id, user_name, sub });

    if (window.location.pathname === '/') {
      refetchPartyTables();
    }
  }, []);

  return (
    <div className="App">
      <Header
        isAuthToken={isAuthToken}
        handleToggleLogin={handleToggleLogin}
        loginUpdateToken={loginUpdateToken}
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
            loginUpdateToken={loginUpdateToken}
            handleUserInfo={handleUserInfo}
            handleToggleLogin={handleToggleLogin}
            history={history}
          />
        </>
      )}
      <Route path="/create_party" component={CreatePartyTopBar} />
      <Route path="/Party" component={FullViewPartyTopBar} />
      {!isAuthToken && <Route exact path="/" component={LandingPage} />}
      {!!partyTablesData && (
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
