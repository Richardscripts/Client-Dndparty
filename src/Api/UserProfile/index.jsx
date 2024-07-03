import { useQuery, useMutation } from '@tanstack/react-query';
import profileApiHelpers from '../../Helpers/ApiHelpers/ProfileHelpers';
import partiesApiHelpers from '../../Helpers/ApiHelpers/PartiesHelpers';
import { useEffect, useState } from 'react';

export const useGetUserProfile = (userId, history) => {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['getUserProfile', userId],
    queryFn: () => profileApiHelpers.getUserProfile(userId),
  });

  useEffect(() => {
    if (isError) {
      history.push('/');
    }
  }, [isError, history]);

  return {
    userProfileData: data,
    userProfileError: error?.message,
    refetchUserProfileData: refetch,
    isUserProfileLoading: isLoading,
  };
};

const getUserRequests = (userCreatedParties) => {
  userCreatedParties.forEach(async (party) => {
    party.requesters = [];
    const userRequests = await partiesApiHelpers.getUserRequests(
      party.party_id,
    );

    userRequests.forEach((userRequest) => {
      party.requesters.push([
        {
          user_name: userRequest.user_name,
          user_id: userRequest.user_id,
        },
      ]);
    });
  });

  return userCreatedParties;
};

export const useGetUserCreatedParties = (userId) => {
  const [updatedData, setUpdatedData] = useState([]);
  const { data, refetch, isSuccess, error, isLoading } = useQuery({
    queryKey: ['getUserCreatedParties', userId],
    queryFn: () => profileApiHelpers.getUserCreatedParties(userId),
  });

  useEffect(() => {
    if (isSuccess) {
      const userCreatedParties = getUserRequests([...data]);
      setUpdatedData(userCreatedParties);
    }
  }, [isSuccess, data, isLoading]);

  return {
    userCreatedParties: updatedData,
    userCreatedPartiesError: error?.message,
    refetchUserCreatedParties: refetch,
    isUserCreatedPartiesLoading: isLoading,
  };
};

export const useGetUserJoinedParties = (userId) => {
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['getUserJoinedParties', userId],
    queryFn: () => partiesApiHelpers.getUserJoinedParties(userId),
  });

  return {
    userJoinedParties: data,
    refetchUserJoinedParties: refetch,
    userJoinedPartiesError: error?.message,
    isUserJoinedPartiesLoading: isLoading,
  };
};

export const useUpdateUserProfile = () => {
  const { error, isSuccess, mutate, isPending } = useMutation({
    mutationKey: ['updateUserProfile'],
    mutationFn: ({ userInfo, user_id }) => {
      return profileApiHelpers.updateUserProfile(userInfo, user_id);
    },
  });

  return {
    isUpdateUserProfileSuccess: isSuccess,
    updateUserProfile: mutate,
    updateUserProfileError: error?.message,
    isUpdateUserProfileLoading: isPending,
  };
};
