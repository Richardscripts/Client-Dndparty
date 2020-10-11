import TokenService from './TokenService';

const Validators = {
  ifCreatorOfParty(creatorID) {
    return creatorID === TokenService.getUserInfoFromAuthToken().user_id;
  },
};

export default Validators;
