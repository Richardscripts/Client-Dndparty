import TokenService from './TokenService';

const Validators = {
  ifCreatorOfParty(creator_id) {
    return (
      Number(creator_id) === TokenService.getUserInfoFromAuthToken().user_id
    );
  },
  ifProfileOfUser(profile_user_id) {
    return (
      Number(profile_user_id) ===
      TokenService.getUserInfoFromAuthToken().user_id
    );
  },
  partyComplete(isParty) {
    return isParty === 'Complete Party!';
  },
};

export default Validators;
