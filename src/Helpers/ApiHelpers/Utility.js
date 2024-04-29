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
    const responseJSON = await response.json();
 
    const error = responseJSON?.error;

    if (error) {
      Validators.refreshLoginToken(error);
      throw new Error(error);
    }

    return responseJSON;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHeaders = (method, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
    authorization: `bearer ${TokenService.getAuthToken()}`,
  },
  body: body && JSON.stringify(body),
});
