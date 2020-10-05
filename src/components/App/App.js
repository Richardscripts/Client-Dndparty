import React from 'react';
import { Link, Route } from 'react-router-dom';

import Parties from '../Parties/Parties';
import Register from '../Register/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to DndParty!</h1>

        <nav className="App-nav">
          <Link to="/">Home</Link> | <Link to="/Register">Register</Link> |
          Login
        </nav>
      </header>
      <main>
        <Route path="/Register" component={Register} />
        <Route exact path="/" component={Parties} />
      </main>
    </div>
  );
}

export default App;
