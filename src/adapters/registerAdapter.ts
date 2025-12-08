import { RegisterForm } from 'src/types/Register';

export interface RegisterCompletePayload {
  first_name: string;
  last_name: string;
  telephone: string;
  sex: string;
  send_mailing_lists: boolean;
  newsletter_on: boolean;
}

export const registerAdapter = {
  toRegisterPayload(registerData: RegisterForm): RegisterCompletePayload {
    return {
      first_name: registerData.personalDetails.firstName,
      last_name: registerData.personalDetails.lastName,
      telephone: registerData.personalDetails.phone,
      sex: registerData.personalDetails.gender,
      send_mailing_lists: registerData.personalDetails.onlyOrganizerNews,
      newsletter_on: registerData.personalDetails.allNews,
    };
  },
};
