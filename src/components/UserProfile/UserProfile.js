import React from 'react';
import ApiHelpers from '../../Helpers/ApiHelpers';
import './UserProfile.css';

//import ApiHelpers from '../../../Helpers/ApiHelpers';

// import images from '../../../Assets/Groups-image/images';
// import ApiHelpers from '../../../Helpers/ApiHelpers';

class UserProfile extends React.Component {
  state = {
    error: null,
    user_info: [],
    created_parties: [],
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
  }

  render() {
    const userInfo = this.state.user_info.map((user, idx) => {
      return (
        <div key={idx} className="profile-left-top">
          {user.user_name} Profile
        </div>
      );
    });
    const partiesCreated = this.state.created_parties.map((party, idx) => {
      return (
        <div key={idx}>
          <h2>{party.party_name}</h2> <br />
          Requests: {party.requester1}, {party.requester2}
          <br /> Created: {party.date_created} <br />
        </div>
      );
    });
    return (
      <div className="user-profile">
        <div className="profile-left">
          {userInfo}
          <div className="profile-left-middle">Tables Joined</div>
          <div className="profile-left-bottom">
            Tables Created:
            {partiesCreated}
          </div>
        </div>
        <div className="profile-right">
          <div className="profile-right-top">Player Icon</div>
          <div className="profile-right-bottom">Player's Information</div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
