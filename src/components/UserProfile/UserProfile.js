import React from 'react';
import images from '../../Assets/Groups-image/images';
import ApiHelpers from '../../Helpers/ApiHelpers';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import Validators from '../../Helpers/Validators';

import { Link } from 'react-router-dom';
import './UserProfile.css';

class UserProfile extends React.Component {
  state = {
    error: null,
    user_info: [{ user_name: '' }],
    created_parties: [{ requesters: [] }],
    joined_parties: [],
    editing: false,
  };

  handleEditProfile = () => {
    this.setState({ editing: !this.state.editing, error: null });
    this.props.history.push('#player-info-top-bar');
  };

  handleSubmitEditProfile = (e) => {
    e.preventDefault();
    const user_id = this.state.user_info[0].user_id;
    const {
      user_name,
      first_name,
      last_name,
      dnd_experience,
      location,
      languages,
      about_me,
      contact,
      preferred_editions,
      preferred_classes,
    } = e.target;
    const userInfo = {
      user_name: user_name.value,
      first_name: first_name.value,
      last_name: last_name.value,
      dnd_experience: dnd_experience.value,
      location: location.value,
      languages: languages.value,
      about_me: about_me.value,
      contact: contact.value,
      preferred_editions: preferred_editions.value,
      preferred_classes: preferred_classes.value,
    };
    this.setState({
      error: null,
    });
    this.props.handleLoading();
    ApiHelpers.editUserProfile(userInfo, user_id)
      .then(() => {
        this.setState({ editing: !this.state.editing });
        this.props.handleLoading();
        this.profileApiCalls();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
  };

  componentDidUpdate() {
    if (this.props.profile_updated === true) {
      this.profileApiCalls();
      this.props.handleProfileUpdate();
    }
  }

  profileApiCalls = () => {
    const { match } = this.props;
    const user_id = match.params.user_id;
    this.props.handleLoading();
    ApiHelpers.getUserProfile(user_id)
      .then((res) => {
        this.setState({
          user_info: [res],
        });
        this.props.handleLoading();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
    this.props.handleLoading();
    ApiHelpers.getUserCreatedParties(user_id)
      .then((res) => {
        res.forEach((party) => {
          party.requesters = [];
          ApiHelpers.getUserRequests(party.party_id).then((result) => {
            for (let i = 0; i < result.length; i++) {
              this.setState(() =>
                party.requesters.push([
                  {
                    user_name: result[i].user_name,
                    user_id: result[i].user_id,
                  },
                ])
              );
            }
          });
        });
        this.setState({
          created_parties: res,
        });
        this.props.handleLoading();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
    this.props.handleLoading();
    ApiHelpers.getUserJoinedParty(user_id)
      .then((res) => {
        this.setState({
          joined_parties: res,
        });
        this.props.handleLoading();
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.handleLoading();
      });
  };

  componentDidMount() {
    this.profileApiCalls();
  }

  render() {
    const profile_user_id = this.props.match.params.user_id;
    const partiesJoined = this.state.joined_parties.map((party, idx) => {
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

    const partiesCreated = this.state.created_parties.map((party, idx) => {
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
          {requesters.length === 0 ? '' : <>Party Requests: {requesters}</>}
          <br />{' '}
          <span className="created-text-style">
            Created: {party.date_created}{' '}
          </span>
          <br />
          <Link to={`/Party/${party.party_id}`}>
            <button className="view-button PartyTableButton">View</button>{' '}
          </Link>
        </div>
      );
    });

    return (
      <div className="user-profile animate__animated animate__fadeIn">
        <div className="top-row-profile">
          <span tabIndex="0" className="profile-top-bar username-style-profile">
            {this.state.user_info[0].user_name}'s Profile
          </span>
        </div>
        <div className="second-row-profile">
          <div className="profile-user-icon">
            <span className="player-name-style">
              {this.state.user_info[0].user_name}
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
          <div className="profile-player-info">
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
            {this.state.error && (
              <div className="error-msg" id="error-msg">
                {this.state.error}
              </div>
            )}
            <br />
            <UserInfoForm
              info={this.state.user_info}
              editing={this.state.editing}
              user_email={this.props.user_email}
              handleSubmitEditProfile={this.handleSubmitEditProfile}
            />
          </div>
          <div className="submit-edit-button-wrapper">
            {this.state.editing && (
              <button
                form="edit-profile"
                type="submit"
                value="Submit"
                className="myButton"
                onSubmit={(e) => this.handleSubmitEditProfile(e)}
              >
                Submit
              </button>
            )}{' '}
            {this.state.editing && (
              <button
                type="button"
                className="myButton"
                onClick={this.handleEditProfile}
              >
                Cancel
              </button>
            )}
            {Validators.ifProfileOfUser(profile_user_id) &&
              !this.state.editing && (
                <button className="myButton" onClick={this.handleEditProfile}>
                  Edit Profile
                </button>
              )}
          </div>
        </div>

        <div className="fourth-row-profile">
          <div className="profile-parties-joined">
            <div
              tabIndex="0"
              className="player-info-style parties-joined-margin"
            >
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
}

export default UserProfile;
