/**
 * @file Event.ts
 * @description Types related to events in the application.
 * @author Jana Schořová
 * @version 1.0
 */

import {
  EventSpaceType,
  EventSpaceArea,
  EventAgreementStatus,
  EventInvoiceStatus,
} from 'src/enums/eventEnums';

export interface EventMeta {
  id: number;
  slug: string;
  name: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface EventInformation {
  name: string;
  date: string;
  place: string;
  coordinates: Coordinates;
  spaceType: EventSpaceType;
  spaceArea: EventSpaceArea;
  spaceRent: boolean;
  activities: string;
}

export interface EventInformationForm {
  name: string;
  date: string;
  place: string;
  coordinates: Coordinates;
}

export interface Link {
  title: string;
  url: string;
}

export interface EventContent {
  image: string | null;
  mainContent: string;
  links: Link[];
}

export interface EventContentForm {
  image: File | null;
  mainContent: string;
  links: Link[];
}

export interface EventCategory {
  id: number;
  name: string;
  slug: string;
}

export interface EventProgramItem {
  id: number | null;
  name: string;
  description: string;
  timeFrom: string;
  timeTo: string;
  categories: EventCategory[];
}

export type EventProgram = EventProgramItem[];

export interface EventProgramItemPayload {
  id: number | null;
  name: string;
  description: string;
  timeFrom: string;
  timeTo: string;
  categories: number[];
}

export interface EventOrganizer {
  id: number | null;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface EventOrganizerCompany {
  title: string;
  businessTypeName: string;
  businessType: number | null;
  ico: string;
  dic: string;
}

export type EventOrganizers = EventOrganizer[];

export interface ChecklistItem {
  id: number | null;
  name: string;
  checked: boolean;
}

export interface EventAgreement {
  status: EventAgreementStatus | null;
  pdfUrl: string | null;
  pdfUrlCompleted: string | null;
}

export interface EventAgreementPayload {
  pdfFile: File | null;
}

export interface EventInvoice {
  status: EventInvoiceStatus | null;
  pdfUrl: string | null;
}
