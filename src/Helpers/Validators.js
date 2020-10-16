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
  ifPartyJoinerOrRequester(joiners, requesters) {
    let isJoinerOrRequester = false;
    if (requesters.length !== 0) {
      for (let i = 0; i < requesters.length; i++) {
        if (
          Number(requesters[i].user_id) ===
          TokenService.getUserInfoFromAuthToken().user_id
        ) {
          isJoinerOrRequester = true;
        }
      }
    }
    if (joiners.length !== 0) {
      for (let i = 0; i < joiners.length; i++) {
        if (
          Number(joiners[i].user_id) ===
          TokenService.getUserInfoFromAuthToken().user_id
        ) {
          isJoinerOrRequester = true;
        }
      }
    }
    return isJoinerOrRequester;
  },
  partyComplete(isParty) {
    return isParty === 'Complete Party!';
  },
};

export default Validators;
