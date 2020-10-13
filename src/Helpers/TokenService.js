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
  getUserInfoFromAuthToken() {
    let authToken = window.localStorage.getItem(config.TOKEN_KEY);
    if (authToken) {
      let userInfo = window.atob(
        authToken.slice(7, authToken.length).split('.')[1]
      );
      return JSON.parse(userInfo);
    } else {
      return { user_id: 0, user_name: '', user_email: '' };
    }
  },
};

export default TokenService;
