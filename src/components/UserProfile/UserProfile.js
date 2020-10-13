import React from 'react';
import images from '../../Assets/Groups-image/images';
import ApiHelpers from '../../Helpers/ApiHelpers';
import UserInfo from './UserInfoForm/UserInfoForm';
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
    this.setState({ editing: true });
  };

  handleSubmitEditProfile = (e) => {
    e.preventDefault();
    const user_id = this.state.user_info[0].user_id;
    const {
      first_name,
      last_name,
      dnd_experience,
      location,
      languages,
      about,
      preferred_editions,
      preferred_classes,
    } = e.target;
    const userInfo = {
      first_name: first_name.value,
      last_name: last_name.value,
      dnd_experience: dnd_experience.value,
      location: location.value,
      languages: languages.value,
      about: about.value,
      preferred_editions: preferred_editions.value,
      preferred_classes: preferred_classes.value,
    };
    this.setState({
      error: null,
    });
    ApiHelpers.editUserProfile(userInfo, user_id)
      .then((userInfo) => {
        this.setState({ user_info: [userInfo] });
        window.location.reload();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    const { match } = this.props;
    const user_id = match.params.user_id;
    ApiHelpers.getUserProfile(user_id)
      .then((res) => {
        this.setState({
          user_info: [res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
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
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
    ApiHelpers.getUserJoinedParty(user_id).then((res) => {
      this.setState({
        joined_parties: res,
      });
    });
  }

  render() {
    const profile_user_id = this.props.match.params.user_id;
    const partiesJoined = this.state.joined_parties.map((party, idx) => {
      return (
        <Link key={idx} to={`/Party/${party.party_id}`}>
          <div className="parties-joined-container" key={idx}>
            <div className="parties-joined-style">
              <img
                className="map-img"
                src={images.map}
                alt="A treasure map icon"
              />
              {party.party_name}
            </div>
            <br />
          </div>
        </Link>
      );
    });

    const partiesCreated = this.state.created_parties.map((party, idx) => {
      const requesters = party.requesters.map((requesters, idx) => {
        return requesters.map((requester) => {
          return (
            <a href={`/Player_Profile/${requester.user_id}`}>
              <span>{requester.user_name} </span>
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
          <br /> Created: {party.date_created} <br />
          <Link to={`/Party/${party.party_id}`}>
            <button className="view-button">View</button>{' '}
          </Link>
        </div>
      );
    });

    return (
      <div className="profile-bg-img">
        <div className="user-profile">
          <div className="profile-left">
            <span className="player-info-style profile-left-top username-style-profile">
              {this.state.user_info[0].user_name}'s Dashboard
            </span>
            <div className="profile-left-middle">
              <div className="player-info-style parties-joined-margin">
                Parties Joined:
              </div>
              <div className="parties-joined-container">{partiesJoined}</div>
            </div>
            <div className="profile-left-bottom">
              <span className="player-info-style">Party Tables Created:</span>
              <div className="parties-created-container">{partiesCreated}</div>
            </div>
          </div>
          <div className="profile-right">
            <div className="profile-right-top">
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
            <div className="profile-right-bottom">
              <img
                className="scroll-img"
                src={images.scroll}
                alt="A cartoon spell scroll"
              />
              <span className="player-info-style">Player Information</span>
              <br />
              <UserInfo
                info={this.state.user_info}
                editing={this.state.editing}
                user_email={this.props.user_email}
                handleSubmitEditProfile={this.handleSubmitEditProfile}
              />
            </div>
            <div className="button-wrapper">
              {this.state.editing && (
                <button
                  form="edit-profile"
                  type="submit"
                  value="Submit"
                  className="myButton submit-edit-style"
                  onSubmit={(e) => this.handleSubmitEditProfile(e)}
                >
                  Submit
                </button>
              )}
              {Validators.ifProfileOfUser(profile_user_id) &&
                !this.state.editing && (
                  <button
                    className="myButton submit-edit-style"
                    onClick={this.handleEditProfile}
                  >
                    Edit Profile
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
