/**
 * @file Event.ts
 * @description Types related to events in the application.
 * @author Jana Schořová
 * @version 1.0
 */

export type EventMetaType = {
  slug: string,
  name: string,
}

export type EventDetailsType = {
  // guide: any,
  information?: EventInformationType,
  organizers?: {
    company: EventOrganizerCompanyType,
    people: EventOrganizersType
  },
  content?: EventContentType,
  program?: EventProgramType,
}

type CoordinatesType = {
  latitude: number,
  longitude: number
}

export type EventType  = {
  slug: string,
  name: string,
  // homepage: {},
  // guide: {},
  information: EventInformationType,
  organizers: {
    company: EventOrganizerCompanyType,
    people: EventOrganizersType
  },
  content: EventContentType,
  program: EventProgramType
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