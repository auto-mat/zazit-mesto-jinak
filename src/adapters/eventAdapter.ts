import {
  EventAgreementStatus,
  EventInvoiceStatus,
  EventSpaceArea,
  EventSpaceType,
} from 'src/enums/eventEnums';
import {
  EventAgreement,
  EventAgreementPayload,
  EventContent,
  EventInformation,
  EventInformationForm,
  EventInvoice,
  EventOrganizerCompany,
  EventOrganizers,
  EventProgram,
  EventProgramItemPayload,
} from 'src/types/Event';
import {
  convertDateToString,
  convertDateToISOString,
  convertTimeToISOString,
  convertTimeToString,
} from 'src/utils';

export interface ApiEventInformation {
  name: string;
  date: string;
  place: string;
  latitude: number;
  longitude: number;
  space_type: EventSpaceType;
  space_area: EventSpaceArea;
  space_rent: boolean;
  activities: string;
}

export interface EventInformationPayload {
  name: string;
  date: string;
  place: string;
  latitude: number;
  longitude: number;
}

export interface ApiEventOrganizerCompany {
  name: string;
  company_type_name: string;
  company_type: number | null;
  crn: string;
  tin: string;
}

export interface ApiEventOrganizerCompanyPayload {
  name: string;
  company_type: number | null;
  crn: string;
  tin: string;
}

export interface ApiEventOrganizer {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
}

export interface ApiEventContent {
  main_photo: string | null;
  description: string;
  url: string | null;
  url_title: string | null;
  url1: string | null;
  url_title1: string | null;
  url2: string | null;
  url_title2: string | null;
}

export interface ApiEventCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ApiEventProgramItem {
  id: number | null;
  name: string;
  description: string;
  time_from: string;
  time_to: string;
  categories: ApiEventCategory[];
}

export interface ApiEventProgramItemPayload {
  id: number | null;
  name: string;
  description: string;
  time_from: string;
  time_to: string;
  categories: number[];
}

export interface ApiEventAgreement {
  status: EventAgreementStatus | null;
  pdf_url: string | null;
  pdf_url_completed: string | null;
}

export interface ApiEventAgreementPayload {
  pdf_file_signed: File | null;
}

export interface ApiEventInvoice {
  status: EventInvoiceStatus | null;
  pdf_url: string | null;
}

export const eventsAdapter = {
  toEventInformation(eventData: ApiEventInformation): EventInformation {
    return {
      name: eventData.name,
      date: convertDateToString(eventData.date),
      place: eventData.place,
      coordinates: {
        latitude: eventData.latitude,
        longitude: eventData.longitude,
      },
      spaceType: eventData.space_type,
      spaceArea: eventData.space_area,
      spaceRent: eventData.space_rent,
      activities: eventData.activities,
    };
  },

  toEventInformationPayload(
    eventData: EventInformationForm,
  ): EventInformationPayload {
    return {
      name: eventData.name,
      date: convertDateToISOString(eventData.date),
      place: eventData.place,
      latitude: eventData.coordinates.latitude,
      longitude: eventData.coordinates.longitude,
    };
  },

  toEventOrganizerCompany(
    eventData: ApiEventOrganizerCompany,
  ): EventOrganizerCompany {
    return {
      title: eventData.name,
      businessTypeName: eventData.company_type_name,
      businessType: eventData.company_type,
      ico: eventData.crn,
      dic: eventData.tin,
    };
  },

  toEventOrganizerCompanyPayload(
    eventData: EventOrganizerCompany,
  ): ApiEventOrganizerCompanyPayload {
    return {
      name: eventData.title,
      company_type: eventData.businessType,
      crn: eventData.ico,
      tin: eventData.dic,
    };
  },

  toEventOrganizers(eventData: ApiEventOrganizer[]): EventOrganizers {
    return eventData.map((organizer) => ({
      id: organizer.id,
      name: organizer.first_name,
      surname: organizer.last_name,
      email: organizer.email,
      phone: organizer.telephone,
    }));
  },

  toEventOrganizersPayload(eventData: EventOrganizers): ApiEventOrganizer[] {
    return eventData.map((organizer) => ({
      id: organizer.id,
      first_name: organizer.name,
      last_name: organizer.surname,
      email: organizer.email,
      telephone: organizer.phone,
    }));
  },

  toEventContent(eventData: ApiEventContent): EventContent {
    const links = [];

    if (eventData.url && eventData.url_title) {
      links.push({
        title: eventData.url_title,
        url: eventData.url,
      });
    }
    if (eventData.url1 && eventData.url_title1) {
      links.push({
        title: eventData.url_title1,
        url: eventData.url1,
      });
    }
    if (eventData.url2 && eventData.url_title2) {
      links.push({
        title: eventData.url_title2,
        url: eventData.url2,
      });
    }

    return {
      image: eventData.main_photo,
      mainContent: eventData.description,
      links,
    };
  },

  toEventProgram(eventData: ApiEventProgramItem[]): EventProgram {
    const eventProgram: EventProgram = [];
    eventData.forEach((programItem) => {
      eventProgram.push({
        id: programItem.id,
        name: programItem.name,
        description: programItem.description,
        timeFrom: convertTimeToString(programItem.time_from),
        timeTo: convertTimeToString(programItem.time_to),
        categories: programItem.categories,
      });
    });

    return eventProgram;
  },

  toEventProgramItemPayload(
    eventData: EventProgramItemPayload,
  ): ApiEventProgramItemPayload {
    return {
      id: eventData.id,
      name: eventData.name,
      description: eventData.description,
      time_from: convertTimeToISOString(eventData.timeFrom),
      time_to: convertTimeToISOString(eventData.timeTo),
      categories: eventData.categories,
    };
  },

  toEventAgreement(eventData: ApiEventAgreement): EventAgreement {
    return {
      status: eventData.status,
      pdfUrl: eventData.pdf_url,
      pdfUrlCompleted: eventData.pdf_url_completed,
    };
  },

  toEventAgreementPayload(
    eventData: EventAgreementPayload,
  ): ApiEventAgreementPayload {
    return {
      pdf_file_signed: eventData.pdfFile,
    };
  },

  toEventInvoice(eventData: ApiEventInvoice): EventInvoice {
    return {
      status: eventData.status,
      pdfUrl: eventData.pdf_url,
    };
  },
};
