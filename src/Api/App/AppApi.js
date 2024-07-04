import partiesApiHelpers from '../../Helpers/ApiHelpers/PartiesHelpers';
import { useQuery } from '@tanstack/react-query';
import * as usertz from 'user-timezone';

export const useGetPartyTables = () => {
  const timezone = usertz.getTimeZone();
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['getPartyTables'],
    queryFn: () => partiesApiHelpers.getPartyTables(timezone),
  });

  const refreshPartyTables = () => {
    if (!isLoading && !isRefetching && window.location.pathname === '/') {
      refetch();
    }

    setTimeout(refreshPartyTables, 15000);
  };

  return {
    partyTablesData: data,
    isPartyTablesDataLoading: isLoading,
    refetchPartyTables: refetch,
    refreshPartyTables,
  };
};