import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import {
  useGetUserProfile,
  useGetUserJoinedParties,
  useGetUserCreatedParties,
  useUpdateUserProfile,
} from '../../Api/UserProfile';

export const UserProfileLayout = (props) => {
  const {
    history,
    match: {
      params: { user_id },
    },
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const { userProfileError } = useGetUserProfile(user_id, history);
  const { updateUserProfileError } = useUpdateUserProfile();
  const { userJoinedPartiesError } = useGetUserJoinedParties(user_id);
  const { userCreatedPartiesError } = useGetUserCreatedParties(user_id);

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
