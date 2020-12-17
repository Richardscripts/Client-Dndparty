import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/Groups-image/images';
import Validators from '../../Helpers/Validators';
import FormDatePicker from '../CreateParty/FormDatePicker/FormDatePicker';
import './EditPartyInfo.css';

export default class EditPartyInfo extends React.Component {
  state = {
    dm_checked: false,
    completeDate: '',
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

  render() {
    const partyInfo = this.props.current_party.map((party, idx) => {
      return (
        <form
          onSubmit={this.props.handleEditSubmit}
          action="#"
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
                <textarea
                  aria-label="party_about"
                  defaultValue={party.about}
                ></textarea>
                <br />
              </div>
            )}
            <div tabIndex="0" className="party-info-section">
              <br />
              {party.dnd_edition && (
                <>
                  <label className="party-style-text" htmlFor="dnd_edition">
                    Dungeons &amp; Dragons Edition:
                  </label>
                  <select
                    id="dnd_edition"
                    name="dnd_edition"
                    aria-invalid="true"
                    aria-describedby="error-msg"
                  >
                    <option>5th Edition</option>
                    <option>4th Edition</option>
                    <option>3rd Edition</option>
                    <option>2nd Edition</option>
                    <option>1st Edition</option>
                  </select>
                  <br />
                </>
              )}
              {party.language && (
                <>
                  <label className="party-style-text" htmlFor="language">
                    (Primary) Language:
                  </label>
                  <select
                    id="language"
                    name="language"
                    aria-invalid="true"
                    aria-describedby="error-msg"
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
              )}
              {party.online_or_not && (
                <>
                  <label className="party-style-text" htmlFor="online_or_not">
                    Online or In-Person:
                  </label>
                  <select
                    id="online_or_not"
                    name="online_or_not"
                    aria-invalid="true"
                    aria-describedby="error-msg"
                  >
                    <option>Online</option>
                    <option>In-Person</option>
                    <option>Either \ Both</option>
                  </select>
                  <br />
                </>
              )}
              {party.camera_required && (
                <span className="party-style-text">
                  Camera Required
                  <br />
                </span>
              )}
              {party.time_of_event && (
                <div className="edit-calendar">
                  <span className="party-style-text">Time Of Game:</span>{' '}
                  <FormDatePicker
                    handleDate={this.handleDate}
                    date={this.state.date}
                  />
                  <br />
                </div>
              )}
              {party.homebrew_rules && (
                <>
                  <span className="party-style-text">Homebrew Rules:</span>{' '}
                  <input defaultValue={party.homebrew_rules}></input>
                  <br />
                </>
              )}
              {party.classes_needed && (
                <>
                  <span className="party-style-text">Classes Needed:</span>{' '}
                  <input defaultValue={party.classes_needed}></input>
                  <br />
                </>
              )}
              {party.capaign_or_custom && (
                <>
                  <span className="party-style-text">Campaign:</span>{' '}
                  <input defaultValue={party.capaign_or_custom}></input>
                  <br />
                </>
              )}
              {party.group_personality && (
                <>
                  <span className="party-style-text">Group Personality:</span>{' '}
                  <input defaultValue={party.group_personality}></input>
                  <br />
                </>
              )}
              {party.dm_needed && (
                <>
                  <span className="party-important-text">
                    Dungeon Master Needed
                    <input
                      aria-label="dm_needed"
                      type="checkbox"
                      name="dm_needed"
                      id="dm_needed"
                      onChange={() =>
                        this.setState({ dm_checked: !this.state.dm_checked })
                      }
                      aria-invalid="true"
                    />
                  </span>
                  <br />
                </>
              )}
              {Number(party.players_needed) ? (
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
                    placeholder={0}
                    aria-invalid="true"
                    aria-describedby="error-msg"
                  ></input>
                  <br />
                </>
              ) : (
                ''
              )}
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
