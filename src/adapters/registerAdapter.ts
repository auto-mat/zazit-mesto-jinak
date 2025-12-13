import { RegisterForm } from 'src/types/Register';

export interface RegisterCompletePayload {
  first_name: string;
  last_name: string;
  telephone: string;
  sex: string;
  send_mailing_lists: boolean;
  newsletter_on: boolean;
  event_name: string;
  event_date: string;
  gps_latitude: number;
  gps_longitude: number;
  place: string;
  space_type: string;
  space_area: string;
  space_rent: string;
  activities: string;
}

export const registerAdapter = {
  toRegisterPayload(registerData: RegisterForm): RegisterCompletePayload {
    const eventDate = new Date(
      registerData.eventDetails.date.split('.').reverse().join('-'),
    );
    return {
      first_name: registerData.personalDetails.firstName,
      last_name: registerData.personalDetails.lastName,
      telephone: registerData.personalDetails.phone,
      sex: registerData.personalDetails.gender,
      send_mailing_lists: registerData.personalDetails.onlyOrganizerNews,
      newsletter_on: registerData.personalDetails.allNews,
      event_name: registerData.eventDetails.eventName,
      event_date: eventDate.toISOString(),
      gps_latitude: registerData.eventDetails.gps.latitude,
      gps_longitude: registerData.eventDetails.gps.longitude,
      place: registerData.eventDetails.place,
      space_type: registerData.eventDetails.spaceType,
      space_area: registerData.eventDetails.spaceArea,
      space_rent: registerData.eventDetails.spaceRent,
      activities: registerData.eventDetails.activities,
    };
  },
};
