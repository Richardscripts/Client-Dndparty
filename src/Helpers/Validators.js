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
  ifPartyJoinerOrRequester(joiners = [], requesters = []) {
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
  partyComplete(isParty) {
    return isParty === 'Complete Party!';
  },
  refreshLoginToken(error) {
    if (error === 'Login Token Expired. Please Login again.') {
      TokenService.clearAuthToken();
      window.location.reload();
    }
  },
  newDate(date) {
    const event = new Date(date).toString().split(' ');
    const newEvent = `${event[0]} ${event[1]} ${event[2]} ${event[3]} ${event[4]}`;
    return newEvent;
  },
  sortMessagesByDate(dates) {
    dates.sort(function (a, b) {
      return a.date_created.localeCompare(b.date_created);
    });
    return dates;
  },
  convert(time) {
    time = time.split(':');
    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let timeValue;
    if (hours > 0 && hours <= 12) {
      timeValue = '' + hours;
    } else if (hours > 12) {
      timeValue = '' + (hours - 12);
    } else if (hours === 0) {
      timeValue = '12';
    }
    timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
    timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM
    return timeValue;
  },
};

export default Validators;
