import React from 'react';

import images from '../../Assets/Groups-image/images';
import './PartiesFilter.css';

export default class PartiesFilter extends React.Component {
  state = {
    parties_filter: '',
    language: '',
    dnd_edition: '',
    dm_checked: false,
    players_needed: 0,
    filterTouched: false,
  };

  gatherPartySelections = () => {
    const state = this.state;
    this.props.handlePartyFilters(
      { party_complete: state.parties_filter },
      { language: state.language },
      { dnd_edition: state.dnd_edition },
      { dm_needed: state.dm_checked.toString() },
      { players_needed: state.players_needed.toString() }
    );
    this.setState({ filterTouched: false });
  };

  componentDidUpdate = () => {
    if (this.state.filterTouched === true) {
      this.gatherPartySelections();
    }
  };

  render() {
    return (
      <div className="PartiesFilter">
        <label htmlFor="parties_filter">Filter Parties: </label>
        <select
          onChange={(e) => {
            this.setState({
              parties_filter: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="parties_filter"
          name="parties_filter"
        >
          <option value="">All</option>
          <option value="Party Incomplete!">Incomplete Parties</option>
          <option value="Complete Party!">Completed Parties</option>
          <option value="Joined">My Joined Parties</option>
        </select>
        <label htmlFor="filter_language">Language: </label>
        <select
          onChange={(e) => {
            this.setState({
              language: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_language"
          name="filter_language"
        >
          <option>All</option>
          <option>Catalan</option>
          <option>Chinese Simplified & Traditional</option>
          <option>Czech</option>
          <option>Dansk (Danish)</option>
          <option>Deutsch (German)</option>
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>Espanol (Spanish)</option>
          <option>Euskara (Basque)</option>
          <option>Francais (French)</option>
          <option>Greek</option>
          <option>Hebrew</option>
          <option>Italian</option>
          <option>Japanese</option>
          <option>Latvian</option>
          <option>Magyar (Hungarian)</option>
          <option>Nederlands (Dutch)</option>
          <option>Norwegian (Norsk)</option>
          <option>Polish</option>
          <option>Portuguese (Brasilian)</option>
          <option>Russian</option>
          <option>Slovak</option>
          <option>Suomi (Finnish)</option>
          <option>Swedish</option>
          <option>Turkish</option>
        </select>
        <label htmlFor="filter_edition">D&amp;D Edition: </label>
        <select
          onChange={(e) => {
            this.setState({
              dnd_edition: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_edition"
          name="filter_edition"
        >
          <option>All</option>
          <option>5th Edition</option>
          <option>4th Edition</option>
          <option>3rd Edition</option>
          <option>2nd Edition</option>
          <option>1st Edition</option>
        </select>
        <br />
        <img
          className="create-icons dm-image"
          src={images.dm}
          alt="an icon of 3 people"
        />
        <label htmlFor="dm_needed">DM:</label>
        <input
          type="checkbox"
          name="dm_needed"
          id="dm_needed"
          onChange={(e) => {
            this.setState({
              dm_checked: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          aria-invalid="true"
          aria-describedby="error-msg"
        />
        <label htmlFor="players_needed">Player(s) Needed:</label>
        <input
          onChange={(e) => {
            this.setState({
              players_needed: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          min={0}
          type="number"
          name="players_needed"
          id="players_needed"
          placeholder={0}
        ></input>
      </div>
    );
  }
}
