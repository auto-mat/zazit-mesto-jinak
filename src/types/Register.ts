export interface CompanyType {
  id: number;
  type: string;
}

export interface Organizer {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface RegisterForm {
  personalDetails: {
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    onlyOrganizerNews: boolean;
    allNews: boolean;
    terms: boolean;
    codex: boolean;
  };
  eventDetails: {
    eventName: string;
    date: string;
    gps: {
      latitude: number;
      longitude: number;
    };
    place: string;
    spaceType: string;
    spaceArea: string;
    spaceRent: boolean;
    activities: string;
  };
  organizers: {
    company: {
      title: string;
      businessType: number | null;
      ico: string;
      dic: string;
    };
    organizers: Organizer[];
  };
}
