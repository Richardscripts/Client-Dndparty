import React from 'react';
import images from '../../Assets/Groups-image/images';
import ApiHelpers from '../../Helpers/ApiHelpers';
import UserInfo from './UserInfo/UserInfo';

import './UserProfile.css';

//import ApiHelpers from '../../../Helpers/ApiHelpers';

// import images from '../../../Assets/Groups-image/images';
// import ApiHelpers from '../../../Helpers/ApiHelpers';

class UserProfile extends React.Component {
  state = {
    error: null,
    user_info: [{ user_name: '' }],
    created_parties: [],
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
        this.setState({
          created_parties: res,
        });
        res.forEach((party) => {
          ApiHelpers.getUserRequests(party.party_id).then((result) => {
            for (let i = 0; i < result.length; i++) {
              const requester = `requester${i + 1}`;
              this.setState(() => (party[requester] = result[i].user_name));
            }
          });
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
    // const userInfo = this.state.user_info.map((user, idx) => {
    //   return (
    //     <div key={idx} className="profile-left-top">
    //       {user.user_name}'s Profile
    //     </div>
    //   );
    // });
    const partiesCreated = this.state.created_parties.map((party, idx) => {
      return (
        <div key={idx}>
          <h2>{party.party_name}</h2> <br />
          Requests: {party.requester1}, {party.requester2}
          <br /> Created: {party.date_created} <br />
        </div>
      );
    });
    const partiesJoined = this.state.joined_parties.map((party, idx) => {
      return (
        <div className="parties-joined-container" key={idx}>
          <h2>{party.party_name}</h2> <br />
        </div>
      );
    });

    return (
      <div className="user-profile">
        <div className="profile-left">
          {this.state.user_info[0].user_name}'s Profile
          <div className="profile-left-middle">
            Parties Joined:
            <div className="parties-joined-container">{partiesJoined}</div>
          </div>
          <div className="profile-left-bottom">
            Party Tables Created:
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
            Player's Information
            <br />
            <UserInfo
              info={this.state.user_info}
              editing={this.state.editing}
              handleSubmitEditProfile={this.handleSubmitEditProfile}
            />
          </div>
          {this.state.editing && (
            <button
              form="edit-profile"
              type="submit"
              value="Submit"
              onSubmit={(e) => this.handleSubmitEditProfile(e)}
            >
              Submit
            </button>
          )}
          {!this.state.editing && (
            <button onClick={this.handleEditProfile}>Edit Profile</button>
          )}
        </div>
      </div>
    );
  }
}

export default UserProfile;
