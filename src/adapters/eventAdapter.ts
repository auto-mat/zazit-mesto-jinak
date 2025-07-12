import { EventInformationType, EventMetaType } from 'src/types/Event'

type ApiEvent = {
  slug: string,
  name: string,
}

type ApiEventInformation = {
  name: string,
  date: string,
  address: string,
  municipal_district: string,
  latitude: number,
  longitude: number,
  space_type: string,
  space_area: string,
  event_type: string,
  event_type_description: string,
}

export const eventsAdapter = {
  toEventList(eventsData: ApiEvent[]): EventMetaType[] {
    const events: EventMetaType[] = [];
    eventsData.forEach((event) => {
      events.push({
        name: event.name,
        slug: event.slug,
      });
    });

    return events;
  },

  toEventInformation(eventData: ApiEventInformation): EventInformationType {
    return { 
      name: eventData.name,
      date: eventData.date,
      address: eventData.address,
      municipalDistrict: eventData.municipal_district,
      coordinates: {
        latitude: eventData.latitude,
        longitude: eventData.longitude,
      },
      spaceType: eventData.space_type,
      spaceArea: eventData.space_area,
      eventType: eventData.event_type,
      eventTypeDescription: eventData.event_type_description,
    };
  }
}