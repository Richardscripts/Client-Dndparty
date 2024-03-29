import TokenService from './TokenService';

const Validators = {
  isCreatorOfParty(creator_id) {
    if (creator_id === '') {
      return false;
    }

    return (
      Number(creator_id) === TokenService.getUserInfoFromAuthToken().user_id
    );
  },

  isProfileOfUser(profile_user_id) {
    return (
      Number(profile_user_id) ===
      TokenService.getUserInfoFromAuthToken().user_id
    );
  },

  isPartyJoinerOrRequester(joiners = [], requesters = []) {
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

    if (!TokenService.getUserInfoFromAuthToken().user_id) {
      return true;
    }

    return isJoinerOrRequester;
  },

  isPartyComplete(isParty) {
    return isParty === 'Complete Party!';
  },

  refreshLoginToken(error) {
    if (error === 'Login Token Expired. Please Login again.') {
      TokenService.clearAuthToken();
      window.location.reload();
    }
  },

  getNewDate(date) {
    const event = new Date(date).toString().split(' ');
    const newEvent = `${event[0]} ${event[1]} ${event[2]} ${event[3]} ${event[4]}`;
    return newEvent;
  },

  getSortMessagesByDate(dates) {
    const sortedDates = [...dates].sort(function (a, b) {
      return a.date_created.localeCompare(b.date_created);
    });

    return sortedDates;
  },
};

export default Validators;
