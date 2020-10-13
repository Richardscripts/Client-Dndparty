import TokenService from './TokenService';

const Validators = {
  ifCreatorOfParty(creator_id) {
    return creator_id === TokenService.getUserInfoFromAuthToken().user_id;
  },
  ifProfileOfUser(profile_user_id) {
    return (
      Number(profile_user_id) ===
      TokenService.getUserInfoFromAuthToken().user_id
    );
  },
};

export default Validators;
