import config from '../../config';
import TokenService from '../TokenService';

const partiesApi = {
  createPartyTable(partyInfo) {
    return fetch(`${config.API_ENDPOINT}/api/parties`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(partyInfo),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getPartyTables() {
    return fetch(`${config.API_ENDPOINT}/api/parties`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getIndividualParty(party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
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
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return;
      }
    });
  },
  getUserRequests(party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/requests`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ party_id }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  acceptPartyJoinRequest(user_id, party_id, type) {
    return fetch(`${config.API_ENDPOINT}/api/parties/accept_request`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ user_id, party_id, type }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
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
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  getUserJoinedParty(user_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/joined/${user_id}`, {
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
  submitChatboxMessage(message, party_id) {
    return fetch(`${config.API_ENDPOINT}/api/parties/${party_id}/chat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ message }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
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
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
};

export default partiesApi;
