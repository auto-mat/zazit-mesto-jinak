import { UserLanguage } from 'src/enums/userEnums';

export interface UserDetails {
  name: string;
  surname: string;
  email: string;
  phone: string;
  gender: string;
  languagePreference: UserLanguage;
}
