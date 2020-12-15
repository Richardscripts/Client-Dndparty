import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/Groups-image/images';
import Validators from '../../Helpers/Validators';

export default function EditPartyInfo(props) {
  const partyInfo = props.current_party.map((party, idx) => {
    return (
      <div className="party-legend" key={idx}>
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
              <input value={party.about}></input>
              <br />
            </div>
          )}
          <div tabIndex="0" className="party-info-section">
            <br />
            {party.dnd_edition && (
              <>
                <span className="party-style-text">
                  Dungeon and Dragons Edition:
                </span>{' '}
                <input value={party.dnd_edition}></input>
                <br />
              </>
            )}
            {party.language && (
              <>
                <span className="party-style-text">(Primary) Language:</span>{' '}
                <input value={party.language}></input>
                <br />
              </>
            )}
            {party.online_or_not && (
              <>
                <span className="party-style-text">Online or In-Person:</span>{' '}
                <input value={party.online_or_not}></input>
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
              <>
                <span className="party-style-text">Time Of Game:</span>{' '}
                <input value={party.time_of_event}></input>
                <br />
              </>
            )}
            {party.homebrew_rules && (
              <>
                <span className="party-style-text">Homebrew Rules:</span>{' '}
                <input value={party.homebrew_rules}></input>
                <br />
              </>
            )}
            {party.classes_needed && (
              <>
                <span className="party-style-text">Classes Needed:</span>{' '}
                <input value={party.classes_needed}></input>
                <br />
              </>
            )}
            {party.capaign_or_custom && (
              <>
                <span className="party-style-text">Campaign:</span>{' '}
                <input value={party.capaign_or_custom}></input>
                <br />
              </>
            )}
            {party.group_personality && (
              <>
                <span className="party-style-text">Group Personality:</span>{' '}
                <input value={party.group_personality}></input>
                <br />
              </>
            )}
            {party.dm_needed && (
              <span className="party-important-text">
                Dungeon Master Needed
                <br />
              </span>
            )}
            {Number(party.players_needed) ? (
              <>
                <span className="party-important-text">Players Needed:</span>{' '}
                <input value={party.players_needed}></input>
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
        </div>
      </div>
    );
  });
  return <>{partyInfo}</>;
}
