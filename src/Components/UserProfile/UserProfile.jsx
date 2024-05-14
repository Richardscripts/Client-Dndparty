import React, { useEffect, useState, useRef } from 'react';
import images from '../../Assets/groups-image/images';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import Validators from '../../Helpers/Validators';
import { scrollTo } from '../../Helpers/ApiHelpers/Utility';
import './UserProfile.css';
import { PartiesJoined } from './PartiesJoined';
import { PartiesCreated } from './PartiesCreated';
import { useGetUserProfile, useUpdateUserProfile } from '../../Api/UserProfile';
import Loading from '../Loading/Loading';

const UserProfile = ({
  match: {
    params: { user_id },
  },
  history,
  user_email,
  errorMessage,
  setErrorMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { userProfileData, refetchUserProfileData, isUserProfileLoading } =
    useGetUserProfile(user_id, history);
  const {
    updateUserProfile,
    isUpdateUserProfileSuccess,
    isUpdateUserProfileLoading,
  } = useUpdateUserProfile();

  const refScrollElement = useRef(null);

  useEffect(() => {
    if (isUpdateUserProfileSuccess) {
      setIsEditing((prevState) => !prevState);
      refetchUserProfileData();
      scrollTo(refScrollElement);
    }
  }, [isUpdateUserProfileSuccess, refetchUserProfileData]);

  const handleEditProfile = () => {
    setIsEditing((prevState) => !prevState);
    setErrorMessage('');
    scrollTo(refScrollElement);
  };

  const handleSubmitEditProfile = async (event) => {
    event.preventDefault();
    const user_id = userProfileData?.user_id;
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
    } = event.target;

    const pdfCheck = char_url.value
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
      character_sheets: char_url.value
        ? `${char_name.value}: ${char_url.value}`
        : '.pdf',
    };

    setErrorMessage('');
    updateUserProfile({ userInfo, user_id });
  };

  return (
    <section className="user-profile-layout">
      {isUserProfileLoading ? (
        <Loading />
      ) : (
        <div className="user-profile animate__animated animate__fadeIn">
          <div className="top-row-profile">
            <span
              tabIndex="0"
              className="profile-top-bar username-style-profile"
            >
              {userProfileData?.user_name}'s Profile
            </span>
          </div>
          <div
            id="second-row-profile"
            className="second-row-profile"
            ref={refScrollElement}
          >
            <div className="profile-user-icon">
              <span className="player-name-style">
                {userProfileData?.user_name}
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
                userProfileData={userProfileData}
                isEditing={isEditing}
                user_email={user_email}
                handleSubmitEditProfile={handleSubmitEditProfile}
                isUpdateUserProfileLoading={isUpdateUserProfileLoading}
              />
            </div>
            <div className="submit-edit-button-wrapper">
              {isEditing && (
                <>
                  <button
                    form="edit-profile"
                    type="submit"
                    value="Submit"
                    className="myButton"
                    onSubmit={(e) => handleSubmitEditProfile(e)}
                  >
                    Submit
                  </button>{' '}
                  <button
                    type="button"
                    className="myButton"
                    onClick={handleEditProfile}
                  >
                    Cancel
                  </button>
                </>
              )}
              {Validators.isProfileOfUser(user_id) && !isEditing && (
                <button className="myButton" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          <PartiesJoined user_id={user_id} />
          <PartiesCreated user_id={user_id} />
          <div className="bottom-bar" />
        </div>
      )}
    </section>
  );
};

export default UserProfile;
