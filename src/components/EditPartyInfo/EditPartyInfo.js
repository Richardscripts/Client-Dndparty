import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/groups-image/images';
import Validators from '../../Helpers/Validators';
import FormDatePicker from '../CreateParty/FormDatePicker/FormDatePicker';
import partiesApi from '../../Helpers/ApiHelpers/parties';

import './EditPartyInfo.css';

export default class EditPartyInfo extends React.Component {
  state = {
    error: null,
    dm_checked: Boolean(this.props.current_party[0].dm_needed),
    camera_checked: false,
    completeDate: '',
    time_of_event: new Date(this.props.current_party[0].date_object),
  };

  componentDidMount = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  handleDate = (date) => {
    this.setState({
      time_of_event: date,
      completeDate: date.toUTCString(),
    });
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    this.props.handleStartLoading();
    const {
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
      players_needed: parseInt(players_needed.value),
      dm_needed: this.state.dm_checked,
      dnd_edition: dnd_edition.value,
      about: about.value,
      language: language.value,
      online_or_not: online_or_not.value,
      homebrew_rules: homebrew_rules.value,
      time_of_event:
        this.state.completeDate || this.props.current_party[0].date_object,
      classes_needed: classes_needed.value,
      group_personality: group_personality.value,
      campaign_or_custom: campaign_or_custom.value,
      camera_required: this.state.camera_required,
    };
    this.setState({
      error: null,
    });
    partiesApi
      .editPartyTable(partyInfo, this.props.party_id)
      .then(() => {
        this.props.updateEditParty();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        Validators.refreshLoginToken(res.error);
      })
      .finally(() => {
        this.props.toggleEditParty();
        this.props.handleEndLoading();
      });
  };

  render() {
    const partyInfo = this.props.current_party.map((party, idx) => {
      if (party.players_needed === '') party.players_needed = '0';
      return (
        <form
          onSubmit={(e) => this.handleEditSubmit(e)}
          action="#"
          id="edit-party-info"
          className="party-legend edit-party-info"
          key={idx}
        >
          <div className="top-row-party">
            <div className="party-name-top">{party.party_name}</div>
          </div>
          <div className="second-row-party">
            <span tabIndex="0" className="party-creator-style">
              {' '}
              Party Creator:{' '}
              <Link to={`/Player_Profile/${party.user_id_creator}`}>
                {party.user_name}
              </Link>
            </span>
            <br />
            {party.about && (
              <div tabIndex="0" className="party-about-section">
                <label htmlFor="about">Introduce Campaign</label>
                <br />
                <textarea
                  maxLength={400}
                  id="about"
                  name="about"
                  style={{ width: '80%' }}
                  defaultValue={party.about}
                ></textarea>
                <br />
              </div>
            )}
            <div tabIndex="0" className="party-info-section">
              <br />
              <>
                <label className="party-style-text" htmlFor="dnd_edition">
                  Dungeons &amp; Dragons Edition:
                </label>
                <select
                  defaultValue={party.dnd_edition}
                  id="dnd_edition"
                  name="dnd_edition"
                  aria-invalid="true"
                >
                  <option>5th Edition</option>
                  <option>4th Edition</option>
                  <option>3rd Edition</option>
                  <option>2nd Edition</option>
                  <option>1st Edition</option>
                </select>
                <br />
              </>
              <>
                <label className="party-style-text" htmlFor="language">
                  (Primary) Language:
                </label>
                <select
                  defaultValue={party.language}
                  id="language"
                  name="language"
                  aria-invalid="true"
                >
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
                <br />
              </>
              <>
                <label className="party-style-text" htmlFor="online_or_not">
                  Online or In-Person:
                </label>
                <select
                  defaultValue={party.online_or_not}
                  id="online_or_not"
                  name="online_or_not"
                  aria-invalid="true"
                >
                  <option>Online</option>
                  <option>In-Person</option>
                  <option>Either \ Both</option>
                </select>
                <br />
              </>
              <>
                <label className="party-style-text" htmlFor="camera_required">
                  Camera Required:
                </label>
                <input
                  checked={Boolean(party.camera_required)}
                  type="checkbox"
                  name="camera_required"
                  id="camera_required"
                  onChange={() =>
                    this.setState({
                      camera_checked: !this.state.camera_checked,
                    })
                  }
                  aria-invalid="true"
                />
              </>
              <div className="edit-calendar">
                <span className="party-style-text">Time Of Game:</span>{' '}
                <FormDatePicker
                  handleDate={this.handleDate}
                  date={this.state.time_of_event}
                />
                <br />
              </div>
              <>
                <label htmlFor="homebrew_rules" className="party-style-text">
                  Homebrew Rules:
                </label>{' '}
                <input
                  name="homebrew_rules"
                  id="homebrew_rules"
                  defaultValue={party.homebrew_rules}
                ></input>
                <br />
              </>
              <>
                <label htmlFor="classes_needed" className="party-style-text">
                  Classes Needed:
                </label>{' '}
                <input
                  name="classes_needed"
                  id="classes_needed"
                  defaultValue={party.classes_needed}
                ></input>
                <br />
              </>
              <>
                <label htmlFor="capaign_or_custom" className="party-style-text">
                  Campaign:
                </label>{' '}
                <input
                  maxLength={100}
                  name="campaign_or_custom"
                  id="campaign_or_custom"
                  defaultValue={party.capaign_or_custom}
                ></input>
                <br />
              </>
              <>
                <label htmlFor="group_personality" className="party-style-text">
                  Group Personality:
                </label>{' '}
                <input
                  name="group_personality"
                  id="group_personality"
                  defaultValue={party.group_personality}
                ></input>
                <br />
              </>
              <>
                <label htmlFor="dm_needed" className="party-important-text">
                  Dungeon Master Needed
                  <input
                    checked={this.state.dm_checked}
                    type="checkbox"
                    name="dm_needed"
                    id="dm_needed"
                    onChange={() =>
                      this.setState({ dm_checked: !this.state.dm_checked })
                    }
                    aria-invalid="true"
                  />
                </label>
                <br />
              </>
              <>
                <label
                  className="party-important-text"
                  htmlFor="players_needed"
                >
                  Player(s) Needed:
                </label>
                <input
                  min={0}
                  type="number"
                  name="players_needed"
                  id="players_needed"
                  maxLength={99}
                  defaultValue={party.players_needed}
                  aria-invalid="true"
                ></input>
                <br />
              </>
              Created: {Validators.newDate(party.date_created)}{' '}
              <div className="party-completed">
                {party.party_complete === 'Complete Party!' ? (
                  <img
                    className="clipboard-img"
                    src={images.complete}
                    alt="Clipboard with a Green Check"
                  />
                ) : (
                  <img
                    className="clipboard-img"
                    src={images.incomplete}
                    alt="Clipboard with a Green Check"
                  />
                )}
                {party.party_complete}
              </div>
            </div>
            <div className="edit-buttons-wrapper">
              <button
                onClick={this.props.toggleEditParty}
                className="defaultButton"
              >
                Cancel
              </button>{' '}
              <button type="submit" className="defaultButton">
                Submit
              </button>
            </div>
          </div>
        </form>
      );
    });
    return <>{partyInfo}</>;
  }
}
