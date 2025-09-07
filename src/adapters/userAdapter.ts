import { UserDetailsType, UserMetaType } from 'src/types/User'

type ApiUserMeta = {
  id: string,
  email: string,
}

type ApiUserDetails = {
  name: string,
  surname: string,
  email: string,
  phone: string,
  gender: string,
  language_preference: string,
}

export const userAdapter = {
  toUserMeta(userData: ApiUserMeta): UserMetaType {
    return {
      id: userData.id,
      email: userData.email,
    }
  },

  toUserDetails(userData: ApiUserDetails): UserDetailsType {
    return {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      languagePreference: userData.language_preference,
    }
  },
}