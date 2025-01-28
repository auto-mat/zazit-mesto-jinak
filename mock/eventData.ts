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

export type ChecklistItem = {
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
  requiredChecklistItems: ChecklistItem[],
  recomendedChecklistItems: ChecklistItem[],
}

const events = [
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