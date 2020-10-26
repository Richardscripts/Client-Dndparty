import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
  getUserInfoFromAuthToken() {
    let authToken = window.sessionStorage.getItem(config.TOKEN_KEY);
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
