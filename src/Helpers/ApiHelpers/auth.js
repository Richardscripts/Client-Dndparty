import config from '../../config';

const authApi = {
  registerUser(email, password, user_name, policyChecked) {
    return fetch(`${config.API_ENDPOINT}/api/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_email: email,
        password,
        user_name,
        policy_checked: policyChecked,
      }),
    }).then((res) => {
      if (res.statusText === 'Too Many Requests') {
        return Promise.reject({ error: "You're doing that too much!" });
      }
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  loginUser(email, password) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_email: email,
        password,
      }),
    }).then((res) => {
      if (res.statusText === 'Too Many Requests') {
        return Promise.reject({ error: "You're doing that too much!" });
      }
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
};

export default authApi;
