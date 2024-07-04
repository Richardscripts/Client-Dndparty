import { useMutation } from '@tanstack/react-query';
import partiesApiHelpers from '../../Helpers/ApiHelpers/PartiesHelpers';
import { useEffect } from 'react';

export const useCreatePartyTable = (history) => {
  const { mutate, isSuccess, data, error } = useMutation({
    mutationKey: ['createPartyTable'],
    mutationFn: (partyInfo) => {
      return partiesApiHelpers.createPartyTable(partyInfo);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      history.push(`/Party/${data?.party_id}`);
    }
  }, [isSuccess, data?.party_id, history]);

  return {
    createPartyTable: mutate,
    createPartyTableError: error?.message,
  };
};
