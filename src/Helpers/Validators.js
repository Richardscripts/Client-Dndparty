import TokenService from './TokenService';

const Validators = {
  ifCreatorOfParty(creatorID) {
    //const creatorID = this.state.current_party[0].user_id_creator;
    return creatorID === TokenService.getUserIdFromAuthToken();
  },
};

export default Validators;
