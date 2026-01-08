import { UserLanguage } from 'src/enums/userEnums';

export interface UserDetails {
  name: string;
  surname: string;
  email: string;
  phone: string;
  gender: string;
  languagePreference: UserLanguage;
  onlyOrganizerNews: boolean;
  allNews: boolean;
}

export interface UserDetailsForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  gender: string;
  languagePreference: UserLanguage;
}

export interface UserNewsPreferences {
  onlyOrganizerNews: boolean;
  allNews: boolean;
}
