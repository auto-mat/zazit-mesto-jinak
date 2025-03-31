// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://api.example.com',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// });

import { eventContentData, eventProgramData } from 'app/mock/eventData';

export default {
  // TODO
  getEventGuide(slug) {
    console.log(slug);
  },
  getEventContent(slug) {
    console.log(slug);
    return eventContentData;
    // return apiClient.get('/users');
  },
  getEventProgram(slug) {
    console.log(slug);
    return eventProgramData;
  }
};