import { date } from 'quasar';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { EventSpaceArea, EventSpaceType } from 'src/enums/eventEnums';
import { i18n } from 'src/boot/i18n';

const convertDateToString = (timestamp: string): string => {
  return date.formatDate(new Date(timestamp), zazitMestoJinakConfig.dateFormat);
};

const convertDateToISOString = (dateString: string): string => {
  const extractedDate = date.extractDate(
    dateString,
    zazitMestoJinakConfig.dateFormat,
  );
  return extractedDate.toISOString();
};

const convertTimeToString = (timestamp: string): string => {
  return date.formatDate(new Date(timestamp), 'HH:mm');
};

const convertTimeToISOString = (timeString: string): string => {
  const dateString = '01.01.2000';
  const extractedDate = date.extractDate(
    dateString + ' ' + timeString,
    'DD.MM.YYYY HH:mm',
  );
  return extractedDate.toISOString();
};

const getLocalizedSpaceType = (spaceType: EventSpaceType): string => {
  return i18n.global.t(`event.spaceType.${spaceType}`);
};

const getLocalizedSpaceArea = (spaceArea: EventSpaceArea): string => {
  return i18n.global.t(`event.spaceArea.${spaceArea}`);
};

const getLocalizedSpaceRent = (spaceRent: boolean): string => {
  return i18n.global.t(`event.spaceRent.${spaceRent ? 'yes' : 'no'}`);
};

export {
  convertDateToString,
  convertDateToISOString,
  convertTimeToString,
  convertTimeToISOString,
  getLocalizedSpaceType,
  getLocalizedSpaceArea,
  getLocalizedSpaceRent,
};
