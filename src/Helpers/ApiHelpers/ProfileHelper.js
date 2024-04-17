import { getHeaders, callApiWithFetch } from './Utility';

const profileApiHelpers = {
  async getUserProfile(user_id) {
    const payload = getHeaders('GET');
    try {
      return await callApiWithFetch(`api/profile/${user_id}`, payload);
    } catch (error) {
      return { error: error.message };
    }
  },

  async getUserCreatedParties(user_id) {
    const payload = getHeaders('GET');
    try {
      return await callApiWithFetch(
        `api/profile/created_parties/${user_id}`,
        payload,
      );
    } catch (error) {
      return { error: error.message };
    }
  },

  async editUserProfile(userInfo, user_id) {
    const payload = getHeaders('PATCH', userInfo);
    try {
      return await callApiWithFetch(`api/profile/${user_id}`, payload);
    } catch (error) {
      return { error: error.message };
    }
  },
};

export default profileApiHelpers;
