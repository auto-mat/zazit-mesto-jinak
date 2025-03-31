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