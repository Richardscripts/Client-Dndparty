import config from '../../config';
import TokenService from '../TokenService';
import { getHeaders, callApiWithFetch } from './Utility';
import * as usertz from 'user-timezone';

const timezone = usertz.getTimeZone();

const partiesApiHelpers = {
  async createPartyTable(partyInfo) {
    const payload = getHeaders('POST', partyInfo);
    return await callApiWithFetch('api/parties', payload);
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

  getPartyTables() {
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

  async getIndividualParty(party_id) {
    const payload = getHeaders('GET', null, { timezone });
    return await callApiWithFetch(`api/parties/${party_id}`, payload);
  },

  async requestTojoinParty(party_id) {
    const payload = getHeaders('POST', { party_id });
    return callApiWithFetch('api/parties/join', payload);
  },

  async getUserRequests(party_id) {
    const payload = getHeaders('POST', { party_id });
    return callApiWithFetch('api/parties/requests', payload);
  },

  async acceptPartyJoinRequest(user_id, type, party_id) {
    const payload = getHeaders('POST', { user_id, type, party_id });
    return await callApiWithFetch(`api/parties/accept_request`, payload);
  },

  async getUsersWhoJoinedParty(party_id) {
    const payload = getHeaders('POST', { party_id });
    return await callApiWithFetch(`api/parties/joined`, payload);
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

  async deleteParty(party_id) {
    const payload = getHeaders('DELETE');
    return await callApiWithFetch(`api/parties/${party_id}`, payload);
  },
};

export default partiesApiHelpers;
