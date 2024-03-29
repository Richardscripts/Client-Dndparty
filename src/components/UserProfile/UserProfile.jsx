import React, { useEffect, useState } from 'react';
import images from '../../Assets/groups-image/images';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import Validators from '../../Helpers/Validators';
import { Link } from 'react-router-dom';
import profileApiHelper from '../../Helpers/ApiHelpers/ProfileHelper';
import partiesApiHelper from '../../Helpers/ApiHelpers/PartiesHelper';
import './UserProfile.css';

function UserProfile(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState({
    user_info: [{ user_name: '' }],
    created_parties: [{ requesters: [] }],
    joined_parties: [],
    editing: false,
  });

  const handleEditProfile = () => {
    setState((prevState) => ({
      ...prevState,
      editing: !state.editing,
    }));
    setErrorMessage('');

    document
      .getElementById('second-row-profile')
      .scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    const user_id = state.user_info[0].user_id;
    const {
      user_name,
      name,
      dnd_experience,
      location,
      languages,
      about_me,
      contact,
      preferred_editions,
      preferred_classes,
      char_url,
      char_name,
    } = e.target;

    let pdfCheck = char_url.value
      .slice(char_url.value.length - 4, char_url.value.length)
      .toLowerCase();

    if (pdfCheck && pdfCheck !== '.pdf') {
      setErrorMessage('Character Sheet URL must be a PDF file');
      return;
    }

    const userInfo = {
      user_name: user_name.value,
      name: name.value,
      dnd_experience: dnd_experience.value,
      location: location.value,
      languages: languages.value,
      about_me: about_me.value,
      contact: contact.value,
      preferred_editions: preferred_editions.value,
      preferred_classes: preferred_classes.value,
      character_sheets: `${char_name.value}: ${char_url.value}`,
    };

    setErrorMessage('');

    props.handleStartLoading();
    profileApiHelper
      .editUserProfile(userInfo, user_id)
      .then(() => {
        setState((prevState) => ({ ...prevState, editing: !state.editing }));
        profileApiCalls();
      })
      .catch((res) => {
        setErrorMessage(res.errorMessage);
        Validators.refreshLoginToken(res.errorMessage);
      })
      .finally(() => {
        props.handleEndLoading();
        document.getElementById('second-row-profile').scrollIntoView();
      });
  };

  useEffect(() => {
    if (props.profile_updated === true) {
      profileApiCalls();
      props.handleProfileUpdate();
    }
  }, [profile_updated]);

  profileApiCalls = () => {
    const { match } = props;
    const user_id = match.params.user_id;
    props.handleStartLoading();

    profileApiHelper
      .getUserProfile(user_id)
      .then((res) => {
        setState((prevState) => ({ ...prevState, user_info: [res] }));
      })
      .catch((res) => {
        setErrorMessage(res.errorMessage);
        Validators.refreshLoginToken(res.errorMessage);
      })
      .finally(() => {
        props.handleEndLoading();
      });

    props.handleStartLoading();

    profileApiHelper
      .getUserCreatedParties(user_id)
      .then((res) => {
        res.forEach((party) => {
          party.requesters = [];
          partiesApiHelper.getUserRequests(party.party_id).then((result) => {
            for (let i = 0; i < result.length; i++) {
              setState(() =>
                party.requesters.push([
                  {
                    user_name: result[i].user_name,
                    user_id: result[i].user_id,
                  },
                ]),
              );
            }
          });
        });
        setState({
          created_parties: res,
        });
      })
      .catch((res) => {
        setErrorMessage(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });

    props.handleStartLoading();
    partiesApiHelper
      .getUserJoinedParty(user_id)
      .then((res) => {
        setState({
          joined_parties: res,
        });
      })
      .catch((res) => {
        setErrorMessage(res.error);
      })
      .finally(() => {
        props.handleEndLoading();
      });
  };

  useEffect(() => {
    profileApiCalls();
  }, []);

  const profile_user_id = props.match.params.user_id;
  const partiesJoined = state.joined_parties.map((party, idx) => {
    return (
      <Link key={idx} to={`/Party/${party.party_id}`}>
        <div className="parties-joined-container" key={idx}>
          <div className="parties-joined-style">
            <span className="parties-joined-user">
              {' '}
              <img
                className="swordsblue-img"
                src={images.swordsblue}
                alt="Swords crossing icon"
              />
              {party.party_name}
            </span>
          </div>
          <br />
        </div>
      </Link>
    );
  });

  const partiesCreated = state.created_parties.map((party, idx) => {
    const requesters = party.requesters.map((requesters) => {
      return requesters.map((requester, idx) => {
        return (
          <a key={idx} href={`/Player_Profile/${requester.user_id}`}>
            <span className="requester-name">{requester.user_name} </span>
          </a>
        );
      });
    });
    return (
      <div key={idx} className="party-tables-created">
        <Link to={`/Party/${party.party_id}`}>
          {' '}
          <h2>{party.party_name}</h2> <br />
          <img src={images.table} alt="A small crafting table" />{' '}
        </Link>
        <br />
        <div>
          {requesters.length === 0 ? '' : <>Party Requests: {requesters}</>}
          <br />
          <span className="created-text-style">
            Created: {Validators.newDate(party.date_created)}{' '}
          </span>
        </div>
        <br />
        <Link to={`/Party/${party.party_id}`}>
          <div className="view-button PartyTableButton">View</div>{' '}
        </Link>
      </div>
    );
  });

  return (
    <div className="user-profile animate__animated animate__fadeIn">
      <div className="top-row-profile">
        <span tabIndex="0" className="profile-top-bar username-style-profile">
          {state.user_info[0].user_name}'s Profile
        </span>
      </div>
      <div id="second-row-profile" className="second-row-profile">
        <div className="profile-user-icon">
          <span className="player-name-style">
            {state.user_info[0].user_name}
          </span>
          <br />
          <img
            className="swords-img"
            src={images.swords}
            alt="Icon of crossing swords"
          />
        </div>
      </div>
      <div className="third-row-profile">
        <div id="profile-player-info" className="profile-player-info">
          <div className="player-info-top-bar" id="player-info-top-bar">
            <img
              className="scroll-img"
              src={images.scroll}
              alt="A cartoon spell scroll"
            />
            <span tabIndex="0" className="player-info-style">
              Player Information
            </span>
            <hr />
          </div>
          <br />
          {errorMessage && (
            <div className="errorMessage-msg" id="error-msg">
              {errorMessage}
            </div>
          )}
          <br />
          <UserInfoForm
            info={state.user_info}
            editing={state.editing}
            user_email={props.user_email}
            handleSubmitEditProfile={handleSubmitEditProfile}
          />
        </div>
        <div className="submit-edit-button-wrapper">
          {state.editing && (
            <button
              form="edit-profile"
              type="submit"
              value="Submit"
              className="myButton"
              onSubmit={(e) => handleSubmitEditProfile(e)}
            >
              Submit
            </button>
          )}{' '}
          {state.editing && (
            <button
              type="button"
              className="myButton"
              onClick={handleEditProfile}
            >
              Cancel
            </button>
          )}
          {Validators.isProfileOfUser(profile_user_id) && !state.editing && (
            <button className="myButton" onClick={handleEditProfile}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="fourth-row-profile">
        <div className="profile-parties-joined">
          <div tabIndex="0" className="player-info-style parties-joined-margin">
            <img
              className="chest-img"
              src={images.chest}
              alt="A treasure chest icon"
            />
            Parties Joined:
          </div>
          <div className="parties-joined-container">{partiesJoined}</div>
        </div>
      </div>
      <div className="fifth-row-profile">
        <div className="profile-parties-created">
          <span tabIndex="0" className="player-info-style">
            Party Tables Created:
          </span>
          <div className="parties-created-container">{partiesCreated}</div>
        </div>
      </div>
      <div className="bottom-bar"></div>
    </div>
  );
}

export default UserProfile;
