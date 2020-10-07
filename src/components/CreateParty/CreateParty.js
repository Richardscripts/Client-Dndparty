import React from 'react';
import Language from './Language/Language';
import DndEdition from './DndEdition/DndEdition';
import OnlineOrNot from './OnlineOrNot/OnlineOrNot';
import ApiHelpers from '../../Helpers/ApiHelpers';

import './CreateParty.css';

export default class CreateParty extends React.Component {
  state = {
    error: null,
    checked: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      party_name,
      players_needed,
      dnd_edition,
      about,
      language,
      online_or_not,
    } = e.target;
    if (!players_needed.value && !this.state.checked) {
      this.setState({
        error: 'Must need atleast 1 Player or Dungeon Master',
      });
      return;
    }
    const partyInfo = {
      party_name: party_name.value,
      players_needed: players_needed.value,
      dm_needed: this.state.checked,
      dnd_edition: dnd_edition.value,
      about: about.value,
      language: language.value,
      online_or_not: online_or_not.value,
    };
    this.setState({
      error: null,
    });
    ApiHelpers.createPartyTable(partyInfo)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} action="#">
        <label htmlFor="party_name">Give your Party a Name:</label>
        <input name="party_name" id="party_name" required></input>
        <br />
        <label htmlFor="players_needed">Player(s) Needed:</label>
        <input type="number" name="players_needed" id="players_needed"></input>
        <br />
        <label htmlFor="dm_needed">Dungeon Master Needed:</label>
        <input
          type="checkbox"
          name="dm_needed"
          id="dm_needed"
          onChange={() => this.setState({ checked: !this.state.checked })}
        ></input>
        <br />
        <OnlineOrNot />
        <br />
        <Language />
        <br />
        <DndEdition />
        <br />
        <label htmlFor="about">About Section:</label>
        <textarea name="about" id="about" />
        <br />
        <button type="submit">Submit</button>
        <br />
        {this.state.error && <span>{this.state.error}</span>}
      </form>
    );
  }
}
