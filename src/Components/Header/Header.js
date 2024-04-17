import React from 'react';

import { Link } from 'react-router-dom';
import TokenService from '../../Helpers/TokenService';

export default function Header(props) {
  const ifToken = props.ifToken;
  return (
    <header className="App-header">
      <Link to="/">
        <h1 className="dndparty-logo">DndParty</h1>
      </Link>
      <nav className="App-nav">
        <Link to="/">Home </Link>
        {!ifToken && (
          <span>
            {' '}
            | <Link to="/Register">Register</Link> |{' '}
          </span>
        )}
        {!ifToken && (
          <span
            tabIndex="0"
            className="App-links"
            onClick={() => props.handleToggleLogin()}
          >
            Login
          </span>
        )}
        {ifToken && (
          <span>
            |{' '}
            <span
              tabIndex="0"
              className="App-links"
              onClick={props.handleProfileLink}
            >
              Profile
            </span>
          </span>
        )}
        {ifToken && (
          <span>
            {' '}
            |{' '}
            <span
              tabIndex="0"
              className="App-links"
              onClick={() => {
                TokenService.clearAuthToken();
                props.loginUpdateToken();
              }}
            >
              Logout
            </span>
          </span>
        )}
        {ifToken && (
          <>
            <br />
            <span>Logged in as {props.user_name}</span>
          </>
        )}
      </nav>
    </header>
  );
}
