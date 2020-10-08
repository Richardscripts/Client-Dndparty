import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
  getUserIdFromAuthToken() {
    let authToken = window.localStorage.getItem(config.TOKEN_KEY);
    if (authToken) {
      let payload = window.atob(
        authToken.slice(7, authToken.length).split('.')[1]
      );
      let user = JSON.parse(payload);
      return user.user_id;
    }
  },
};

export default TokenService;
