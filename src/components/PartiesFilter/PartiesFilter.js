import React from 'react';

import images from '../../assets/groups-image/images';
import './PartiesFilter.css';

export default class PartiesFilter extends React.Component {
  state = {
    parties_filter: '',
    language: '',
    dnd_edition: '',
    dm_checked: false,
    players_needed: '',
    filterTouched: false,
    filter_day: null,
    filter_month: '',
    filter_date: '',
    filter_year: '',
    filter_hour: '',
    filter_am: '',
  };

  handleClearSelections = async function () {
    await this.setState(
      {
        parties_filter: '',
        language: '',
        dnd_edition: '',
        dm_checked: false,
        players_needed: '',
        filterTouched: false,
        filter_day: '',
        filter_month: '',
        filter_date: '',
        filter_year: '',
        filter_hour: '',
        filter_am: '',
      },
      () => {
        this.props.handlePartyFilters(
          { party_complete: this.state.parties_filter },
          { language: this.state.language },
          { dnd_edition: this.state.dnd_edition },
          { dm_needed: this.state.dm_checked },
          { players_needed: this.state.players_needed },
          { day: this.state.filter_day },
          { month: this.state.filter_month },
          { date: this.state.filter_date },
          { year: this.state.filter_year },
          { hour: this.state.filter_hour },
          { am: this.state.filter_am }
        );
      }
    );
    this.props.togglePartyFilter();
  };

  gatherPartySelections = () => {
    const state = this.state;
    this.props.handlePartyFilters(
      { party_complete: state.parties_filter },
      { language: state.language },
      { dnd_edition: state.dnd_edition },
      { dm_needed: state.dm_checked },
      { players_needed: state.players_needed },
      { day: state.filter_day },
      { month: state.filter_month },
      { date: state.filter_date },
      { year: state.filter_year },
      { hour: state.filter_hour },
      { am: state.filter_am }
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
          {/* <option value="Joined">My Joined Parties</option> */}
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
          <option value="">All</option>
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
          <option value="">All</option>
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
          alt="an icon of a wizard"
        />
        <label htmlFor="dm_needed">DM Needed:</label>
        <input
          type="checkbox"
          name="dm_needed"
          id="dm_needed"
          onChange={(e) => {
            this.setState({
              dm_checked: !this.state.dm_checked,
              filterTouched: !this.state.filterTouched,
            });
          }}
          aria-invalid="true"
          aria-describedby="error-msg"
        />
        <img
          className="create-icons players-image"
          src={images.players}
          alt="an icon of 3 people"
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
        <br />
        <label htmlFor="filter_day">Day: </label>
        <select
          onChange={(e) => {
            this.setState({
              filter_day: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_day"
          name="filter_day"
        >
          <option value="">All</option>
          <option>Sun</option>
          <option>Mon</option>
          <option>Tue</option>
          <option>Wed</option>
          <option>Thu</option>
          <option>Fri</option>
          <option>Sat</option>
        </select>
        <label htmlFor="filter_month">Month: </label>
        <select
          onChange={(e) => {
            this.setState({
              filter_month: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_month"
          name="filter_month"
        >
          <option value="">All</option>
          <option>Jan</option>
          <option>Feb</option>
          <option>Mar</option>
          <option>Apr</option>
          <option>May</option>
          <option>Jun</option>
          <option>Jul</option>
          <option>Aug</option>
          <option>Sep</option>
          <option>Oct</option>
          <option>Nov</option>
          <option>Dec</option>
        </select>
        <label htmlFor="filter_year">Year: </label>
        <select
          onChange={(e) => {
            this.setState({
              filter_year: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_year"
          name="filter_year"
        >
          <option value="">All</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
        </select>
        <label htmlFor="filter_date">Date: </label>
        <input
          onChange={(e) => {
            this.setState({
              filter_date: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_date"
          name="filter_date"
          type="number"
          max={31}
          min={1}
          style={{ width: '60px', paddingRight: '1px' }}
        ></input>
        <br />
        <label htmlFor="filter_hour">Time: </label>
        <select
          onChange={(e) => {
            this.setState({
              filter_hour: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_hour"
          name="filter_hour"
        >
          <option value="">All</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
        <label htmlFor="filter_am"></label>
        <select
          onChange={(e) => {
            this.setState({
              filter_am: e.target.value,
              filterTouched: !this.state.filterTouched,
            });
          }}
          id="filter_am"
          name="filter_am"
        >
          <option>Either</option>
          <option>AM</option>
          <option>PM</option>
        </select>
        <br />
        <button
          onClick={() => this.handleClearSelections()}
          className="defaultButton"
        >
          Clear Selections
        </button>
      </div>
    );
  }
}
