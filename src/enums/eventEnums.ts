/* eslint-disable no-unused-vars */
export enum EventSpaceType {
  NONE = 'none',
  PARK = 'park',
  SIDEWALK = 'sidewalk',
  ROAD = 'road',
  YARD = 'yard',
}

export enum EventSpaceArea {
  NONE = 'none',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export enum EventAgreementStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  SIGNED = 'signed',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

export enum EventInvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  REMINDED = 'reminded',
  OVERDUE = 'overdue',
  PAID = 'paid',
}
