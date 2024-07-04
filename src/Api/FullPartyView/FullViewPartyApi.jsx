import { useEffect, useState } from 'react';
import partiesApiHelpers from '../../Helpers/ApiHelpers/PartiesHelpers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useGetPartyTables } from '../App';
import TokenService from '../../Helpers/TokenService';

export const useGetIndividualParty = (party_id) => {
  const { error, isSuccess, refetch, data, isLoading } = useQuery({
    queryKey: ['getIndividualParty', party_id],
    queryFn: () => {
      return partiesApiHelpers.getIndividualParty(party_id);
    },
  });

  return {
    isIndividualPartyDataSuccess: isSuccess,
    individualPartyData: data?.[0],
    refetchIndividualParty: refetch,
    individualPartyDataError: error?.message,
    isIndividualPartyDataLoading: isLoading,
  };
};

export const useAcceptPartyJoinRequest = (party_id) => {
  const [requester, setRequester] = useState([]);
  const { mutate, isPending, data } = useMutation({
    mutationKey: ['acceptPartyJoinRequest', party_id],
    mutationFn: ({ user_id, type, user_name }) => {
      setRequester([{ user_id, user_name }]);
      return partiesApiHelpers.acceptPartyJoinRequest(user_id, type, party_id);
    },
  });

  return {
    acceptPartyJoinRequest: mutate,
    isAcceptPartyJoinRequestLoading: isPending,
    acceptedPartyJoinRequests: data ? requester : [],
  };
};

export const useRequestToJoinParty = (party_id) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: ['requestTojoinParty', party_id],
    mutationFn: () => {
      return partiesApiHelpers.requestTojoinParty(party_id);
    },
  });
  const { user_id, user_name } = TokenService.getUserInfoFromAuthToken();

  return {
    updatedUserRequests: data ? [{ user_id, user_name }] : [],
    requestToJoinParty: mutate,
    isRequestToJoinSuccess: isSuccess,
  };
};

export const useDeleteParty = (party_id, history) => {
  const { refetchPartyTables } = useGetPartyTables();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: ['deleteParty', party_id],
    mutationFn: () => {
      return partiesApiHelpers.deleteParty(party_id);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      history.push('/');
      refetchPartyTables();
    }
  }, [isSuccess, history, refetchPartyTables]);

  return {
    deleteParty: mutate,
    isDeletePartySuccess: isSuccess,
    isDeletePartyLoading: isPending,
  };
};

export const useGetUserRequests = (party_id) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getUserRequests', party_id],
    queryFn: () => {
      return partiesApiHelpers.getUserRequests(party_id);
    },
  });

  return {
    userRequests: data || [],
    isUserRequestsLoading: isLoading,
  };
};

export const useGetUsersWhoJoinedParty = (party_id) => {
  const { data } = useQuery({
    queryKey: ['getUsersWhoJoinedParty', party_id],
    queryFn: () => {
      return partiesApiHelpers.getUsersWhoJoinedParty(party_id);
    },
  });

  return {
    usersWhoJoinedParty: data ? data : [],
  };
};
