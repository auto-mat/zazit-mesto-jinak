type CoordinatesType = {
  latitude: number,
  longitude: number
}

export type EventInformationType = {
  name: string,
  date: string,
  address: string,
  municipalDistrict: string,
  coordinates: CoordinatesType,
  spaceType: string,
  spaceArea: string,
  eventType: string,
  eventTypeDescription: string
}

export type EventInformationFormType = {
  name: string,
  date: string,
  address: string,
  municipalDistrict: string,
  coordinates: CoordinatesType,
}

export type LinkType = {
  title: string,
  url: string
}

export type EventContentType = {
  image: File | null,
  mainContent: string,
  links: LinkType[]
}

export type EventProgramItemType = {
  title: string,
  description: string,
  timeFrom: string,
  timeTo: string,
  categories: string[]
}

export type EventProgramType = EventProgramItemType[]

export type EventOrganizerType = {
  name: string,
  surname: string,
  email: string,
  phone: string,
  role: string
}

export type EventOrganizerCompanyType = {
  title: string,
  businessType: string,
  ico: string,
  dic: string
}

export type EventOrganizersType = EventOrganizerType[]