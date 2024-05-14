import React from 'react';

import { Link } from 'react-router-dom';
import TokenService from '../../Helpers/TokenService';

export default function Header({
  isAuthToken,
  history,
  userInfo,
  handleToggleLogin,
  loginUpdateToken,
}) {
  return (
    <header className="App-header">
      <Link to="/">
        <h1 className="dndparty-logo">DndParty</h1>
      </Link>
      <nav className="App-nav">
        <Link to="/">Home </Link>
        {!isAuthToken && (
          <span>
            {' '}
            | <Link to="/Register">Register</Link> |{' '}
          </span>
        )}
        {!isAuthToken && (
          <span
            tabIndex="0"
            className="App-links"
            onClick={() => handleToggleLogin()}
          >
            Login
          </span>
        )}
        {isAuthToken && (
          <span>
            |{' '}
            <span
              tabIndex="0"
              className="App-links"
              onClick={() => {
                history.push(`/Player_Profile/${userInfo.user_id}`);
              }}
            >
              Profile
            </span>
          </span>
        )}
        {isAuthToken && (
          <span>
            {' '}
            |{' '}
            <span
              tabIndex="0"
              className="App-links"
              onClick={() => {
                TokenService.clearAuthToken();
                loginUpdateToken();
              }}
            >
              Logout
            </span>
          </span>
        )}
        {isAuthToken && (
          <>
            <br />
            <span>Logged in as {userInfo.user_name}</span>
          </>
        )}
      </nav>
    </header>
  );
}
