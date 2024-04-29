import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import {
  useGetUserProfile,
  useGetUserJoinedParties,
  useGetUserCreatedParties,
  useUpdateUserProfile,
} from '../../Api/UserProfile';

export const UserProfileLayout = (props) => {
  const { profile_update, history, user_id, handleProfileUpdate } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const { userProfileError, refetchUserProfileData } = useGetUserProfile(
    user_id,
    history,
  );
  const { updateUserProfileError } = useUpdateUserProfile();
  const { refetchUserJoinedParties, userJoinedPartiesError } =
    useGetUserJoinedParties(user_id);
  const {
    refetchUserCreatedParties,

    userCreatedPartiesError,
  } = useGetUserCreatedParties(user_id);

  useEffect(() => {
    if (profile_update) {
      refetchUserProfileData();
      refetchUserJoinedParties();
      refetchUserCreatedParties();
      handleProfileUpdate();
    }
  }, [
    profile_update,
    refetchUserProfileData,
    refetchUserJoinedParties,
    refetchUserCreatedParties,
    handleProfileUpdate,
  ]);

  useEffect(() => {
    const errorMessage =
      userProfileError ||
      updateUserProfileError ||
      userJoinedPartiesError ||
      userCreatedPartiesError;
    setErrorMessage(errorMessage);
  }, [
    userProfileError,
    userJoinedPartiesError,
    userCreatedPartiesError,
    updateUserProfileError,
  ]);

  return (
    <UserProfile
      {...props}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};
