import TokenService from '../TokenService';
import config from '../../config';
import Validators from '../Validators';

export const scrollTo = (refElement) => {
  window.scrollTo({
    behavior: 'smooth',
    top: refElement.current.offsetTop,
  });
};

export const callApiWithFetch = async (endpoint, payload) => {
  try {
    const response = await fetch(`${config.API_ENDPOINT}/${endpoint}`, {
      ...payload,
    });
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 400
    ) {
      const responseJSON = await response?.json();
      const error = responseJSON?.error;

      if (error) {
        Validators.refreshLoginToken(error);
        throw new Error(error);
      }

      return responseJSON;
    }
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const getHeaders = (method, body, additionalHeaders = {}) => ({
  method,
  headers: {
    ...additionalHeaders,
    'content-type': 'application/json',
    authorization: `bearer ${TokenService.getAuthToken()}`,
  },
  body: body && JSON.stringify(body),
});

export const getAllRequesters = (requesters, joiners) => {
  let allRequesters = [];
  const joinersList = joiners.map((joiner) => joiner.user_name);

  requesters.forEach((requester) => {
    if (!joinersList.includes(requester.user_name)) {
      allRequesters.push(requester);
    }
  });

  return allRequesters;
};

export const filterParties = (partyTablesData, filterOptions) => {
  let filteredParties = [...partyTablesData];

  filterOptions.forEach((filterOption) => {
    const currentFilter = Object.keys(filterOption);
    const isFilter = !!filterOption[currentFilter];

    if (isFilter) {
      filteredParties = filteredParties.filter(
        (party) => party[currentFilter] === filterOption[currentFilter],
      );
    }
  });

  return filteredParties;
};
