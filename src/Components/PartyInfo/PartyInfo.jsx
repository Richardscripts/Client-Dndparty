import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../Assets/groups-image/images';
import Validators from '../../Helpers/Validators';

export default function PartyInfo({ current_party }) {
  const date = new Date(current_party?.time_of_event).toDateString();
  const timeOfDay = new Date(current_party?.time_of_event).toLocaleString();
  const time = timeOfDay.split(' ')[1].slice(0, 5);
  const am = timeOfDay.slice(-2);
  return (
    <div className="party-legend">
      <div className="top-row-party">
        <div className="party-name-top">{current_party?.party_name}</div>
      </div>
      <div className="second-row-party">
        <span tabIndex="0" className="party-creator-style">
          {' '}
          Party Creator:{' '}
          <Link to={`/Player_Profile/${current_party?.user_id_creator}`}>
            {current_party?.user_name}{' '}
            <img
              style={{
                maxWidth: '18px',
                verticalAlign: 'baseline',
                filter: 'brightness(10)',
              }}
              alt="link out icon"
              src={images.linkOut}
            />
          </Link>
        </span>
        <br />
        {current_party?.about && (
          <div tabIndex="0" className="party-about-section">
            {current_party?.about}
            <br />
          </div>
        )}
        <div tabIndex="0" className="party-info-section">
          <br />
          {current_party?.dnd_edition && (
            <>
              <span className="party-style-text">
                Dungeon and Dragons Edition:
              </span>{' '}
              {current_party?.dnd_edition}
              <br />
            </>
          )}
          {current_party?.language && (
            <>
              <span className="party-style-text">(Primary) Language:</span>{' '}
              {current_party?.language}
              <br />
            </>
          )}
          {current_party?.online_or_not && (
            <>
              <span className="party-style-text">Online or In-Person:</span>{' '}
              {current_party?.online_or_not}
              <br />
            </>
          )}
          {current_party?.camera_required && (
            <span className="party-style-text">
              Camera Required
              <br />
            </span>
          )}
          {current_party?.time_of_event && (
            <>
              <span className="party-style-text">Time Of Game:</span> {date},{' '}
              {time} {am}
              <br />
            </>
          )}
          {current_party?.homebrew_rules && (
            <>
              <span className="party-style-text">Homebrew Rules:</span>{' '}
              {current_party?.homebrew_rules}
              <br />
            </>
          )}
          {current_party?.classes_needed && (
            <>
              <span className="party-style-text">Classes Needed:</span>{' '}
              {current_party?.classes_needed}
              <br />
            </>
          )}
          {current_party?.capaign_or_custom && (
            <>
              <span className="party-style-text">Campaign:</span>{' '}
              {current_party?.capaign_or_custom}
              <br />
            </>
          )}
          {current_party?.group_personality && (
            <>
              <span className="party-style-text">Group Personality:</span>{' '}
              {current_party?.group_personality}
              <br />
            </>
          )}
          {current_party?.dm_needed && (
            <span className="party-important-text">
              Dungeon Master Needed{' '}
              <img
                alt="wizard icon"
                style={{ maxWidth: '23px', verticalAlign: 'middle' }}
                src={images.dm}
              />
              <br />
            </span>
          )}
          {Number(current_party?.players_needed) ? (
            <>
              <span className="party-important-text">Players Needed:</span>{' '}
              {current_party?.players_needed}
              <br />
            </>
          ) : (
            ''
          )}
          Created: {Validators.getNewDate(current_party?.date_created)}{' '}
          <div className="party-completed">
            {current_party?.party_complete === 'Complete Party!' ? (
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
            {current_party?.party_complete}
          </div>
        </div>
      </div>
    </div>
  );
}
