import React from 'react';
import Language from './Language/Language';
import DndEdition from './DndEdition/DndEdition';
import OnlineOrNot from './OnlineOrNot/OnlineOrNot';
import ApiHelpers from '../../Helpers/ApiHelpers';
import images from '../../Assets/Groups-image/images';

import './CreateParty.css';

export default class CreateParty extends React.Component {
  state = {
    error: null,
    dm_checked: false,
    camera_checked: false,
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
      homebrew_rules,
      time_of_event,
      classes_needed,
      group_personality,
      campaign_or_custom,
    } = e.target;
    if (!players_needed.value && !this.state.checked) {
      this.setState({
        error: 'Must need atleast 1 Player or a Dungeon Master',
      });
      return;
    }
    const partyInfo = {
      party_name: party_name.value,
      players_needed: players_needed.value,
      dm_needed: this.state.dm_checked,
      dnd_edition: dnd_edition.value,
      about: about.value,
      language: language.value,
      online_or_not: online_or_not.value,
      homebrew_rules: homebrew_rules.value,
      time_of_event: time_of_event.value,
      classes_needed: classes_needed.value,
      group_personality: group_personality.value,
      campaign_or_custom: campaign_or_custom.value,
      camera_required: this.state.camera_checked,
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
      <div className="create-party-form-wrapper">
        <form
          className="create-party-form"
          onSubmit={(e) => this.handleSubmit(e)}
          action="#"
        >
          <div className="center">
            <h2 className="center create-party-h2">Let's Get Started!</h2>
          </div>
          <div className="required-inputs">
            <label htmlFor="party_name">Give your Party a Name:</label>
            <input name="party_name" id="party_name" required></input>
            <br />
            <img
              className="create-icons players-image"
              src={images.players}
              alt="an icon of 3 people"
            />
            <label htmlFor="players_needed">Player(s) Needed:</label>
            <input
              type="number"
              name="players_needed"
              id="players_needed"
              placeholder={0}
            ></input>
            <br />
            <img
              className="create-icons dm-image"
              src={images.dm}
              alt="an icon of 3 people"
            />
            <label htmlFor="dm_needed">Dungeon Master Needed:</label>
            <input
              type="checkbox"
              name="dm_needed"
              id="dm_needed"
              onChange={() =>
                this.setState({ dm_checked: !this.state.dm_checked })
              }
            />
          </div>
          <br />
          <div className="center">
            <h2 className="create-party-h2">Optional Stuff Below!</h2>
          </div>
          <div className="optional-inputs">
            <div className="optional-inputs-left">
              <br />

              <Language />
              <br />
              <OnlineOrNot />
              <br />
              <label htmlFor="camera_required">Camera Required:</label>
              <input
                type="checkbox"
                name="camera_required"
                id="camera_required"
                onChange={() =>
                  this.setState({
                    camera_checked: !this.state.camera_checked,
                  })
                }
              />
              <br />
              <DndEdition />
              <br />
              <label htmlFor="about">About Section: </label>
              <textarea name="about" id="about" />
              <br />
            </div>
            <div className="optional-inputs-right">
              <br />
              <label htmlFor="campaign_or_custom">Campaign Name:</label>
              <input name="campaign_or_custom" id="campaign_or_custom" />
              <br />

              <label htmlFor="classes_needed">Classes Needed: </label>
              <input
                name="classes_needed"
                id="classes_needed"
                placeholder="Paladin, Wizard,...etc"
              />
              <br />
              <label htmlFor="group_personality">Group Personality: </label>
              <input
                type="group_personality"
                name="group_personality"
                id="group_personality"
                placeholder="Laidback or Serious, etc"
              />
              <br />
              <label htmlFor="time_of_event">Time of Game: </label>
              <textarea
                name="time_of_event"
                id="time_of_event"
                placeholder="Wed @ 5:00pm EST,    Sat @ 6:00PM EST"
              />
              <br />
              <label htmlFor="homebrew_rules">Homebrew Rules: </label>
              <textarea name="homebrew_rules" id="homebrew_rules"></textarea>
              <br />
            </div>
          </div>
          {this.state.error && <span>{this.state.error}</span>}
          <br />
          <div className="button-wrapper">
            <button className="myButton" type="submit">
              Submit Party
            </button>
          </div>
        </form>
      </div>
    );
  }
}
