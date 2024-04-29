import config from '../../config';
import TokenService from '../TokenService';
import { getHeaders, callApiWithFetch } from './Utility';

const partiesApiHelpers = {
  createPartyTable(partyInfo) {
    const payload = getHeaders('POST', partyInfo);
    return fetch(`${config.API_ENDPOINT}/api/parties`, { ...payload }).then(
      (response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        } else {
          return {};
        }
      },
    );
  },

  editPartyTable(partyInfo, party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(partyInfo),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return;
      }
    });
  },

  getPartyTables(timezone) {
    return fetch(`${config.API_ENDPOINT}/api/parties`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        timezone,
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

  getIndividualParty(timezone, party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        timezone,
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

  requestTojoinParty(party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/join`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ party_id }),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return;
      }
    });
  },

  async getUserRequests(party_id) {
    const payload = getHeaders('POST', { party_id });
    return callApiWithFetch('api/parties/requests', payload);
  },

  acceptPartyJoinRequest(user_id, party_id, type) {
    return fetch(`${config.API_ENDPOINT}/api/parties/accept_request`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ user_id, party_id, type }),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return;
      }
    });
  },

  getUsersWhoJoinedParty(party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/joined`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ party_id }),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

  async getUserJoinedParties(user_id) {
    const payload = getHeaders('GET');
    return await callApiWithFetch(`api/parties/joined/${user_id}`, payload);
  },

  submitChatboxMessage(message, party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}/chat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ message }),
    }).then((response) => {
      if (response.statusText === 'Too Many Requests') {
        return Promise.reject({ error: "You're doing that too much!" });
      }
      if (!response.ok) {
        return response.json().then((e) => Promise.reject(e));
      } else {
        return response.json();
      }
    });
  },

  getChatboxMessages(party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}/chat`, {
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

  deleteParty(party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}`, {
      method: 'DELETE',
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
};

export default partiesApiHelpers;
