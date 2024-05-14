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
    if (response.status === 200 || response.status === 201) {
      const responseJSON = await response?.json();
      console.log(responseJSON, 'responseJSON', payload);
      const error = responseJSON?.error;

      if (error) {
        Validators.refreshLoginToken(error);
        throw new Error(error);
      }

      return responseJSON;
    }
  } catch (error) {
    console.log(error, 'error');
    throw new Error(error);
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
