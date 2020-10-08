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
  };

  componentDidMount() {
    const { match } = this.props;
    const user_id = match.params.user_id;
    ApiHelpers.getUserProfile(user_id)
      .then((res) => {
        console.log(res);
        this.setState({
          user_info: [res],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const userInfo = this.state.user_info.map((user, idx) => {
      return (
        <div key={idx} className="user-profile">
          <div className="profile-left">
            <div className="profile-left-top">{user.user_name} Profile</div>
            <div className="profile-left-middle">Tables Joined</div>
            <div className="profile-left-bottom">Tables Created</div>
          </div>
          <div className="profile-right">
            <div className="profile-right-top">Player Icon</div>
            <div className="profile-right-bottom">Player's Information</div>
          </div>
        </div>
      );
    });
    return <>{userInfo}</>;
  }
}

export default UserProfile;
