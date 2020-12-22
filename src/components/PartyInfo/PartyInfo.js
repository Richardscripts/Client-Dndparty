import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/groups-image/images';
import Validators from '../../Helpers/Validators';

export default function PartyInfo(props) {
  const partyInfo = props.current_party.map((party, idx) => {
    const date = new Date(party.time_of_event).toDateString();
    const timeOfDay = new Date(party.time_of_event).toLocaleString();
    const time = timeOfDay.split(' ')[1].slice(0, 5);
    const am = timeOfDay.slice(-2);
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
              {party.about}
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
                {party.dnd_edition}
                <br />
              </>
            )}
            {party.language && (
              <>
                <span className="party-style-text">(Primary) Language:</span>{' '}
                {party.language}
                <br />
              </>
            )}
            {party.online_or_not && (
              <>
                <span className="party-style-text">Online or In-Person:</span>{' '}
                {party.online_or_not}
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
                <span className="party-style-text">Time Of Game:</span> {date},{' '}
                {time} {am}
                <br />
              </>
            )}
            {party.homebrew_rules && (
              <>
                <span className="party-style-text">Homebrew Rules:</span>{' '}
                {party.homebrew_rules}
                <br />
              </>
            )}
            {party.classes_needed && (
              <>
                <span className="party-style-text">Classes Needed:</span>{' '}
                {party.classes_needed}
                <br />
              </>
            )}
            {party.capaign_or_custom && (
              <>
                <span className="party-style-text">Campaign:</span>{' '}
                {party.capaign_or_custom}
                <br />
              </>
            )}
            {party.group_personality && (
              <>
                <span className="party-style-text">Group Personality:</span>{' '}
                {party.group_personality}
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
                {party.players_needed}
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
