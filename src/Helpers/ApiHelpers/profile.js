import config from '../../config';
import TokenService from '../TokenService';

const profileApi = {
  getUserProfile(user_id) {
    return fetch(`${config.API_ENDPOINT}/api/profile/${user_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
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
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
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
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
};

export default profileApi;
