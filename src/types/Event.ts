/**
 * @file Event.ts
 * @description Types related to events in the application.
 * @author Jana Schořová
 * @version 1.0
 */

import { EventSpaceType, EventSpaceArea } from 'src/enums/eventEnums';

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
  image: File | null;
  mainContent: string;
  links: Link[];
}

export interface EventProgramItem {
  title: string;
  description: string;
  timeFrom: string;
  timeTo: string;
  categories: string[];
}

export type EventProgram = EventProgramItem[];

export interface EventOrganizer {
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
}

export interface EventOrganizerCompany {
  title: string;
  businessType: string;
  ico: string;
  dic: string;
}

export type EventOrganizers = EventOrganizer[];
