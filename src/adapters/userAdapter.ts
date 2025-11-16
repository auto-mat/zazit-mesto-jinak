import { UserDetails } from 'src/types/User';

export type ApiUserDetails = {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  sex: string;
  language: string;
};

export const userAdapter = {
  toUserDetails(userData: ApiUserDetails): UserDetails {
    return {
      name: userData.firstname,
      surname: userData.lastname,
      email: userData.email,
      phone: userData.telephone,
      gender: userData.sex,
      languagePreference: userData.language,
    };
  },
};
