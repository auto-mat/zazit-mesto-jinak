import { EventSpaceArea, EventSpaceType } from 'src/enums/eventEnums';
import {
  EventContent,
  EventInformation,
  EventInformationForm,
  EventProgram,
} from 'src/types/Event';
import { convertDateToString, convertDateToISOString } from 'src/utils';

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

type ApiEventContent = {
  image: File | null;
  main_content: string;
  links: {
    title: string;
    url: string;
  }[];
};

type ApiEventProgramItem = {
  title: string;
  description: string;
  time_from: string;
  time_to: string;
  categories: string[];
};

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

  toEventContent(eventData: ApiEventContent): EventContent {
    return {
      image: eventData.image,
      mainContent: eventData.main_content,
      links: eventData.links,
    };
  },

  toEventProgram(eventData: ApiEventProgramItem[]): EventProgram {
    const eventProgram: EventProgram = [];
    eventData.forEach((programItem) => {
      eventProgram.push({
        title: programItem.title,
        description: programItem.description,
        timeFrom: programItem.time_from,
        timeTo: programItem.time_to,
        categories: programItem.categories,
      });
    });

    return eventProgram;
  },
};
