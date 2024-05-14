import partiesApiHelpers from "../../Helpers/ApiHelpers/PartiesHelpers";
import { useQuery } from '@tanstack/react-query';
import * as usertz from 'user-timezone';

export const useGetPartyTables = () => {
    const timezone = usertz.getTimeZone();
    const { data, isLoading, refetch } = useQuery({
      queryKey: ['getPartyTables'],
      queryFn: () => partiesApiHelpers.getPartyTables(timezone),
    });
  
    const refetchPartyTables = () => {
        !isLoading && refetch()
        setTimeout(refetchPartyTables, 15000);
    }
  
    return {
      partyTablesData: data,
      isPartyTablesDataLoading: isLoading,
      refetchPartyTables
    };
  };