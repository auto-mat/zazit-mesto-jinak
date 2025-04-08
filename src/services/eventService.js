// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://api.example.com',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// });

import { eventContentData, eventInformationData, eventOrganizersData, eventProgramData } from 'app/mock/eventData';

export default {
  // TODO
  getEventGuide(slug) {
    console.log(slug);
  },
  getEventInformation(slug) {
    console.log(slug);
    return eventInformationData;
  },
  getEventContent(slug) {
    console.log(slug);
    return eventContentData;
    // return apiClient.get('/users');
  },
  getEventProgram(slug) {
    console.log(slug);
    return eventProgramData;
  },
  getEventOrganizers(slug) {
    console.log(slug);
    return eventOrganizersData;
  }
};