import React from 'react';
import CreateParty from '../CreateParty/CreateParty';
import CreatePartyButton from '../CreateParty/CreatePartyButton';
import TokenService from '../../Helpers/TokenService';
import FullViewParty from '../../Components/Parties/FullViewParty';

import Login from '../Login/Login';
import { Link, Route } from 'react-router-dom';

import Parties from '../Parties/Parties';
import Register from '../Register/Register';
import './App.css';

class App extends React.Component {
  state = {
    tokenExists: TokenService.hasAuthToken(),
  };
  loginUpdateToken = () => {
    this.setState({ tokenExists: TokenService.hasAuthToken() });
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
              <Register {...props} loginUpdateToken={this.loginUpdateToken} />
            )}
          />
          <Route exact path="/" component={Parties} />
          <Route
            path="/Login"
            render={(props) => (
              <Login {...props} loginUpdateToken={this.loginUpdateToken} />
            )}
          />
          <Route
            path="/Create_Party"
            render={(props) => (
              <CreateParty
                {...props}
                loginUpdateToken={this.loginUpdateToken}
              />
            )}
          />
          <Route
            path="/Party/:party_id"
            render={(props) => (
              <FullViewParty
                {...props}
                loginUpdateToken={this.loginUpdateToken}
              />
            )}
          />
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
