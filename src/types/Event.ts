type CoordinatesType = {
  latitude: number,
  longitude: number
}

export type EventInformationType = {
  name: string,
  date: string,
  address: string,
  municipalDistrinct: string,
  coordinates: CoordinatesType,
  spaceType: string,
  spaceArea: string,
  eventType: string,
  eventTypeDescription: string
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