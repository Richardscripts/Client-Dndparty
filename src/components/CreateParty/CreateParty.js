import React from 'react';
import Language from './Language/Language';
import DndEdition from './DndEdition/DndEdition';
import OnlineOrNot from './OnlineOrNot/OnlineOrNot';
import images from '../../Assets/Groups-image/images';
import partiesApi from '../../Helpers/ApiHelpers/parties';
import Validators from '../../Helpers/Validators';
import FormDatePicker from './FormDatePicker/FormDatePicker';

import './CreateParty.css';

export default class CreateParty extends React.Component {
  state = {
    error: null,
    dm_checked: false,
    camera_checked: false,
    date: '',
    day: '',
    month: '',
    dateInteger: '',
    year: '',
    timeZone: '0000',
    GMT: 'GMT',
    completeDate: '',
    am: '',
    universal: '',
  };

  handleDate = (date) => {
    const dateDetails = this.getDayMonthYearDate(date);
    this.setState({
      date,
      completeDate: dateDetails.date,
      day: dateDetails.day,
      month: dateDetails.month,
      dateInteger: dateDetails.dateInteger,
      year: dateDetails.year,
      hour: dateDetails.time.split(':')[0],
      am: dateDetails.time.split(' ')[1],
      universal: dateDetails.universal,
    });
  };

  handleTimeZone = (e) => {
    const zones = e.target.value.split(' ');
    this.setState({ timeZone: zones[0], GMT: zones[1] });
  };

  getDayMonthYearDate(fullDate) {
    let dateArr = fullDate.toString().split(' ');
    let universal = dateArr[4];
    dateArr[5] = `GMT${this.state.timeZone}`;
    dateArr = dateArr.slice(0, 6);
    dateArr[6] = this.state.GMT;
    dateArr[4] = Validators.convert(dateArr[4]);
    return {
      date: dateArr.join(' '),
      day: dateArr[0],
      month: dateArr[1],
      dateInteger: dateArr[2],
      year: dateArr[3],
      time: dateArr[4],
      universal,
    };
  }

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
      day: this.state.day,
      month: this.state.month,
      date: this.state.dateInteger,
      year: this.state.year,
      hour: this.state.hour,
      am: this.state.am,
      universal: this.state.universal,
      GMT: this.state.GMT,
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
              <div>
                Time Zone:
                <select
                  onChange={this.handleTimeZone}
                  name="timezone_offset"
                  id="timezone_offset"
                >
                  <option value="-1200 IDLW">Select Time Zone</option>
                  <option value="-1200 IDLW">
                    (GMT -1200) Eniwetok, Kwajalein
                  </option>
                  <option value="-1100 NT">
                    (GMT -1100) Midway Island, Samoa
                  </option>
                  <option value="-1000 HST">(GMT -1000) Hawaii</option>
                  <option value="-0950">(GMT -930) Taiohae</option>
                  <option value="-0900 AKST">(GMT -900) Alaska</option>
                  <option value="-0800 PST">
                    (GMT -800) Pacific Time (US &amp; Canada)
                  </option>
                  <option value="-0700 MST">
                    (GMT -700) Mountain Time (US &amp; Canada)
                  </option>
                  <option value="-0600 CST">
                    (GMT -600) Central Time (US &amp; Canada), Mexico City
                  </option>
                  <option value="-0500 EST">
                    (GMT -500) Eastern Time (US &amp; Canada), Bogota, Lima
                  </option>
                  <option value="-0450">(GMT -430) Caracas</option>
                  <option value="-0400 AST">
                    (GMT -400) Atlantic Time (Canada), Caracas, La Paz
                  </option>
                  <option value="-0350">(GMT -330) Newfoundland</option>
                  <option value="-0300 ART">
                    (GMT -300) Brazil, Buenos Aires, Georgetown
                  </option>
                  <option value="-0200 AT">(GMT -200) Mid-Atlantic</option>
                  <option value="-0100 WAT">
                    (GMT -100) Azores, Cape Verde Islands
                  </option>
                  <option value="+0000 GMT">
                    (GMT) Western Europe Time, London, Lisbon, Casablanca
                  </option>
                  <option value="+0100 CET">
                    (GMT +100) Brussels, Copenhagen, Madrid, Paris
                  </option>
                  <option value="+0200 EET">
                    (GMT +200) Kaliningrad, South Africa
                  </option>
                  <option value="+0300 MSK">
                    (GMT +300) Baghdad, Riyadh, Moscow, St. Petersburg
                  </option>
                  <option value="+0350 IRST">(GMT +330) Tehran</option>
                  <option value="+0400 AMT">
                    (GMT +400) Abu Dhabi, Muscat, Baku, Tbilisi
                  </option>
                  <option value="+0450 AFT">(GMT +430) Kabul</option>
                  <option value="+0500 PKT">
                    (GMT +500) Ekaterinburg, Islamabad, Karachi, Tashkent
                  </option>
                  <option value="+0550 IST">
                    (GMT +530) Bombay, Calcutta, Madras, New Delhi
                  </option>
                  <option value="+0575 NPT">
                    (GMT +545) Kathmandu, Pokhara
                  </option>
                  <option value="+0600 OMSK">
                    (GMT +600) Almaty, Dhaka, Colombo
                  </option>
                  <option value="+0650 CCT\MMT">
                    (GMT +630) Yangon, Mandalay
                  </option>
                  <option value="+0700 KRAT">
                    (GMT +700) Bangkok, Hanoi, Jakarta
                  </option>
                  <option value="+0800 CST">
                    (GMT +800) Beijing, Perth, Singapore, Hong Kong
                  </option>
                  <option value="+0875 ACWST">(GMT +845) Eucla</option>
                  <option value="+0900 JST">
                    (GMT +900) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
                  </option>
                  <option value="+0950 ACST">
                    (GMT +930) Adelaide, Darwin
                  </option>
                  <option value="+1000 AEST">
                    (GMT +1000) Eastern Australia, Guam, Vladivostok
                  </option>
                  <option value="+1050 ACDT">
                    (GMT +1030) Lord Howe Island
                  </option>
                  <option value="+1100 SAKT">
                    (GMT +1100) Magadan, Solomon Islands, New Caledonia
                  </option>
                  <option value="+1150 NFT">(GMT +1130) Norfolk Island</option>
                  <option value="+1200 NZST">
                    (GMT +1200) Auckland, Wellington, Fiji, Kamchatka
                  </option>
                  <option value="+1275 CHAST">
                    (GMT +1245) Chatham Islands
                  </option>
                  <option value="+1300 NZDT">
                    (GMT +1300) Apia, Nukualofa
                  </option>
                  <option value="+1400 LINT">
                    (GMT +1400) Line Islands, Tokelau
                  </option>
                </select>
              </div>
              <br />
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
