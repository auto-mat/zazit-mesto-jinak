import { RegisterForm } from 'src/types/Register';

export interface OrganizerPayload {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
}

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
  space_rent: boolean;
  activities: string;
  company_name: string;
  company_type_id: number | null;
  company_crn: string;
  company_tin: string;
  organizers: OrganizerPayload[];
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
      company_name: registerData.organizers.company.title,
      company_type_id: registerData.organizers.company.businessType ?? null,
      company_crn: registerData.organizers.company.ico,
      company_tin: registerData.organizers.company.dic,
      organizers: registerData.organizers.organizers.map((organizer) => ({
        first_name: organizer.name,
        last_name: organizer.surname,
        email: organizer.email,
        telephone: organizer.phone,
      })),
    };
  },
};
