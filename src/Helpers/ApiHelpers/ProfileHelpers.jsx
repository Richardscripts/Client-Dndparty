import { getHeaders, callApiWithFetch } from './Utility';

const profileApiHelpers = {
  async getUserProfile(user_id) {
    const payload = getHeaders('GET');
    return await callApiWithFetch(`api/profile/${user_id}`, payload);
  },

  async getUserCreatedParties(user_id) {
    const payload = getHeaders('GET');
    return await callApiWithFetch(
      `api/profile/created_parties/${user_id}`,
      payload,
    );
  },

  async updateUserProfile(userInfo, user_id) {
    const payload = getHeaders('PATCH', userInfo);

    return await callApiWithFetch(`api/profile/${user_id}`, payload);
  },
};

export default profileApiHelpers;
