import React, { useEffect, useState, useRef } from 'react';
import Language from './Language/Language';
import DndEdition from './DndEdition/DndEdition';
import OnlineOrNot from './OnlineOrNot/OnlineOrNot';
import images from '../../Assets/groups-image/images';
import FormDatePicker from './FormDatePicker/FormDatePicker';
import { useCreatePartyTable } from '../../Api/CreateParty/CreatePartyApi';
import { scrollTo } from '../../Helpers/ApiHelpers/Utility';
import './CreateParty.css';

export const CreateParty = ({ history }) => {
  const [state, setState] = useState({
    error: null,
    dm_checked: false,
    camera_checked: false,
    completeDate: '',
    date: '',
  });
  const scrollToElement = useRef(null);
  const { createPartyTable, createPartyTableError } =
    useCreatePartyTable(history);

  useEffect(() => {
    if (createPartyTableError) {
      setState((prevState) => ({ ...prevState, error: createPartyTableError }));
      scrollTo(scrollToElement);
    }
  }, [createPartyTableError]);

  const handleDate = ({ target: { value } }) => {
    const date = new Date(value?.toString());

    setState((prevState) => ({
      ...prevState,
      date,
      completeDate: date?.toUTCString(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    } = event?.target || {};

    const isNoPlayersNeeded =
      !Number(players_needed.value) && !state.dm_checked;

    if (isNoPlayersNeeded) {
      setState((prevState) => ({
        ...prevState,
        error: 'Must need atleast 1 Player or Dungeon Master',
      }));
      return;
    }

    const partyInfo = {
      party_name: party_name.value,
      players_needed: parseInt(players_needed.value),
      dm_needed: state.dm_checked,
      dnd_edition: dnd_edition.value,
      about: about?.value,
      language: language.value,
      online_or_not: online_or_not.value,
      homebrew_rules: homebrew_rules.value,
      time_of_event: state.completeDate,
      date_object: state.date,
      classes_needed: classes_needed.value,
      group_personality: group_personality.value,
      campaign_or_custom: campaign_or_custom.value,
      camera_required: state.camera_checked,
    };
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));

    createPartyTable(partyInfo);
  };

  return (
    <div className="create-party-border" ref={scrollToElement}>
      <div className="create-party-form-wrapper">
        <form
          className="create-party-form"
          onSubmit={(e) => handleSubmit(e)}
          action="#"
        >
          <div className="center">
            <h2 className="center create-party-h2">Let's Get Started!</h2>
          </div>
          {!!state.error && (
            <div className="error-msg" id="error-msg">
              {state.error}
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
                setState((prevState) => ({
                  ...prevState,
                  dm_checked: !state.dm_checked,
                }))
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
                  setState((prevState) => ({
                    ...prevState,
                    camera_checked: !state.camera_checked,
                  }))
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
            <FormDatePicker handleDate={handleDate} date={state.date} />
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
};

export default CreateParty;
