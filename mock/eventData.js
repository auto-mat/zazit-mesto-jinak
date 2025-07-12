// export const getEventGuide = (slug: string) => {
//   const event = events.find((event) => event.slug = slug)
//   const eventGuide: EventGuideType = {
//     name: event?.name ?? '',
//     progress: {
//       contract: event?.progress.contract ?? 'TODO',
//       space: event?.progress.space ?? 'TODO',
//       signs: event?.progress.signs ?? 'TODO'
//     },
//     requiredChecklistItems: event?.requiredChecklistItems ?? [],
//     recomendedChecklistItems: event?.recomendedChecklistItems ?? []
//   }

//   return eventGuide
// }

// export const getEventContentPage = (slug: string): EventContentPageType => {
//   console.log(slug)
//   return eventContentData
// }

// export type ChecklistItemType = {
//   id: number,
//   name: string,
//   checked: boolean
// }

// export type EventGuideType = {
//   name: string,
//   progress: {
//     contract: string,
//     space: string,
//     signs: string
//   },
//   requiredChecklistItems: ChecklistItemType[],
//   recomendedChecklistItems: ChecklistItemType[],
// }

// export type EventInformationType = {
//   name: string,
//   date: string,
//   location: [string, string],
//   spaceType: string[],
//   size: string
//   tier: string
// }

// export type ImageType = {
//   src: string,
//   alt: string
// }

// export type LinkType = {
//   url: string,
//   title: string
// }

// export type EventContentPageType = {
//   slug: string,
//   name: string,
//   image: ImageType,
//   mainContent: string,
//   links: LinkType[]
// }

// export type EventAgendaItemType = {
//   title: string,
//   description: string,
//   timeFrom: string,
//   timeTo: string,
//   category: string
// }

export const events = [
  {
    id: 1, 
    slug: 'husitska',
    name: 'Husitská',
  },
  {
    id: 2,
    slug: 'arbesovo-namesti',
    name: 'Arbesovo náměstí',
  },
]

export const eventGuides = [
  {
    id: 1,
    slug: 'husitska',
    name: 'Husitská',
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

// const spaceTypes = ['none','park', 'sidewalk', 'roadway', 'courtyard']
// const spaceAreas = ['none', '0', '500', '2000', '3000', '5000']
// const eventTypes = ['small', 'medium', 'large', 'partner']

export const eventInformationData = {
  name: 'Husitská',
  date: '22/08/2025',
  address: 'Husitská 70/24, 130 00 Praha 3-Žižkov',
  latitude: 50.087274,
  longitude: 14.443054,
  municipal_district: 'Praha 3',
  space_type: 'roadway',
  space_area: '500',
  event_type: 'small',
  event_type_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut fringilla neque. Nulla facilisi. Vestibulum nec eros erat. Vestibulum semper interdum nisi facilisis sodales.' 
}


export const eventContentData = {
  slug: 'husitska',
  name: 'Husitská',
  image: null
  ,
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

export const eventProgramData = {
  slug: 'husitska',
  name: 'Husitská',
  program: [
    {
      title: 'Divadlo',
      description: 'Představení dobrovolnického spolku',
      timeFrom: '09:00',
      timeTo: '10:30',
      categories: ['theater', 'forchildren']
    },
    {
      title: 'Zpívánky',
      description: 'Zpěv s dětmi',
      timeFrom: '11:00',
      timeTo: '11:30',
      categories: ['forchildren', 'music']
    },
    {
      title: 'Stánky s občerstvením',
      description: 'Občerstvení od lokálních podniků',
      timeFrom: '10:00',
      timeTo: '22:00',
      categories: ['food']
    },
    {
      title: 'Rukodělky',
      description: 'Pojďme si společně vytvořit draka',
      timeFrom: '14:00',
      timeTo: '16:00',
      categories: ['workshop', 'forchildren']
    },
    {
      title: 'Koncert skupiny Band',
      description: 'Band, punková skupina z jihu',
      timeFrom: '21:00',
      timeTo: '22:00',
      categories: ['music']
    },
    {
      title: 'Just Dance!',
      description: 'Pojďme si zatancovat na ty největší pecky minulého desetiletí',
      timeFrom: '19:00',
      timeTo: '20:00',
      categories: ['dance', 'music']
    },
    {
      title: 'Taneční vystoupení',
      description: 'Uvidíte mnoho mladých talentovaných lidí tancovat klasické tance',
      timeFrom: '17:00',
      timeTo: '18:00',
      categories: ['dance']
    },
  ]  
}

// const roles = ['main', 'program' ]
// const businessTypes = ['po','fo','no']

export const eventOrganizersData = {
  slug: 'husitska',
  name: 'Husitská',
  organizers: [
    {
      name: 'Jan',
      surname: 'Novak',
      email: 'jan.novak@email.com',
      phone: '+420741456231',
      role: 'main'
    },
    {
      name: 'Helena',
      surname: 'Nova',
      email: 'hel.nova@email.com',
      phone: '+420741456231',
      role: 'program'
    },
    {
      name: 'Karel',
      surname: 'Novy',
      email: 'karl.novy@email.com',
      phone: '+420741456231',
      role: 'finance'
    }
  ],
  company: {
    title: 'Firma, s.r.o.',
    businessType: 'po',
    ico: '123456789',
    dic: 'CZ123456789'
  }
}

