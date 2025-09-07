import { userDetails, userMeta } from 'app/mock/eventData';

export default {
  // TODO
  getUserMeta() {
    return userMeta;
  },
  getUserDetails(userId) {
    console.log(userId);
    return userDetails;
  },
};