export const getEventGuide = (slug: string) => {
  const event = events.find((event) => event.slug = slug)
  const eventGuide: EventGuideType = {
    name: event?.name ?? '',
    progress: {
      contract: event?.progress.contract ?? 'TODO',
      space: event?.progress.space ?? 'TODO',
      signs: event?.progress.signs ?? 'TODO'
    },
    requiredChecklistItems: event?.requiredChecklistItems ?? [],
    recomendedChecklistItems: event?.recomendedChecklistItems ?? []
  }

  return eventGuide
}

export const getEventContent = (slug: string): EventContentType => {
  console.log(slug)
  return eventContentData
}

export type ChecklistItemType = {
  id: number,
  name: string,
  checked: boolean
}

export type EventGuideType = {
  name: string,
  progress: {
    contract: string,
    space: string,
    signs: string
  },
  requiredChecklistItems: ChecklistItemType[],
  recomendedChecklistItems: ChecklistItemType[],
}

export type EventInformationType = {
  name: string,
  date: string,
  location: [string, string],
  spaceType: string[],
  size: string
  tier: string
}

export type ImageType = {
  src: string,
  alt: string
}

export type LinkType = {
  url: string,
  title: string
}

export type EventContentType = {
  slug: string,
  name: string,
  image: ImageType,
  mainContent: string,
  links: LinkType[]
}

export type EventAgendaItemType = {
  title: string,
  description: string,
  timeFrom: string,
  timeTo: string,
  category: string
}

const events = [
  {
    id: 1,
    slug: 'husitska',
    name: 'Husitská',
    image: {
      src: 'https://picsum.photos/600/400',
      alt: 'Image to main page',
    },
    mainContent: '<div>This is <b>main</b> content!</div>',
    links: [

    ],
    progress: {
      contract: 'DONE',
      space: 'DONE',
      signs: 'TODO',
    },
    requiredChecklistItems: [
      {
        id: 1,
        name: 'Podepsat smlouvu',
        checked: true,
      },
      {
        id: 2,
        name: 'Naplnit webový obsah',
        checked: false,
      },
      {
        id: 3,
        name: 'Nakreslit zábor',
        checked: false,
      },
    ],
    recomendedChecklistItems: [
      {
        id: 4,
        name: 'Domluvit partnerství',
        checked: false,
      },
      {
        id: 5,
        name: 'Zařídit občerstvení',
        checked: true,
      },
    ],
  },
  {
    id: 2,
    slug: 'arbesovo-namesti',
    name: 'Arbesovo náměstí',
    progress: {
      contract: 'DONE',
      space: 'DONE',
      signs: 'TODO',
    },
    requiredChecklistItems: [
      {
        id: 6,
        name: 'Podepsat smlouvu',
        checked: true,
      },
      {
        id: 7,
        name: 'Naplnit webový obsah',
        checked: false,
      },
      {
        id: 8,
        name: 'Nakreslit zábor',
        checked: false,
      },
    ],
    recomendedChecklistItems: [
      {
        id: 9,
        name: 'Domluvit partnerství',
        checked: false,
      },
      {
        id: 10,
        name: 'Zařídit občerstvení',
        checked: true,
      },
    ],
  }
]


const eventContentData: EventContentType = {
  slug: 'husitska',
  name: 'Husitská',
  image: {
    src: 'https://picsum.photos/600/400',
    alt: 'Image to main page',
  },
  mainContent: '<div>This is <b>main</b> content!</div>',
  links: [
    {
      url: 'https://www.instagram.com/',
      title: 'Instagram'
    },
    {
      url: 'https://www.google.com/',
      title: 'Web page'
    }
  ],
}