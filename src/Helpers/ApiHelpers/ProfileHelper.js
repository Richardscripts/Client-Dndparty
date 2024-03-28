import config from '../../config';
import TokenService from '../TokenService';

const profileApiHelpers = {
  getUserProfile(user_id) {
    return fetch(`${config.API_ENDPOINT}/api/profile/${user_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

  getUserCreatedParties(id) {
    return fetch(`${config.API_ENDPOINT}/api/profile/created_parties/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

  editUserProfile(userInfo, user_id) {
    return fetch(`${config.API_ENDPOINT}/api/profile/${user_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(userInfo),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

}

export default profileApiHelpers;
