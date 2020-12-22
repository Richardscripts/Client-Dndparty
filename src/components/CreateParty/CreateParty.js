import React from 'react';
import Language from './Language/Language';
import DndEdition from './DndEdition/DndEdition';
import OnlineOrNot from './OnlineOrNot/OnlineOrNot';
import images from '../../assets/groups-image/images';
import partiesApi from '../../Helpers/ApiHelpers/parties';
import Validators from '../../Helpers/Validators';
import FormDatePicker from './FormDatePicker/FormDatePicker';
import './CreateParty.css';

export default class CreateParty extends React.Component {
  state = {
    error: null,
    dm_checked: false,
    camera_checked: false,
    completeDate: '',
    date: '',
  };

  handleDate = (date) => {
    if (date)
      this.setState({
        date,
        completeDate: date.toUTCString(),
      });
    else
      this.setState({
        date,
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleStartLoading();
    const {
      party_name,
      players_needed,
      dnd_edition,
      about,
      language,
      online_or_not,
      homebrew_rules,
      classes_needed,
      group_personality,
      campaign_or_custom,
    } = e.target;
    if (!players_needed.value && !this.state.dm_checked) {
      this.setState({
        error: 'Must need atleast 1 Player or a Dungeon Master',
      });
      return;
    }
    const partyInfo = {
      party_name: party_name.value,
      players_needed: parseInt(players_needed.value),
      dm_needed: this.state.dm_checked,
      dnd_edition: dnd_edition.value,
      about: about.value,
      language: language.value,
      online_or_not: online_or_not.value,
      homebrew_rules: homebrew_rules.value,
      time_of_event: this.state.completeDate,
      date_object: this.state.date,
      classes_needed: classes_needed.value,
      group_personality: group_personality.value,
      campaign_or_custom: campaign_or_custom.value,
      camera_required: this.state.camera_checked,
    };
    this.setState({
      error: null,
    });

    partiesApi
      .createPartyTable(partyInfo)
      .then((res) => {
        this.props.getPartiesApi();
        this.props.history.push(`/Party/${res.party_id}`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
        Validators.refreshLoginToken(res.error);
      })
      .finally(() => {
        this.props.handleEndLoading();
      });
  };
  render() {
    return (
      <div className="create-party-border">
        <div className="create-party-form-wrapper">
          <form
            className="create-party-form"
            onSubmit={(e) => this.handleSubmit(e)}
            action="#"
          >
            <div className="center">
              <h2 className="center create-party-h2">Let's Get Started!</h2>
            </div>
            {this.state.error && (
              <div className="error-msg" id="error-msg">
                {this.state.error}
              </div>
            )}
            <br />
            <div className="required-inputs">
              <label htmlFor="party_name">Give your Party a Name:</label>
              <input
                maxLength={30}
                name="party_name"
                id="party_name"
                aria-required="true"
                aria-invalid="true"
                aria-describedby="error-msg"
                required
              ></input>
              <br />
              <img
                className="create-icons players-image"
                src={images.players}
                alt="an icon of 3 people"
              />
              <label htmlFor="players_needed">Player(s) Needed:</label>
              <input
                min={0}
                type="number"
                name="players_needed"
                id="players_needed"
                maxLength={99}
                placeholder={0}
                aria-invalid="true"
                aria-describedby="error-msg"
              ></input>
              <br />
              <img
                className="create-icons dm-image"
                src={images.dm}
                alt="an icon of a wizard"
              />
              <label htmlFor="dm_needed">Dungeon Master Needed:</label>
              <input
                type="checkbox"
                name="dm_needed"
                id="dm_needed"
                onChange={() =>
                  this.setState({ dm_checked: !this.state.dm_checked })
                }
                aria-invalid="true"
                aria-describedby="error-msg"
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
                  aria-invalid="true"
                  aria-describedby="error-msg"
                />
                <br />
                <DndEdition />
                <br />
                <label htmlFor="about">Introduce Campaign: </label>
                <textarea
                  maxLength={400}
                  name="about"
                  id="about"
                  aria-invalid="true"
                  aria-describedby="error-msg"
                />
                <br />
              </div>
              <div className="optional-inputs-right">
                <br />
                <label htmlFor="campaign_or_custom">Campaign Name:</label>
                <input
                  maxLength={100}
                  name="campaign_or_custom"
                  id="campaign_or_custom"
                  aria-invalid="true"
                  aria-describedby="error-msg"
                />
                <br />

                <label htmlFor="classes_needed">Classes Needed: </label>
                <input
                  maxLength={100}
                  name="classes_needed"
                  id="classes_needed"
                  placeholder="Paladin, Wizard,...etc"
                  aria-invalid="true"
                  aria-describedby="error-msg"
                />
                <br />
                <label htmlFor="group_personality">Group Personality: </label>
                <input
                  maxLength={100}
                  type="group_personality"
                  name="group_personality"
                  id="group_personality"
                  placeholder="Laidback or Serious, etc"
                  aria-invalid="true"
                  aria-describedby="error-msg"
                />
                <br />
                <label htmlFor="homebrew_rules">Homebrew Rules: </label>
                <textarea
                  maxLength={450}
                  name="homebrew_rules"
                  id="homebrew_rules"
                  aria-invalid="true"
                  aria-describedby="error-msg"
                ></textarea>
                <br />
              </div>
            </div>
            <br />
            <div className="calendar">
              Date of Game:
              <br />
              <FormDatePicker
                handleDate={this.handleDate}
                date={this.state.date}
              />
              <br />
            </div>
            <div className="button-wrapper">
              <button className="myButton" type="submit">
                Submit Party
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
